import re

with open('all_pages_dumped.txt', 'r', encoding='utf-8') as f:
    text = f.read()

print("Total length of all_pages_dumped.txt:", len(text))
sections = re.findall(r'#{30}\s*(.*?)\s*#{30}', text)
print("Sections found:", sections)
