#!/usr/bin/env python3
"""
Extract textbook pages for SSC Biology Chapters 3 through 14 from the NCTB PDF.
Renders pages at 150 DPI and saves them to drafts/biology-chapter-X/pages/pY.jpg.
"""

import os
import sys

try:
    import pymupdf
except ImportError:
    import fitz as pymupdf

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF_PATH = os.path.join(
    REPO_ROOT,
    "docs",
    "book",
    "Secondary (BV)-2026_Class 9-10_Biology_compressed.pdf",
)

# In this PDF:
# Book page 1 is at 0-indexed PDF page 5 (PDF page 6)
# Offset: pdf_index = book_page + 4
CHAPTERS = [
    {"chapter": 3, "name": "কোষ বিভাজন", "start": 50, "end": 63},
    {"chapter": 4, "name": "জীবনীশক্তি", "start": 64, "end": 83},
    {"chapter": 5, "name": "খাদ্য, পুষ্টি এবং পরিপাক", "start": 84, "end": 124},
    {"chapter": 6, "name": "জীবে পরিবহন", "start": 125, "end": 159},
    {"chapter": 7, "name": "গ্যাসীয় বিনিময়", "start": 160, "end": 177},
    {"chapter": 8, "name": "রেচন প্রক্রিয়া", "start": 178, "end": 189},
    {"chapter": 9, "name": "দৃঢ়তা প্রদান ও চলন", "start": 190, "end": 203},
    {"chapter": 10, "name": "সমন্বয়", "start": 204, "end": 230},
    {"chapter": 11, "name": "জীবের প্রজনন", "start": 231, "end": 253},
    {"chapter": 12, "name": "জীবের বংশগতি ও জৈব অভিব্যক্তি", "start": 254, "end": 281},
    {"chapter": 13, "name": "জীবের পরিবেশ", "start": 282, "end": 304},
    {"chapter": 14, "name": "জীবপ্রযুক্তি", "start": 305, "end": 320},
]

def extract_all(dpi: int = 150):
    print(f"Opening PDF: {PDF_PATH}")
    if not os.path.isfile(PDF_PATH):
        print(f"Error: PDF not found: {PDF_PATH}", file=sys.stderr)
        sys.exit(1)

    doc = pymupdf.open(PDF_PATH)
    print(f"Total pages in PDF: {len(doc)}")

    for ch in CHAPTERS:
        dest_dir = os.path.join(REPO_ROOT, f"drafts/biology-chapter-{ch['chapter']}/pages")
        os.makedirs(dest_dir, exist_ok=True)
        print(f"\nExtracting Chapter {ch['chapter']} ({ch['name']}: pages {ch['start']}-{ch['end']})...")

        for book_p in range(ch["start"], ch["end"] + 1):
            pdf_idx = book_p + 4
            if pdf_idx >= len(doc):
                print(f"Warning: PDF index {pdf_idx} out of range", file=sys.stderr)
                continue
            page = doc[pdf_idx]
            pix = page.get_pixmap(dpi=dpi)
            out_file = os.path.join(dest_dir, f"p{book_p}.jpg")
            pix.save(out_file)

        print(f"  Done Chapter {ch['chapter']} ({ch['end'] - ch['start'] + 1} pages).")

    print("\nAll chapters 3-14 extracted successfully!")

if __name__ == "__main__":
    extract_all()
