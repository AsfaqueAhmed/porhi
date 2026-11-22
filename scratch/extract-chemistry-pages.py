#!/usr/bin/env python3
"""
Extract textbook pages for SSC Chemistry Chapters 1, 2, and 3 from the NCTB PDF.
Renders pages at 150 DPI and saves them to drafts/chemistry-chapter-X/pages/pY.jpg.
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
    "Secondary_-_(B_Version_)_-_Class-9-10_Chemistry_OPT_pdf_15740566487792.pdf",
)

CHAPTERS = [
    {
        "chapter": 1,
        "book_start": 1,
        "book_end": 16,
        "pdf_start_0idx": 5,  # PDF page 6 (1-based)
        "pdf_end_0idx": 20,  # PDF page 21 (1-based)
        "dest_dir": "drafts/chemistry-chapter-1/pages",
    },
    {
        "chapter": 2,
        "book_start": 17,
        "book_end": 34,
        "pdf_start_0idx": 21,  # PDF page 22 (1-based)
        "pdf_end_0idx": 38,  # PDF page 39 (1-based)
        "dest_dir": "drafts/chemistry-chapter-2/pages",
    },
    {
        "chapter": 3,
        "book_start": 35,
        "book_end": 58,
        "pdf_start_0idx": 39,  # PDF page 40 (1-based)
        "pdf_end_0idx": 62,  # PDF page 63 (1-based)
        "dest_dir": "drafts/chemistry-chapter-3/pages",
    },
]


def extract_pages(dpi: int = 150):
    print(f"Opening PDF: {PDF_PATH}")
    if not os.path.isfile(PDF_PATH):
        print(f"Error: PDF file not found at {PDF_PATH}", file=sys.stderr)
        sys.exit(1)

    doc = pymupdf.open(PDF_PATH)
    print(f"Total pages in PDF: {len(doc)}")

    total_extracted = 0
    for ch in CHAPTERS:
        dest_full = os.path.join(REPO_ROOT, ch["dest_dir"])
        os.makedirs(dest_full, exist_ok=True)
        print(
            f"\nExtracting Chapter {ch['chapter']} (Book pages {ch['book_start']}-{ch['book_end']} -> {ch['dest_dir']})..."
        )

        for book_p in range(ch["book_start"], ch["book_end"] + 1):
            pdf_idx = ch["pdf_start_0idx"] + (book_p - ch["book_start"])
            if pdf_idx >= len(doc):
                print(
                    f"Warning: PDF index {pdf_idx} out of range (max {len(doc) - 1})",
                    file=sys.stderr,
                )
                continue
            page = doc[pdf_idx]
            pix = page.get_pixmap(dpi=dpi)
            out_file = os.path.join(dest_full, f"p{book_p}.jpg")
            pix.save(out_file)
            total_extracted += 1
            print(
                f"  Saved page {book_p} (PDF page {pdf_idx + 1}) -> {out_file} ({pix.width}x{pix.height})"
            )

    print(f"\nExtraction complete! Total {total_extracted} pages extracted.")


if __name__ == "__main__":
    extract_pages()
