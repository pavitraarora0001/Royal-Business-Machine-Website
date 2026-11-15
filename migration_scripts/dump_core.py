import json
import re

with open('all_frontend_source_dump.json', 'r', encoding='utf-8') as f:
    files = json.load(f)['files']

def print_section(title, content):
    print(f"\n{'='*20} {title} {'='*20}")
    print(content)

# Examine Hero & Layout
print_section("LAYOUT METADATA", files.get('app/layout.tsx', ''))
print_section("HERO SECTION", files.get('components/home/hero-section.tsx', ''))
print_section("STATS SECTION", files.get('components/stats-section.tsx', ''))
print_section("NAVBAR", files.get('components/navbar.tsx', ''))
print_section("FOOTER", files.get('components/footer.tsx', ''))
