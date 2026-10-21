#!/usr/bin/env python3
"""Turn goodbooks-10k (CC BY-SA 4.0, github.com/zygmuntz/goodbooks-10k) into clean seed JSON.
Run: python3 scripts/build_seed.py   (expects raw/*.csv, writes data/*.json)"""
import csv, json, re, random, unicodedata, collections
from pathlib import Path

N_BOOKS = 1000          # catalogue size (top by ratings_count)
N_USERS = 40            # generated readers
SHELF_CAP = 20          # max books per generated shelf
RNG = random.Random(2712)
BASE = Path(__file__).resolve().parent.parent   # seed-data/books
RAW, OUT = BASE / 'raw', BASE / 'data'
OUT.mkdir(exist_ok=True)
log = collections.Counter()   # edge-case tallies, printed at the end

def clean(s):
    """NFC-normalise, collapse runs of whitespace, trim."""
    return re.sub(r'\s+', ' ', unicodedata.normalize('NFC', s)).strip()

# Trailing "(Series, #1)" / "(The Sandman #1)" / "(Series, #1-3)" / "(Middle-Earth Universe)" is NOT stripped (no #)
SERIES_RE = re.compile(r'\s*\(([^()]*?),?\s*#\s*([\d.\- ]+?)\)\s*$')
def split_title(raw):
    t = clean(raw)
    m = SERIES_RE.search(t)
    if not m:
        return t, None, None
    log['title: series suffix stripped'] += 1
    return t[:m.start()].strip(), m.group(1).strip(), m.group(2)

def isbn10(raw):
    """CSV stored ISBN-10 as a number, so leading zeros were lost ('439023483')."""
    raw = raw.strip()
    if not raw:
        log['isbn: missing'] += 1; return None
    if len(raw) < 10:
        log['isbn: leading zeros restored'] += 1
    s = raw.zfill(10).upper()
    if not re.fullmatch(r'\d{9}[\dX]', s):
        log['isbn: invalid, dropped'] += 1; return None
    total = sum((10 - i) * (10 if c == 'X' else int(c)) for i, c in enumerate(s))
    if total % 11:
        log['isbn: bad checksum, dropped'] += 1; return None
    return s

def to_isbn13(i10):
    core = '978' + i10[:9]
    check = (10 - sum(int(c) * (1 if i % 2 == 0 else 3) for i, c in enumerate(core)) % 10) % 10
    return core + str(check)

def year(raw):
    raw = raw.strip()
    if not raw:
        log['year: missing'] += 1; return None
    y = int(float(raw))           # '2008.0' -> 2008, '-720.0' -> -720 (BC)
    if y < 0: log['year: negative (BC)'] += 1
    return y

def cover(url):
    if 'nophoto' in url:
        log['cover: goodreads placeholder -> null'] += 1; return None
    return url

# ---------- books ----------
rows = list(csv.DictReader(open(RAW / 'books.csv', encoding='utf-8')))
rows.sort(key=lambda r: -int(r['ratings_count']))
top = rows[:N_BOOKS]

# Authors: the first-listed name is the author. Later names are mostly translators,
# illustrators, editors, intro writers, narrators (goodbooks has no role info, and a
# "is a first author elsewhere" heuristic wrongly kept Hitchens, Nabokov, Fromm, Clarke...).
# So: first name only, plus a hand-checked list of genuine co-authors / pseudonym pairs.
CO_AUTHORS = {'Kristin Cast', 'Margaret Stohl', 'Annie Barrows', 'Stephen J. Dubner', 'Nicola Kraus',
              'Jerry B. Jenkins', 'Takeshi Obata', 'David Levithan', 'Neil Gaiman', 'J.K. Rowling',
              'Jack Thorne', 'Kenneth H. Blanchard', 'Alex Haley', 'Stephen King', 'Jennifer L. Armentrout',
              'Jane Austen', 'Wilhelm Grimm', 'J.R.R. Tolkien', 'William Shakespeare', 'Lewis Carroll',
              'Dave Gibbons', 'Eric Carle'}
NOT_AUTHORS = {'Newt Scamander', 'Albus Dumbledore'}   # fictional "authors" (Fantastic Beasts)
authors, books, book_authors, gr_to_book = {}, [], [], {}
provenance = {'books': [], 'users': []}   # not seed data: used by build_links.py
def author_id(name):
    if name not in authors:
        authors[name] = len(authors) + 1
    return authors[name]

for new_id, r in enumerate(top, start=1):
    title, _series, _num = split_title(r['title'])
    i10 = isbn10(r['isbn'])
    books.append({'id': new_id, 'title': title, 'year': year(r['original_publication_year']),
                  'isbn13': to_isbn13(i10) if i10 else None, 'coverUrl': cover(r['image_url'])})
    provenance['books'].append({'bookId': new_id, 'goodbooksId': int(r['book_id']),
                                'goodreadsBookId': int(r['goodreads_book_id']), 'isbn10': i10})
    r['_new'] = new_id
    gr_to_book[r['goodreads_book_id']] = new_id
    names = [clean(n) for n in r['authors'].split(',') if clean(n)]
    seen = []
    for pos, n in enumerate(names):
        if n in seen:
            log['author: duplicate within one book'] += 1; continue
        if n in NOT_AUTHORS:
            log['author: fictional name dropped'] += 1; continue
        if pos == 0 or not seen or n in CO_AUTHORS:
            seen.append(n)
        else:
            log['author: secondary name dropped (translator/illustrator/editor?)'] += 1
    if len(seen) > 1: log['book: kept >1 author'] += 1
    for n in seen:
        book_authors.append({'bookId': new_id, 'authorId': author_id(n)})

