import json, sqlite3
from pathlib import Path
BASE = Path(__file__).resolve().parent.parent   # seed-data/books
DB = BASE / 'test.db'
DB.unlink(missing_ok=True)
db = sqlite3.connect(DB); db.execute('PRAGMA foreign_keys = ON')
db.executescript('''
CREATE TABLE users(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE,
  isAdmin INTEGER NOT NULL DEFAULT 0, isPublic INTEGER NOT NULL DEFAULT 0);
CREATE TABLE authors(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL UNIQUE);
CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, year INTEGER,
  isbn13 TEXT UNIQUE, coverUrl TEXT);
CREATE TABLE bookAuthors(bookId INTEGER NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  authorId INTEGER NOT NULL REFERENCES authors(id) ON DELETE CASCADE, PRIMARY KEY(bookId, authorId));
CREATE TABLE shelves(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL,
  ownerId INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  isPublic INTEGER NOT NULL DEFAULT 0, isFeatured INTEGER NOT NULL DEFAULT 0);
CREATE TABLE shelfBooks(shelfId INTEGER NOT NULL REFERENCES shelves(id) ON DELETE CASCADE,
  bookId INTEGER NOT NULL REFERENCES books(id) ON DELETE CASCADE, PRIMARY KEY(shelfId, bookId));
CREATE TABLE bookLinks(id INTEGER PRIMARY KEY AUTOINCREMENT,
  bookId INTEGER NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  site TEXT NOT NULL, url TEXT NOT NULL, UNIQUE(bookId, site));
CREATE TABLE authorLinks(id INTEGER PRIMARY KEY AUTOINCREMENT,
  authorId INTEGER NOT NULL REFERENCES authors(id) ON DELETE CASCADE,
  site TEXT NOT NULL, url TEXT NOT NULL, UNIQUE(authorId, site));
''')
# every JSON key must be a column (and vice versa)
for t in ['users','authors','books','bookAuthors','shelves','shelfBooks','bookLinks','authorLinks']:
    cols = [r[1] for r in db.execute(f'PRAGMA table_info({t})')]
    keys = list(json.load(open(BASE / 'data' / f'{t}.json', encoding='utf-8'))[0])
    assert keys == cols, (t, keys, cols)
print('JSON keys match table columns (same order)')
L = lambda f: json.load(open(BASE / 'data' / f'{f}.json', encoding='utf-8'))
with db:
    db.executemany('INSERT INTO users(id,username,isAdmin,isPublic) VALUES(:id,:username,:isAdmin,:isPublic)', L('users'))
    db.executemany('INSERT INTO authors(id,name) VALUES(:id,:name)', L('authors'))
    db.executemany('INSERT INTO books(id,title,year,isbn13,coverUrl) VALUES(:id,:title,:year,:isbn13,:coverUrl)', L('books'))
    db.executemany('INSERT INTO bookAuthors VALUES(:bookId,:authorId)', L('bookAuthors'))
    db.executemany('INSERT INTO shelves(id,title,ownerId,isPublic,isFeatured) VALUES(:id,:title,:ownerId,:isPublic,:isFeatured)', L('shelves'))
    db.executemany('INSERT INTO shelfBooks VALUES(:shelfId,:bookId)', L('shelfBooks'))
    db.executemany('INSERT INTO bookLinks VALUES(:id,:bookId,:site,:url)', L('bookLinks'))
    db.executemany('INSERT INTO authorLinks VALUES(:id,:authorId,:site,:url)', L('authorLinks'))
for t in ['users','authors','books','bookAuthors','shelves','shelfBooks','bookLinks','authorLinks']:
    print(t, db.execute(f'SELECT COUNT(*) FROM {t}').fetchone()[0])
print('fk violations', db.execute('PRAGMA foreign_key_check').fetchall())
def q(title, sql, *a):
    print('\n--', title)
    for r in db.execute(sql, a): print('  ', ' | '.join(str(x) for x in r))
q('Most-shelved books (public shelves)', '''SELECT b.title, COUNT(*) n FROM shelfBooks sb JOIN books b ON b.id=sb.bookId
  JOIN shelves s ON s.id=sb.shelfId WHERE s.isPublic GROUP BY b.id ORDER BY n DESC, b.title LIMIT 8''')
q('Books by Neil Gaiman', '''SELECT b.title, b.year FROM books b JOIN bookAuthors ba ON ba.bookId=b.id
  JOIN authors a ON a.id=ba.authorId WHERE a.name=? ORDER BY b.year''', 'Neil Gaiman')
q("A user's Favourites shelf with authors", '''SELECT b.title, GROUP_CONCAT(a.name, ', ') FROM shelves s
  JOIN users u ON u.id=s.ownerId JOIN shelfBooks sb ON sb.shelfId=s.id JOIN books b ON b.id=sb.bookId
  JOIN bookAuthors ba ON ba.bookId=b.id JOIN authors a ON a.id=ba.authorId
  WHERE u.username='amira' AND s.title='Favourites' GROUP BY b.id ORDER BY b.title LIMIT 8''')
q('Public shelves containing "The Hobbit"', '''SELECT u.username, s.title FROM shelves s JOIN users u ON u.id=s.ownerId
  JOIN shelfBooks sb ON sb.shelfId=s.id JOIN books b ON b.id=sb.bookId WHERE b.title=? AND s.isPublic ORDER BY u.username''', 'The Hobbit')
q('Featured shelves', '''SELECT s.title, COUNT(*), (SELECT b.title FROM shelfBooks x JOIN books b ON b.id=x.bookId WHERE x.shelfId=s.id ORDER BY b.id LIMIT 1)
  FROM shelves s JOIN shelfBooks sb ON sb.shelfId=s.id WHERE s.isFeatured GROUP BY s.id''')
q('Most prolific authors in catalogue', '''SELECT a.name, COUNT(*) n FROM authors a JOIN bookAuthors ba ON ba.authorId=a.id GROUP BY a.id ORDER BY n DESC LIMIT 5''')
q('Links per site', """SELECT site, COUNT(*) FROM bookLinks GROUP BY site UNION ALL SELECT site, COUNT(*) FROM authorLinks GROUP BY site""")
q('Links for one book', """SELECT l.site, l.url FROM bookLinks l JOIN books b ON b.id=l.bookId WHERE b.title='The Hunger Games' ORDER BY l.site""")
q('Authors of Good Omens with Wikipedia links', """SELECT a.name, l.url FROM bookAuthors ba JOIN authors a ON a.id=ba.authorId
  LEFT JOIN authorLinks l ON l.authorId=a.id AND l.site='wikipedia'
  WHERE ba.bookId=(SELECT id FROM books WHERE title LIKE 'Good Omens%')""")
q('Books with no Open Library link', """SELECT b.title FROM books b WHERE NOT EXISTS
  (SELECT 1 FROM bookLinks l WHERE l.bookId=b.id AND l.site='openlibrary') LIMIT 3""")
