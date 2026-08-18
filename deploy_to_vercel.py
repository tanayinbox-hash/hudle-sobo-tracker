import os
import json
import urllib.request
import urllib.error
import ssl

def deploy_to_vercel(token=None):
    if not token:
        token = os.getenv("VERCEL_TOKEN")
    
    if not token:
        print("VERCEL TOKEN REQUIRED")
        return False

    files_to_upload = ["index.html", "app.js", "vercel.json", "api/slots.js"]
    files_payload = []

    for fname in files_to_upload:
        if os.path.exists(fname):
            with open(fname, "r", encoding="utf-8") as f:
                content = f.read()
            files_payload.append({
                "file": fname,
                "data": content
            })

    url = "https://api.vercel.com/v13/deployments"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    payload = {
        "name": "hudle-sobo-tracker",
        "target": "production",
        "files": files_payload,
        "projectSettings": {
            "framework": None
        }
    }

    print(f"🚀 Deploying to Vercel PRODUCTION ({len(files_payload)} files)...")
    ctx = ssl._create_unverified_context()
    req = urllib.request.Request(url, data=json.dumps(payload).encode("utf-8"), headers=headers, method="POST")

    try:
        with urllib.request.urlopen(req, context=ctx) as res:
            data = json.loads(res.read().decode("utf-8"))
            url = data.get("url")
            print("=" * 60)
            print("🎉 PRODUCTION DEPLOYMENT SUCCESSFUL!")
            print(f"🌐 Live URL: https://{url}")
            print("=" * 60)
            return f"https://{url}"
    except urllib.error.HTTPError as e:
        err_body = e.read().decode('utf-8')
        print(f"❌ Deployment failed ({e.code}): {err_body}")
        return False

if __name__ == "__main__":
    import sys
    token_arg = sys.argv[1] if len(sys.argv) > 1 else None
    deploy_to_vercel(token_arg)
