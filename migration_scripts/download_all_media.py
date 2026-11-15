import os
import json
import urllib.request
import ssl
import re

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
headers = {'User-Agent': 'Mozilla/5.0'}

base_dirs = [
    'frontend/public/assets/logo',
    'frontend/public/assets/company',
    'frontend/public/assets/services',
    'frontend/public/assets/projects',
    'frontend/public/assets/portfolio',
    'frontend/public/assets/banners',
    'frontend/public/assets/icons',
    'frontend/public/assets/videos',
    'frontend/public/assets/documents'
]

for d in base_dirs:
    os.makedirs(d, exist_ok=True)

# Look for assets on the live website and in bundles
with open('extracted_bundle_strings.json', 'r', encoding='utf-8') as f:
    strings = json.load(f)['all_strings']

asset_urls = set()
for s in strings:
    if any(s.endswith(ext) for ext in ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.ico', '.pdf']):
        if s.startswith('/'):
            asset_urls.add('https://royalbusinessmachine.com' + s)
        elif s.startswith('http'):
            asset_urls.add(s)

print(f"Found {len(asset_urls)} potential asset URLs in bundles:")
for u in sorted(asset_urls):
    print(" -", u)

# Check favicon.ico and common paths
common_assets = [
    'https://royalbusinessmachine.com/favicon.ico',
    'https://royalbusinessmachine.com/logo.png',
    'https://royalbusinessmachine.com/logo.svg',
    'https://royalbusinessmachine.com/images/logo.png',
    'https://royalbusinessmachine.com/assets/logo.png'
]

for ca in common_assets:
    asset_urls.add(ca)

downloaded = {}
for u in asset_urls:
    fname = os.path.basename(u.split('?')[0])
    # Decide folder
    if 'logo' in fname.lower() or 'icon' in fname.lower() or 'favicon' in fname.lower():
        folder = 'frontend/public/assets/logo'
    elif 'service' in fname.lower():
        folder = 'frontend/public/assets/services'
    elif 'project' in fname.lower() or 'portfolio' in fname.lower():
        folder = 'frontend/public/assets/projects'
    else:
        folder = 'frontend/public/assets/icons'
    dest = os.path.join(folder, fname)
    try:
        req = urllib.request.Request(u, headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=8) as resp:
            content = resp.read()
            with open(dest, 'wb') as out_f:
                out_f.write(content)
            downloaded[u] = {
                "local_path": dest.replace('\\', '/'),
                "size_bytes": len(content),
                "status": "downloaded"
            }
            print(f"Downloaded: {u} -> {dest} ({len(content)} bytes)")
    except Exception as e:
        downloaded[u] = {
            "status": "failed",
            "error": str(e)
        }

with open('downloaded_assets_summary.json', 'w', encoding='utf-8') as out:
    json.dump(downloaded, out, indent=2)

print("\nAsset download scan complete.")
