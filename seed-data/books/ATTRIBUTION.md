# Seed data sources

- Books, authors, users' shelves: derived from goodbooks-10k by Zygmunt Zając
  (https://github.com/zygmuntz/goodbooks-10k), licensed CC BY-SA 4.0
  (https://creativecommons.org/licenses/by-sa/4.0/). Changes: the 1,000 most-rated books;
  titles, authors, years and ISBNs cleaned; users renamed; shelves sampled from to_read and
  5-star ratings. This derived data is shared under CC BY-SA 4.0.
- bookLinks.openLibraryUrl: Open Library (https://openlibrary.org), data CC0.
- authorLinks.wikipediaUrl: found via Wikidata (https://www.wikidata.org), CC0.
- goodreadsUrl / amazonUrl are built from goodbooks ids and ISBN-10s (links only, no content copied).
- Cover images (coverUrl) belong to their publishers; they are linked, not copied.
