import os
import re
import json

js_dir = 'extracted_js'
all_strings = set()
services_data = []
portfolio_data = []
company_data = []

for fname in os.listdir(js_dir):
    if not fname.endswith('.js') or fname == 'combined_bundles.js':
        continue
    filepath = os.path.join(js_dir, fname)
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()

    # Search for string literals with length > 15
    matches = re.findall(r'"([^"\\]*(?:\\.[^"\\]*)*)"', text)
    for m in matches:
        m_clean = m.replace('\\"', '"').replace('\\n', ' ').strip()
        if len(m_clean) > 15 and not m_clean.startswith('http') and not m_clean.startswith('data:') and not m_clean.startswith('M') and not m_clean.startswith('var '):
            all_strings.add(m_clean)

print("Total meaningful strings extracted from JS bundles:", len(all_strings))

# Filter by keywords
keywords = ['Royal Business', 'Machine', 'service', 'client', 'solution', 'enterprise', 'technology', 'transform', 'digital', 'consulting', 'development', 'design', 'mission', 'vision', 'founder', 'contact', 'email', 'phone', 'address', 'portfolio', 'project']

matched_strings = []
for s in sorted(all_strings):
    for kw in ['Royal Business Machine', 'RBM', 'Transform', 'Enterprise', 'Solutions', 'Software', 'Services', 'Empower', 'Innovative', 'Leadership', 'Our Mission', 'Our Vision']:
        if kw.lower() in s.lower():
            matched_strings.append(s)
            break

print(f"Matched {len(matched_strings)} business content strings:")
for s in matched_strings[:50]:
    print(" -", s)

with open('extracted_bundle_strings.json', 'w', encoding='utf-8') as out:
    json.dump({
        "matched_strings": matched_strings,
        "all_strings": sorted(list(all_strings))
    }, out, indent=2)
