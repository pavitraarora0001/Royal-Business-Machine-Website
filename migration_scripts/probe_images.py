import urllib.request
import ssl
import os

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
headers = {'User-Agent': 'Mozilla/5.0'}

image_candidates = [
    'hero-bg.jpg', 'hero-bg.png', 'about.jpg', 'about.png', 'team.jpg', 'team.png',
    'logo-white.png', 'logo-dark.png', 'favicon.png', 'banner.jpg', 'banner.png',
    'project1.jpg', 'project2.jpg', 'project3.jpg', 'portfolio1.jpg', 'portfolio2.jpg',
    'service1.jpg', 'service2.jpg', 'service3.jpg', 'services/web.jpg', 'services/mobile.jpg',
    'clients/client1.png', 'clients/client2.png'
]

prefixes = [
    'https://royalbusinessmachine.com/images/',
    'https://royalbusinessmachine.com/assets/',
    'https://royalbusinessmachine.com/'
]

for p in prefixes:
    for img in image_candidates:
        u = p + img
        try:
            req = urllib.request.Request(u, headers=headers)
            with urllib.request.urlopen(req, context=ctx, timeout=3) as resp:
                if resp.status == 200:
                    data = resp.read()
                    dest = os.path.join('frontend/public/assets', os.path.basename(img))
                    with open(dest, 'wb') as f:
                        f.write(data)
                    print(f"FOUND & DOWNLOADED: {u} ({len(data)} bytes)")
        except:
            pass

print("Candidate image probe finished.")
