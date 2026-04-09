import datetime
import os

# Read the built file
with open('dist/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add cache-busting meta tags right after <head>
timestamp = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
cache_bust = f'''
<meta http-equiv="cache-control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="expires" content="0">
<!-- BUILD TIMESTAMP: {timestamp} -->
'''

html = html.replace('<head>', '<head>' + cache_bust, 1)

# Verify our latest CSS is in the file
checks = {
    'grid layout': 'grid-template-columns:1fr auto 1fr',
    'overlay opacity 0.4': 'rgba(244,244,246,.4)',
    'overlay opacity 0.7': 'rgba(244,244,246,.7)',
    'glass-bg 0.25': 'rgba(255,255,255,.25)',
}

print(f"Build timestamp: {timestamp}")
print(f"File size: {len(html)} bytes")
print()
for name, pattern in checks.items():
    # Normalize spaces for CSS comparison
    found = pattern in html or pattern.replace(' ', '') in html.replace(' ', '')
    status = "FOUND" if found else "MISSING"
    print(f"  [{status}] {name}: {pattern}")

# Delete all old YourBrew files
for f in os.listdir('.'):
    if f.startswith('YourBrew') and f.endswith('.html'):
        os.remove(f)
        print(f"Deleted old: {f}")

# Write the new file
with open('YourBrew.html', 'w', encoding='utf-8') as f:
    f.write(html)

print(f"\nWrote YourBrew.html ({len(html)} bytes)")
print("Done!")
