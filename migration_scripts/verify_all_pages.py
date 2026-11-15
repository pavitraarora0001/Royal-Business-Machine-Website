import urllib.request
import json

routes = [
    '/',
    '/about',
    '/team',
    '/achievements',
    '/services',
    '/services/web-development',
    '/services/mobile-apps',
    '/services/digital-marketing',
    '/services/consulting',
    '/projects',
    '/portfolio',
    '/industries',
    '/process',
    '/testimonials',
    '/blog',
    '/faq',
    '/careers',
    '/contact',
    '/privacy',
    '/terms',
    '/login',
    '/register',
    '/client/dashboard',
    '/admin/dashboard',
    '/sitemap.xml',
    '/robots.txt'
]

results = []
all_ok = True

print(f"Testing {len(routes)} routes against http://localhost:3000 ...")

for r in routes:
    url = f"http://localhost:3000{r}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as resp:
            status = resp.status
            content = resp.read()
            results.append({
                "route": r,
                "status": status,
                "length": len(content),
                "ok": status == 200
            })
            print(f"✓ {r:32} -> {status} (Length: {len(content)} bytes)")
    except Exception as e:
        all_ok = False
        results.append({
            "route": r,
            "error": str(e),
            "ok": False
        })
        print(f"✗ {r:32} -> ERROR: {e}")

with open('verification_results.json', 'w', encoding='utf-8') as f:
    json.dump({
        "all_passed": all_ok,
        "total": len(routes),
        "results": results
    }, f, indent=2)

print("\nAll routes verified successfully!" if all_ok else "\nSome routes had issues.")
