#!/usr/bin/env python3
"""Build data/bookLinks.json and data/authorLinks.json.
Needs data/*.json + raw/provenance.json from build_seed.py. All HTTP responses are cached in
raw/cache/ so reruns are offline. Sources: Open Library API (CC0), Wikidata API (CC0)."""
import json, time, re, hashlib, unicodedata, urllib.request, urllib.parse, collections
from pathlib import Path

UA = 'ggstuart-bot/1.0 (CTEC2712 teaching seed data; https://github.com/ggstuart-bot)'
BASE = Path(__file__).resolve().parent.parent   # seed-data/books
OUT, RAW = BASE / 'data', BASE / 'raw'
CACHE = RAW / 'cache'; CACHE.mkdir(parents=True, exist_ok=True)
log = collections.Counter()

def get_json(url, delay=1.0):
    f = CACHE / (hashlib.sha1(url.encode()).hexdigest() + '.json')
    if f.exists():
        return json.loads(f.read_text())
    for attempt in range(4):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': UA, 'Accept': 'application/json'})
            with urllib.request.urlopen(req, timeout=60) as r:
                data = json.loads(r.read().decode('utf-8'))
            break
        except urllib.error.HTTPError as e:
            if e.code == 404: data = None; break
            time.sleep(5 * (attempt + 1))
        except Exception:
            time.sleep(5 * (attempt + 1))
    else:
        raise RuntimeError('failed ' + url)
    f.write_text(json.dumps({'url': url, 'data': data}))
    time.sleep(delay)
    return {'url': url, 'data': data}['data'] if False else json.loads(f.read_text())

def J(url, delay=1.0):
    return get_json(url, delay)['data']

def norm(name):
    s = unicodedata.normalize('NFKD', name).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]', '', s)

books = json.load(open(OUT / 'books.json'))
authors = json.load(open(OUT / 'authors.json'))
book_authors = json.load(open(OUT / 'bookAuthors.json'))
prov = {p['bookId']: p for p in json.load(open(RAW / 'provenance.json'))['books']}
author_name = {a['id']: a['name'] for a in authors}
authors_of = collections.defaultdict(list)
for ba in book_authors: authors_of[ba['bookId']].append(ba['authorId'])

# ---------- Open Library: ISBN -> edition -> work (batched books API) ----------
work_of, ol_author_keys = {}, collections.defaultdict(set)   # bookId -> work key; authorId -> OL author keys
with_isbn = [b for b in books if b['isbn13']]
for i in range(0, len(with_isbn), 50):
    batch = with_isbn[i:i + 50]
    keys = ','.join('ISBN:' + b['isbn13'] for b in batch)
    data = J(f'https://openlibrary.org/api/books?bibkeys={keys}&jscmd=details&format=json') or {}
    for b in batch:
        d = (data.get('ISBN:' + b['isbn13']) or {}).get('details')
        if not d: continue
        works = d.get('works') or []
        t1, t2 = norm(b['title']), norm(d.get('title', ''))
        if works and not (t1[:12] in t2 or t2[:12] in t1):   # ISBN data is sometimes plain wrong
            log['ol work: ISBN hit rejected (edition title differs), retried by search'] += 1
            continue
        if works:
            work_of[b['id']] = works[0]['key']; log['ol work: via ISBN'] += 1
        for a in d.get('authors') or []:      # edition authors carry name + /authors/OL..A
            for aid in authors_of[b['id']]:
                if norm(a.get('name', '')) == norm(author_name[aid]):
                    ol_author_keys[aid].add(a['key'])

# fallback: search by title + first author
for b in books:
    if b['id'] in work_of: continue
    q = urllib.parse.urlencode({'title': b['title'], 'author': author_name[authors_of[b['id']][0]],
                                'limit': 1, 'fields': 'key,title,author_name,author_key'})
    docs = (J('https://openlibrary.org/search.json?' + q) or {}).get('docs') or []
    if docs and norm(docs[0]['title'])[:20] == norm(b['title'])[:20]:
        work_of[b['id']] = docs[0]['key']; log['ol work: via title+author search'] += 1
    elif docs:
        log['ol work: search hit rejected (title mismatch)'] += 1
    else:
        log['ol work: not found'] += 1

# work -> authors (catches authors whose edition record had no name match)
for b in books:
    w = work_of.get(b['id'])
    if not w: continue
    missing = [a for a in authors_of[b['id']] if a not in ol_author_keys]
    if not missing: continue
    work = J(f'https://openlibrary.org{w}.json', delay=0.5) or {}
    for entry in work.get('authors') or []:
        key = (entry.get('author') or {}).get('key')
        if not key: continue
        rec = J(f'https://openlibrary.org{key}.json', delay=0.5) or {}
        for aid in missing:
            if norm(rec.get('name', '')) == norm(author_name[aid]) or \
               any(norm(n) == norm(author_name[aid]) for n in rec.get('alternate_names') or []):
                ol_author_keys[aid].add(key)

# one row per link; no rows for missing links
book_links = []
def add_book_link(book_id, site, url):
    if url: book_links.append({'id': len(book_links) + 1, 'bookId': book_id, 'site': site, 'url': url})
for b in books:
    p = prov[b['id']]
    add_book_link(b['id'], 'openlibrary', f'https://openlibrary.org{work_of[b["id"]]}' if b['id'] in work_of else None)
    add_book_link(b['id'], 'goodreads', f'https://www.goodreads.com/book/show/{p["goodreadsBookId"]}')
    add_book_link(b['id'], 'amazon', f'https://www.amazon.co.uk/dp/{p["isbn10"]}' if p['isbn10'] else None)

