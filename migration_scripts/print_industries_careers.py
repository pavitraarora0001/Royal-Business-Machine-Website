import json

with open('all_frontend_source_dump.json', 'r', encoding='utf-8') as f:
    files = json.load(f)['files']

for p in ['app/industries/page.tsx', 'app/careers/page.tsx', 'app/faq/page.tsx']:
    print(f"\n{'='*20} {p} {'='*20}")
    print(files.get(p, ''))
