import json

with open('all_frontend_source_dump.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

files = data['files']

for path, content in files.items():
    print(f"==================================================")
    print(f"FILE: {path} ({len(content)} bytes)")
    print(f"==================================================")
    lines = content.splitlines()
    for l in lines[:40]:
        print(l)
    if len(lines) > 40:
        print(f"... [{len(lines)-40} more lines]")
