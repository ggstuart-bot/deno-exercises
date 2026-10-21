# Books seed data

Experimental seed data for a possible "bookshelves" version of the app: users own shelves
(public or private), shelves hold books from a shared catalogue, and admins feature shelves.
It is not wired into the app yet.

The JSON in `data/` is already clean. Each file matches one table, and each key matches a
column, so a seed script can insert the rows as they are. Booleans are `0`/`1`.

| File | Rows | What it holds |
|---|---|---|
| `users.json` | 41 | `librarian` (admin) plus 40 readers. No passwords: the seed sets them |
| `authors.json` | 578 | Author names |
| `books.json` | 1,000 | The 1,000 most-rated books: title, year, ISBN-13, cover URL |
| `bookAuthors.json` | 1,033 | Which authors wrote which books |
| `shelves.json` | 88 | A "Favourites" and a "To read" shelf per reader, plus 8 featured shelves |
| `shelfBooks.json` | 1,720 | Which books are on which shelves |
| `bookLinks.json` | 2,963 | One row per link: `openlibrary`, `goodreads`, `amazon` |
| `authorLinks.json` | 556 | One row per link: `wikipedia` |

Missing values are `null`, and there are no rows for missing links.

## Rebuilding

You only need this to change the data. It needs Python 3 and no extra packages.

```sh
cd seed-data/books
sh scripts/download_raw.sh          # about 100 MB of CSVs into raw/ (not committed)
python3 scripts/build_seed.py       # raw/*.csv -> data/*.json (except the links)
python3 scripts/build_links.py      # Open Library + Wikidata lookups -> data/*Links.json
python3 scripts/build_db.py         # test.db with foreign keys on, plus some example queries
```

`build_seed.py` gives the same output every time, because it uses a fixed random seed.
`build_links.py` calls the Open Library and Wikidata APIs politely, so the first run takes
about 35 minutes. It caches every response in `raw/cache/`, so later runs are offline and
take a couple of minutes. `raw/` and `test.db` are ignored by git.

## Licence

The data in `data/` comes from [goodbooks-10k](https://github.com/zygmuntz/goodbooks-10k)
and is shared under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
The links come from Open Library and Wikidata (both CC0). See `ATTRIBUTION.md`.