# book id in ratings/to_read = goodbooks book_id; in book_tags = goodreads_book_id (different key!)
gb_to_book = {r['book_id']: r['_new'] for r in top}

# ---------- users from real reading data ----------
to_read = collections.defaultdict(list)
for r in csv.DictReader(open(RAW / 'to_read.csv')):
    b = gb_to_book.get(r['book_id'])
    if b: to_read[r['user_id']].append(b)
fives = collections.defaultdict(list)
for r in csv.DictReader(open(RAW / 'ratings.csv')):
    if r['rating'] == '5':
        b = gb_to_book.get(r['book_id'])
        if b: fives[r['user_id']].append(b)

# readers with plenty of both, so both shelves are full
cands = [u for u in to_read if len(set(to_read[u])) >= SHELF_CAP and len(set(fives.get(u, []))) >= SHELF_CAP]
cands.sort(key=lambda u: int(u))
chosen = RNG.sample(cands, N_USERS)
log[f'users: candidates with >={SHELF_CAP} to-read and 5-star in catalogue'] = len(cands)

NAMES = ['alex', 'amira', 'ben', 'chloe', 'dan', 'priya', 'ella', 'finn', 'grace', 'harry',
         'isla', 'jack', 'kiran', 'leah', 'max', 'nadia', 'oscar', 'poppy', 'quinn', 'rosa',
         'sam', 'tara', 'umar', 'vera', 'will', 'xena', 'yusuf', 'zara', 'aidan', 'bea',
         'callum', 'daisy', 'eli', 'freya', 'george', 'hana', 'ivan', 'jade', 'kai', 'lily']
users = [{'id': 1, 'username': 'librarian', 'isAdmin': 1, 'isPublic': 1}]
for i, (name, u) in enumerate(zip(NAMES, chosen), start=2):
    users.append({'id': i, 'username': name, 'isAdmin': 0, 'isPublic': int(RNG.random() < 0.75)})
    provenance['users'].append({'userId': i, 'goodbooksUserId': int(u)})

shelves, shelf_books = [], []
def add_shelf(owner, title, is_public, book_ids, featured=False):
    sid = len(shelves) + 1
    shelves.append({'id': sid, 'title': title, 'ownerId': owner, 'isPublic': int(bool(is_public)), 'isFeatured': int(featured)})
    for b in book_ids:
        shelf_books.append({'shelfId': sid, 'bookId': b})

for u, pu in zip(users[1:], provenance['users']):
    src = str(pu['goodbooksUserId'])
    tr = sorted(RNG.sample(sorted(set(to_read[src])), SHELF_CAP))
    fv = sorted(RNG.sample(sorted(set(fives[src])), SHELF_CAP))
    # rule from the app: a private profile can't have public shelves
    add_shelf(u['id'], 'Favourites', u['isPublic'], fv)
    add_shelf(u['id'], 'To read', u['isPublic'] and RNG.random() < 0.4, tr)

# ---------- themed shelves from tags (owned by librarian, featured) ----------
tag_names = {r['tag_id']: r['tag_name'] for r in csv.DictReader(open(RAW / 'tags.csv', encoding='utf-8'))}
THEMES = {  # shelf title -> synonym tags (tags are user shelf names: noisy, duplicated spellings)
    'Fantasy worlds': {'fantasy', 'high-fantasy', 'epic-fantasy'},
    'Science fiction': {'science-fiction', 'sci-fi', 'scifi'},
    'Classics': {'classics', 'classic'},
    'Mysteries & thrillers': {'mystery', 'thriller', 'crime', 'mysteries', 'mystery-thriller'},
    'Graphic novels': {'graphic-novels', 'graphic-novel', 'comics', 'manga'},
    'Non-fiction': {'non-fiction', 'nonfiction', 'biography', 'memoir', 'history'},
    'Horror': {'horror'},
    "Children's favourites": {'childrens', 'children', 'children-s', 'childrens-books', 'picture-books', 'kids'},
}
book_tagcounts = collections.defaultdict(collections.Counter)
for r in csv.DictReader(open(RAW / 'book_tags.csv')):
    b = gr_to_book.get(r['goodreads_book_id'])
    if b: book_tagcounts[b][tag_names[r['tag_id']]] += int(r['count'])
popularity = {r['_new']: int(r['ratings_count']) for r in top}
for title, syn in THEMES.items():
    # a book is "in" a theme if a synonym is among its 8 most-used non-status tags
    picks = []
    for b, tc in book_tagcounts.items():
        topk = [t for t, _ in tc.most_common(15) if t not in {'to-read', 'currently-reading', 'favorites',
                'books-i-own', 'owned', 'fiction', 'default', 'kindle', 'library', 'favourites'}][:8]
        if syn & set(topk): picks.append(b)
    picks.sort(key=lambda b: -popularity[b])
    log[f'theme: {title} matches'] = len(picks)
    add_shelf(1, title, True, sorted(picks[:15]), featured=True)

# ---------- write ----------
def dump(name, data):
    (OUT / name).write_text(json.dumps(data, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
dump('authors.json', [{'id': i, 'name': n} for n, i in authors.items()])
dump('books.json', books)
dump('bookAuthors.json', book_authors)
dump('users.json', users)
dump('shelves.json', shelves)
dump('shelfBooks.json', shelf_books)
(RAW / 'provenance.json').write_text(json.dumps(provenance, indent=1))
for k, v in sorted(log.items()): print(f'{v:6}  {k}')
