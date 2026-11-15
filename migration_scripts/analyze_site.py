import re
import json

with open('homepage_raw.html', 'r', encoding='utf-8') as f:
    html = f.read()

print("HTML Length:", len(html))

# Look for all text content by removing tags
clean_text = re.sub(r'<script[^>]*>.*?</script>', '', html, flags=re.DOTALL | re.IGNORECASE)
clean_text = re.sub(r'<style[^>]*>.*?</style>', '', clean_text, flags=re.DOTALL | re.IGNORECASE)
clean_text = re.sub(r'<svg[^>]*>.*?</svg>', '', clean_text, flags=re.DOTALL | re.IGNORECASE)

# Extract scripts
scripts = re.findall(r'<script[^>]*src=[\'"](.*?)[\'"]', html)
print("Found external scripts:", len(scripts))
for s in scripts:
    print(" - Script:", s)

# App router next_f chunks
chunks = re.findall(r'self\.__next_f\.push\(\[([0-9]+),\s*"(.*?)"\]\)', html)
print(f"Found {len(chunks)} App Router flight chunks")

all_flight_text = []
for idx, chunk_str in chunks:
    # unescape
    try:
        decoded = chunk_str.encode().decode('unicode-escape')
        all_flight_text.append(decoded)
    except:
        all_flight_text.append(chunk_str)

full_extracted_content = "\n".join(all_flight_text)
with open('extracted_flight_content.txt', 'w', encoding='utf-8') as f:
    f.write(full_extracted_content)

print("Saved extracted_flight_content.txt (length:", len(full_extracted_content), ")")

# Search for routes or pages mentioned in script bundles or flight data
routes = set(re.findall(r'["\'](/[\w\-/]+)["\']', full_extracted_content))
filtered_routes = [r for r in sorted(routes) if not r.startswith('/_next') and not r.startswith('/api') and len(r) > 1 and '.' not in r]
print("\nPossible discovered routes from bundle:")
for r in filtered_routes:
    print(" - Route:", r)

# Search for emails, phone numbers, addresses, social links
emails = set(re.findall(r'[\w\.-]+@[\w\.-]+\.\w+', full_extracted_content + " " + html))
phones = set(re.findall(r'(?:\+91[\s-]?)?[6789]\d{9}', full_extracted_content + " " + html))
print("\nExtracted Emails:", emails)
print("Extracted Phones:", phones)
