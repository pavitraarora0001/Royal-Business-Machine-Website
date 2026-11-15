import json

with open('all_frontend_source_dump.json', 'r', encoding='utf-8') as f:
    files = json.load(f)['files']

pages_to_dump = [
    'app/about/page.tsx',
    'components/about/timeline.tsx',
    'app/services/page.tsx',
    'components/home/services-preview.tsx',
    'app/projects/page.tsx',
    'app/contact/page.tsx',
    'app/achievements/page.tsx',
    'app/blog/page.tsx',
    'app/careers/page.tsx',
    'app/faq/page.tsx',
    'app/industries/page.tsx',
    'app/process/page.tsx',
    'app/team/page.tsx',
    'app/testimonials/page.tsx'
]

for p in pages_to_dump:
    print(f"\n{'#'*30} {p} {'#'*30}")
    print(files.get(p, 'NOT FOUND'))
