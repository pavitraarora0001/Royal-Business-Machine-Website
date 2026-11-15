import json
import re

with open('all_frontend_source_dump.json', 'r', encoding='utf-8') as f:
    files = json.load(f)['files']

# Let's inspect Services
services_code = files.get('app/services/page.tsx', '')
print("=== SERVICES PAGE CONTENT ===")
print(services_code[:2000])

print("\n=== PROJECTS PAGE CONTENT ===")
projects_code = files.get('app/projects/page.tsx', '')
print(projects_code[:2000])

print("\n=== ABOUT PAGE CONTENT ===")
about_code = files.get('app/about/page.tsx', '')
print(about_code[:2000])
