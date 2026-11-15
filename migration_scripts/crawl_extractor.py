import urllib.request
import ssl
import re
import json
import os
from urllib.parse import urljoin, urlparse

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

BASE_URL = "https://royalbusinessmachine.com/"
DOMAIN = "royalbusinessmachine.com"

visited_urls = set()
to_visit = [BASE_URL]
discovered_pages = {}
all_assets = {
    "images": set(),
    "videos": set(),
    "documents": set(),
    "scripts": set(),
    "stylesheets": set(),
    "links": set()
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}

print("Starting deep crawl of", BASE_URL)

while to_visit:
    current_url = to_visit.pop(0)
    # Normalize URL
    parsed = urlparse(current_url)
    clean_url = f"{parsed.scheme}://{parsed.netloc}{parsed.path}"
    if clean_url.endswith('/') and clean_url != BASE_URL:
        clean_url = clean_url[:-1]

    if clean_url in visited_urls:
        continue
    visited_urls.add(clean_url)

    print(f"Crawling: {clean_url}")
    try:
        req = urllib.request.Request(current_url, headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            content_type = resp.headers.get_content_type()
            raw_bytes = resp.read()
            html = raw_bytes.decode('utf-8', errors='ignore')

            # Extract title
            title_m = re.search(r'<title[^>]*>(.*?)</title>', html, re.I | re.S)
            title = title_m.group(1).strip() if title_m else ""

            # Extract meta description
            desc_m = re.search(r'<meta[^>]*name=[\"\']description[\"\'][^>]*content=[\"\'](.*?)[\"\']', html, re.I)
            if not desc_m:
                desc_m = re.search(r'<meta[^>]*content=[\"\'](.*?)[\"\'][^>]*name=[\"\']description[\"\']', html, re.I)
            meta_desc = desc_m.group(1).strip() if desc_m else ""

            # Extract headings
            h1s = [re.sub(r'<[^>]+>', '', h).strip() for h in re.findall(r'<h1[^>]*>(.*?)</h1>', html, re.I | re.S)]
            h2s = [re.sub(r'<[^>]+>', '', h).strip() for h in re.findall(r'<h2[^>]*>(.*?)</h2>', html, re.I | re.S)]
            h3s = [re.sub(r'<[^>]+>', '', h).strip() for h in re.findall(r'<h3[^>]*>(.*?)</h3>', html, re.I | re.S)]

            # Extract images
            imgs = re.findall(r'<img[^>]+src=[\"\'](.*?)[\"\']', html, re.I)
            page_images = []
            for img in imgs:
                img_url = urljoin(current_url, img)
                page_images.append(img_url)
                all_assets["images"].add(img_url)

            # Store page details
            discovered_pages[clean_url] = {
                "url": clean_url,
                "title": title,
                "meta_description": meta_desc,
                "h1": h1s,
                "h2": h2s,
                "h3": h3s,
                "images": page_images,
                "html_length": len(html),
                "raw_html": html
            }

            # Extract internal links
            raw_links = re.findall(r'href=[\"\'](.*?)[\"\']', html, re.I)
            for link in raw_links:
                all_assets["links"].add(link)
                full_url = urljoin(current_url, link)
                p = urlparse(full_url)
                if p.netloc == DOMAIN or p.netloc == f"www.{DOMAIN}":
                    # Check if page (not asset)
                    ext = os.path.splitext(p.path)[1].lower()
                    if ext in ['.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp', '.pdf', '.css', '.js']:
                        if ext == '.pdf':
                            all_assets["documents"].add(full_url)
                        elif ext in ['.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp']:
                            all_assets["images"].add(full_url)
                    else:
                        norm = f"{p.scheme}://{p.netloc}{p.path}"
                        if norm.endswith('/') and norm != BASE_URL:
                            norm = norm[:-1]
                        if norm not in visited_urls and norm not in to_visit:
                            to_visit.append(full_url)

    except Exception as e:
        print(f"Error crawling {current_url}: {e}")
        discovered_pages[clean_url] = {"url": clean_url, "error": str(e)}

print(f"\nDiscovered {len(discovered_pages)} pages in total.")
for p, data in discovered_pages.items():
    print(f"- {p} | Title: {data.get('title')}")

# Save crawl result
with open("crawl_summary.json", "w", encoding="utf-8") as f:
    json.dump({
        "pages": {k: {k2: v2 for k2, v2 in v.items() if k2 != "raw_html"} for k, v in discovered_pages.items()},
        "assets": {k: list(v) for k, v in all_assets.items()}
    }, f, indent=2)

with open("homepage_raw.html", "w", encoding="utf-8") as f:
    if BASE_URL in discovered_pages and "raw_html" in discovered_pages[BASE_URL]:
        f.write(discovered_pages[BASE_URL]["raw_html"])
    elif clean_url in discovered_pages and "raw_html" in discovered_pages[clean_url]:
        f.write(discovered_pages[clean_url]["raw_html"])

print("Crawl results written to crawl_summary.json and homepage_raw.html")
