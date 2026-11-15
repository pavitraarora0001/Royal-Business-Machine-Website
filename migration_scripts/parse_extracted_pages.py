import os
import re
import json

pages_dir = 'live_site_pages'
extracted_pages_data = {}

for f in os.listdir(pages_dir):
    if not f.endswith('.html'):
        continue
    filepath = os.path.join(pages_dir, f)
    with open(filepath, 'r', encoding='utf-8') as file:
        html = file.read()

    # Extract title
    title_m = re.search(r'<title[^>]*>(.*?)</title>', html, re.I | re.S)
    title = title_m.group(1).strip() if title_m else ""

    # Clean out scripts, styles, SVGs
    clean = re.sub(r'<script[^>]*>.*?</script>', ' ', html, flags=re.DOTALL | re.IGNORECASE)
    clean = re.sub(r'<style[^>]*>.*?</style>', ' ', clean, flags=re.DOTALL | re.IGNORECASE)
    clean = re.sub(r'<svg[^>]*>.*?</svg>', ' ', clean, flags=re.DOTALL | re.IGNORECASE)

    # Extract all text tokens inside HTML tags
    text_blocks = re.findall(r'>([^<]+)<', clean)
    clean_blocks = [t.strip() for t in text_blocks if t.strip() and len(t.strip()) > 1]

    # Extract headings
    h1s = [re.sub(r'<[^>]+>', '', h).strip() for h in re.findall(r'<h1[^>]*>(.*?)</h1>', html, re.I | re.S)]
    h2s = [re.sub(r'<[^>]+>', '', h).strip() for h in re.findall(r'<h2[^>]*>(.*?)</h2>', html, re.I | re.S)]
    h3s = [re.sub(r'<[^>]+>', '', h).strip() for h in re.findall(r'<h3[^>]*>(.*?)</h3>', html, re.I | re.S)]
    h4s = [re.sub(r'<[^>]+>', '', h).strip() for h in re.findall(r'<h4[^>]*>(.*?)</h4>', html, re.I | re.S)]

    # Extract images
    imgs = re.findall(r'<img[^>]+src=[\'"](.*?)[\'"]', html, re.I)

    # Extract buttons and links
    buttons = [re.sub(r'<[^>]+>', '', b).strip() for b in re.findall(r'<button[^>]*>(.*?)</button>', html, re.I | re.S)]
    links = re.findall(r'<a[^>]+href=[\'"](.*?)[\'"][^>]*>(.*?)</a>', html, re.I | re.S)
    clean_links = [{"href": l[0], "text": re.sub(r'<[^>]+>', '', l[1]).strip()} for l in links if l[0]]

    # Extract flight data chunks (Next.js App router renders inside flight chunks!)
    flight_chunks = re.findall(r'self\.__next_f\.push\(\[[0-9]+,\s*"(.*?)"\]\)', html)
    flight_text = []
    for fc in flight_chunks:
        try:
            decoded = fc.encode().decode('unicode-escape')
            # Extract plain text strings in flight format
            strings = re.findall(r'"([A-Za-z0-9\s,\.\?!:;\-\(\)\'\"&@\+%/]+)"', decoded)
            for s in strings:
                if len(s.strip()) > 3 and not s.startswith('$') and not s.startswith('http'):
                    flight_text.append(s.strip())
        except:
            pass

    extracted_pages_data[f] = {
        "title": title,
        "h1": h1s,
        "h2": h2s,
        "h3": h3s,
        "h4": h4s,
        "images": imgs,
        "buttons": [b for b in buttons if b],
        "links": clean_links,
        "visible_text_sample": clean_blocks[:30],
        "flight_strings_sample": list(dict.fromkeys(flight_text))[:50],
        "all_flight_strings": list(dict.fromkeys(flight_text))
    }

with open('extracted_pages_content.json', 'w', encoding='utf-8') as out:
    json.dump(extracted_pages_data, out, indent=2)

print("Saved extracted_pages_content.json with data for", len(extracted_pages_data), "pages.")
for p, data in extracted_pages_data.items():
    print(f"\n--- Page: {p} ---")
    print("Headings:", data["h1"] + data["h2"])
    print("Flight Strings Count:", len(data["all_flight_strings"]))
    print("Flight Strings Preview:", data["flight_strings_sample"][:10])
