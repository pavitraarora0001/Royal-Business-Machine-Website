import urllib.request
import ssl
import re
import os

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

os.makedirs('extracted_js', exist_ok=True)

with open('homepage_raw.html', 'r', encoding='utf-8') as f:
    html = f.read()

scripts = re.findall(r'<script[^>]*src=[\'"](.*?)[\'"]', html)
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

all_text_corpus = []

for s in scripts:
    if s.startswith('/'):
        url = 'https://royalbusinessmachine.com' + s
    else:
        url = s
    fname = os.path.basename(s.split('?')[0])
    dest = os.path.join('extracted_js', fname)
    print(f"Downloading {url} -> {dest}")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            content = resp.read().decode('utf-8', errors='ignore')
            with open(dest, 'w', encoding='utf-8') as out:
                out.write(content)
            all_text_corpus.append(content)
    except Exception as e:
        print(f"Error {url}: {e}")

combined = "\n".join(all_text_corpus)
with open('extracted_js/combined_bundles.js', 'w', encoding='utf-8') as f:
    f.write(combined)

print(f"Saved all bundles. Total JS size: {len(combined)} chars")
