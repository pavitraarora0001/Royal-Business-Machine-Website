import os
import json
import re

base_dir = r"C:\Pavitra-Arora\Royal-Business-Machine\Application\Royal-Business-Machine-Website-main\Royal-Business-Machine-Website-main\frontend\src"

all_files_content = {}
summary = {
    "pages": {},
    "components": {},
    "metadata": {}
}

for root, dirs, files in os.walk(base_dir):
    for f in files:
        if f.endswith(('.tsx', '.ts', '.jsx', '.js', '.json')):
            full_path = os.path.join(root, f)
            rel_path = os.path.relpath(full_path, base_dir).replace('\\', '/')
            with open(full_path, 'r', encoding='utf-8', errors='ignore') as src_file:
                content = src_file.read()
            all_files_content[rel_path] = content

            if rel_path.startswith('app/'):
                page_name = os.path.dirname(rel_path).replace('app', '').strip('/') or 'home'
                # Check for metadata
                meta_match = re.search(r'export\s+const\s+metadata\s*[:=][^;]+;', content)
                summary["pages"][page_name] = {
                    "rel_path": rel_path,
                    "length": len(content),
                    "has_metadata": bool(meta_match),
                    "metadata": meta_match.group(0) if meta_match else ""
                }
            elif rel_path.startswith('components/'):
                summary["components"][rel_path] = {
                    "length": len(content)
                }

with open('all_frontend_source_dump.json', 'w', encoding='utf-8') as out:
    json.dump({
        "summary": summary,
        "files": all_files_content
    }, out, indent=2)

print(f"Extracted {len(all_files_content)} frontend source files.")
print(f"Pages found ({len(summary['pages'])}):", list(summary['pages'].keys()))
print(f"Components found ({len(summary['components'])}):", list(summary['components'].keys()))
