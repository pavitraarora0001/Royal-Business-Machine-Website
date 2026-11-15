import os
import re
import json

routes = set()
services = set()
projects = set()
emails = set()
phones = set()
titles = set()

for fname in os.listdir('extracted_js'):
    if not fname.endswith('.js'):
        continue
    with open(os.path.join('extracted_js', fname), 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all path-like strings
    found_paths = re.findall(r'["\'](/[a-zA-Z0-9_\-/]+)["\']', content)
    for p in found_paths:
        if any(p.startswith(x) for x in ['/_next', '/api', '/node_modules', '/webpack', '/static']):
            continue
        if any(p.endswith(x) for x in ['.js', '.css', '.png', '.jpg', '.svg', '.woff2']):
            continue
        if len(p) > 1:
            routes.add(p)

    # Find emails & phones
    for e in re.findall(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', content):
        emails.add(e)
    for ph in re.findall(r'\+?91[\s-]?[6-9]\d{9}', content):
        phones.add(ph)

print("Discovered possible routes from JS bundles:")
for r in sorted(routes):
    print(" -", r)

print("\nEmails:", emails)
print("Phones:", phones)
