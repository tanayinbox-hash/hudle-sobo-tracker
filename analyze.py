import re, os, sys

def analyze(fname):
    if not os.path.exists(fname):
        return
    with open(fname, 'r', encoding='utf-8', errors='ignore') as f:
        text = f.read()
    
    print(f"=== {fname} ({len(text)} bytes) ===", flush=True)
    
    # Extract strings matching /something
    paths = set(re.findall(r'\"(/[a-zA-Z0-9_\-/\?=&]+)\"', text) + re.findall(r'\'(/[a-zA-Z0-9_\-/\?=&]+)\'', text))
    interesting = [p for p in paths if any(k in p.lower() for k in ['venue', 'slot', 'book', 'auth', 'sport', 'city', 'search', 'cart', 'pay', 'user', 'otp', 'token', 'checkout', 'v1', 'v2', 'api'])]
    print("  Paths:", interesting[:30], flush=True)

analyze('venue_search.js')
analyze('venue_detail.js')
