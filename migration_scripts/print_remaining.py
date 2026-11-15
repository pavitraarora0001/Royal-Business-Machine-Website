import json

with open('all_frontend_source_dump.json', 'r', encoding='utf-8') as f:
    files = json.load(f)['files']

for p in ['app/team/page.tsx', 'app/achievements/page.tsx', 'app/testimonials/page.tsx', 'app/faq/page.tsx', 'app/contact/page.tsx', 'components/about/timeline.tsx']:
    print(f"\n{'='*20} {p} {'='*20}")
    print(files.get(p, ''))
