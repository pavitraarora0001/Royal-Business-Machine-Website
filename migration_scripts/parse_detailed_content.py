import json
import re

with open('all_frontend_source_dump.json', 'r', encoding='utf-8') as f:
    files = json.load(f)['files']

# Let's inspect each page's data structures
parsed_data = {}

# 1. Services
services_code = files.get('app/services/page.tsx', '')
services_preview_code = files.get('components/home/services-preview.tsx', '')

# 2. Projects
projects_code = files.get('app/projects/page.tsx', '')

# 3. About
about_code = files.get('app/about/page.tsx', '')
timeline_code = files.get('components/about/timeline.tsx', '')

# 4. Team
team_code = files.get('app/team/page.tsx', '')

# 5. Testimonials
testimonials_code = files.get('app/testimonials/page.tsx', '')

# 6. FAQ
faq_code = files.get('app/faq/page.tsx', '')

# 7. Blog
blog_code = files.get('app/blog/page.tsx', '')

# 8. Careers
careers_code = files.get('app/careers/page.tsx', '')

# 9. Process
process_code = files.get('app/process/page.tsx', '')

# 10. Achievements
achievements_code = files.get('app/achievements/page.tsx', '')

# 11. Industries
industries_code = files.get('app/industries/page.tsx', '')

# 12. Contact
contact_code = files.get('app/contact/page.tsx', '')

print("Services length:", len(services_code))
print("Projects length:", len(projects_code))
print("About length:", len(about_code))
print("Team length:", len(team_code))
print("Testimonials length:", len(testimonials_code))
print("FAQ length:", len(faq_code))
print("Blog length:", len(blog_code))
print("Careers length:", len(careers_code))
print("Process length:", len(process_code))
print("Achievements length:", len(achievements_code))
print("Industries length:", len(industries_code))
print("Contact length:", len(contact_code))