# ---------- authors -> Wikidata -> English Wikipedia ----------
qid_candidates = collections.defaultdict(set)
for aid, keys in ol_author_keys.items():
    for k in keys:
        rec = J(f'https://openlibrary.org{k}.json', delay=0.5) or {}
        q = (rec.get('remote_ids') or {}).get('wikidata')
        if q: qid_candidates[aid].add(q)

WD = 'https://www.wikidata.org/w/api.php?'
def entities(qids):
    out = {}
    qids = sorted(qids)
    for i in range(0, len(qids), 50):
        d = J(WD + urllib.parse.urlencode({'action': 'wbgetentities', 'ids': '|'.join(qids[i:i + 50]),
              'props': 'claims|sitelinks|labels|aliases|descriptions', 'languages': 'en',
              'sitefilter': 'enwiki', 'format': 'json'}), delay=0.5)
        out.update(d.get('entities', {}))
    return out

HUMANISH = {'Q5', 'Q61002', 'Q16017119', 'Q127843'}   # human, pseudonym, collective pseudonym, pen name-ish
WRITERISH = re.compile(r'writer|novelist|author|poet|playwright|dramatist|journalist|essayist|philosoph|'
                       r'cartoonist|illustrator|comic|manga|historian|screenwriter|theolog|psycholog|economist|'
                       r'scientist|physicist|biologist|neurosurgeon|actor|director|chef|comedian|pastor|'
                       r'businessw?o?man|executive|activist|lawyer|politician|pseudonym|pen name|surgeon|journalist')
def instance_of(e):
    return {c['mainsnak'].get('datavalue', {}).get('value', {}).get('id')
            for c in e.get('claims', {}).get('P31', [])}
def enwiki(e):
    sl = (e.get('sitelinks') or {}).get('enwiki')
    if not sl: return None
    # readable URL (Brontë, not Bront%C3%AB): only escape characters that would break a URL
    t = sl['title'].replace(' ', '_')
    for ch, esc in (('%', '%25'), ('?', '%3F'), ('#', '%23'), ('"', '%22')):
        t = t.replace(ch, esc)
    return 'https://en.wikipedia.org/wiki/' + t
def names(e):
    return {norm(x['value']) for x in [(e.get('labels') or {}).get('en', {'value': ''})] + (e.get('aliases') or {}).get('en', [])}

# 1) Open Library's remote_ids.wikidata (trusted if the item is a person/pseudonym with enwiki)
ent = entities({q for qs in qid_candidates.values() for q in qs})
result, method, uncertain = {}, {}, []
for aid, qs in qid_candidates.items():
    good = {q for q in qs if q in ent and instance_of(ent[q]) & HUMANISH and enwiki(ent[q])}
    if len(good) == 1:
        q = good.pop(); result[aid] = q; method[aid] = 'openlibrary'
    elif len(good) > 1:
        uncertain.append((author_name[aid], 'OL gave several QIDs', sorted(good)))

# 2) Wikidata name search for the rest: accept only if exactly one matching person looks like a writer
NOT_PEOPLE = {'Anonymous', 'Unknown', 'Phaidon Press'}   # 'Anonymous' matched a German author!
for aid in [a['id'] for a in authors if a['name'] in NOT_PEOPLE]:
    result.pop(aid, None); method.pop(aid, None)
for a in authors:
    if a['id'] in result: continue
    if a['name'] in NOT_PEOPLE:
        uncertain.append((a['name'], 'not a person', [])); continue
    hits = (J(WD + urllib.parse.urlencode({'action': 'wbsearchentities', 'search': a['name'], 'language': 'en',
               'type': 'item', 'limit': 7, 'format': 'json'}), delay=0.5) or {}).get('search', [])
    cand = entities({h['id'] for h in hits}) if hits else {}
    ok = [q for q, e in cand.items() if instance_of(e) & HUMANISH and enwiki(e) and norm(a['name']) in names(e)
          and WRITERISH.search(((e.get('descriptions') or {}).get('en') or {}).get('value', '').lower())]
    if len(ok) == 1:
        result[a['id']] = ok[0]; method[a['id']] = 'wikidata search'; ent.update(cand)
    elif len(ok) > 1:
        uncertain.append((a['name'], 'ambiguous', ok))
    else:
        uncertain.append((a['name'], 'no confident match', [h['id'] for h in hits[:3]]))

author_links = [{'id': i, 'authorId': aid, 'site': 'wikipedia', 'url': enwiki(ent[result[aid]])}
                for i, aid in enumerate(sorted(result), start=1)]

def dump(name, data):
    (OUT / name).write_text(json.dumps(data, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
dump('bookLinks.json', book_links)
dump('authorLinks.json', author_links)
(RAW / 'links_report.json').write_text(json.dumps({'method': {author_name[k]: v for k, v in method.items()},
    'qid': {author_name[k]: v for k, v in result.items()}, 'uncertain': uncertain}, ensure_ascii=False, indent=1))
log['authors: wikipedia via openlibrary'] = sum(v == 'openlibrary' for v in method.values())
log['authors: wikipedia via wikidata search'] = sum(v == 'wikidata search' for v in method.values())
log['authors: null'] = len(authors) - len(result)
for k, v in sorted(log.items()): print(f'{v:6}  {k}')
