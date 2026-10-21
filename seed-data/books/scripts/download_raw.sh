#!/bin/sh
# Download the goodbooks-10k CSVs (about 100 MB) into seed-data/books/raw/ (not committed).
set -e
cd "$(dirname "$0")/.."
mkdir -p raw
for f in books.csv ratings.csv to_read.csv tags.csv book_tags.csv; do
  curl -fL -o "raw/$f" "https://raw.githubusercontent.com/zygmuntz/goodbooks-10k/master/$f"
done
