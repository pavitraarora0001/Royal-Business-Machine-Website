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

with open('all_pages_dumped_utf8.txt', 'w', encoding='utf-8') as out:
    for p in pages_to_dump:
        out.write(f"\n{'#'*30} {p} {'#'*30}\n")
        out.write(files.get(p, 'NOT FOUND'))
        out.write("\n")

print("Saved all_pages_dumped_utf8.txt")
