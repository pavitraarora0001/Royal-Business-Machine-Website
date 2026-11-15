import json
import re

with open('all_frontend_source_dump.json', 'r', encoding='utf-8') as f:
    files = json.load(f)['files']

# 1. NAVBAR
navbar = files.get('components/navbar.tsx', '')
# Extract links
nav_links = re.findall(r'href:\s*[\'"]([^\'"]+)[\'"],\s*name:\s*[\'"]([^\'"]+)[\'"]', navbar)

# 2. FOOTER
footer = files.get('components/footer.tsx', '')

# 3. HERO
hero = files.get('components/home/hero-section.tsx', '')

# 4. STATS
stats = files.get('components/stats-section.tsx', '')

# 5. SERVICES PREVIEW & SERVICES PAGE
services_preview = files.get('components/home/services-preview.tsx', '')
services_page = files.get('app/services/page.tsx', '')

# 6. ABOUT & TIMELINE
about_page = files.get('app/about/page.tsx', '')
timeline = files.get('components/about/timeline.tsx', '')

# 7. PROJECTS
projects_page = files.get('app/projects/page.tsx', '')

# 8. CONTACT
contact_page = files.get('app/contact/page.tsx', '')

# 9. ACHIEVEMENTS
achievements_page = files.get('app/achievements/page.tsx', '')

# 10. BLOG
blog_page = files.get('app/blog/page.tsx', '')

# 11. CAREERS
careers_page = files.get('app/careers/page.tsx', '')

# 12. FAQ
faq_page = files.get('app/faq/page.tsx', '')

# 13. INDUSTRIES
industries_page = files.get('app/industries/page.tsx', '')

# 14. PROCESS
process_page = files.get('app/process/page.tsx', '')

# 15. TEAM
team_page = files.get('app/team/page.tsx', '')

# 16. TESTIMONIALS
testimonials_page = files.get('app/testimonials/page.tsx', '')

# 17. LAYOUT
layout = files.get('app/layout.tsx', '')

print("Extracted all components into memory successfully.")
