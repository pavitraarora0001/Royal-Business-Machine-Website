import urllib.request
import ssl
import json
import os
import re

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}

routes_to_test = [
    '/',
    '/about',
    '/services',
    '/services/web-development',
    '/services/mobile-apps',
    '/services/digital-marketing',
    '/services/consulting',
    '/portfolio',
    '/contact',
    '/login',
    '/register',
    '/privacy',
    '/terms',
    '/client/dashboard',
    '/admin/dashboard',
    '/auth/forgot-password',
    '/auth/verify-otp',
    # Also check other potential routes
    '/careers',
    '/faq',
    '/blog',
    '/industries',
    '/process',
    '/team',
    '/testimonials',
    '/achievements',
    '/pricing',
    '/sitemap',
    '/robots.txt',
    '/sitemap.xml'
]

os.makedirs('live_site_pages', exist_ok=True)
results = {}

for r in routes_to_test:
    url = 'https://royalbusinessmachine.com' + r
    print(f"Testing {url}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=12) as resp:
            status = resp.status
            content = resp.read()
            html = content.decode('utf-8', errors='ignore')
            safe_name = r.strip('/').replace('/', '_') or 'home'
            filepath = os.path.join('live_site_pages', f"{safe_name}.html")
            with open(filepath, 'w', encoding='utf-8') as out:
                out.write(html)
            
            # Extract title & meta description
            title_m = re.search(r'<title[^>]*>(.*?)</title>', html, re.I | re.S)
            title = title_m.group(1).strip() if title_m else ""
            desc_m = re.search(r'<meta[^>]*name=[\'"]description[\'"][^>]*content=[\'"](.*?)[\'"]', html, re.I)
            if not desc_m:
                desc_m = re.search(r'<meta[^>]*content=[\'"](.*?)[\'"][^>]*name=[\'"]description[\'"]', html, re.I)
            desc = desc_m.group(1).strip() if desc_m else ""

            # Check open graph
            og_title = re.search(r'<meta[^>]*property=[\'"]og:title[\'"][^>]*content=[\'"](.*?)[\'"]', html, re.I)
            og_desc = re.search(r'<meta[^>]*property=[\'"]og:description[\'"][^>]*content=[\'"](.*?)[\'"]', html, re.I)

            results[r] = {
                "status": status,
                "url": url,
                "length": len(html),
                "title": title,
                "description": desc,
                "og_title": og_title.group(1) if og_title else "",
                "og_description": og_desc.group(1) if og_desc else "",
                "saved_file": filepath
            }
            print(f"  -> SUCCESS ({status}) | Title: {title} | Length: {len(html)}")
    except urllib.error.HTTPError as e:
        print(f"  -> HTTP Error {e.code}")
        results[r] = {"status": e.code, "error": str(e)}
    except Exception as e:
        print(f"  -> Error: {e}")
        results[r] = {"status": "error", "error": str(e)}

with open('live_pages_inventory.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2)

print("\nFinished checking live pages. Inventory saved to live_pages_inventory.json")
