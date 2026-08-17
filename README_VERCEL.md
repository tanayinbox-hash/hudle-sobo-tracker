# 🌐 Deploying Your Hudle Tracker Web App to Vercel

You can deploy this **South Mumbai Hudle Slot Tracker & Sniper Web App** to Vercel for **FREE** in under 2 minutes.

---

## ⚡ Option 1: Vercel Web Dashboard (Easiest - 1 Click)

1. **Push your code to GitHub**:
   - Create a repository on GitHub (e.g. `hudle-sobo-tracker`).
   - Push your project files (`index.html`, `styles.css`, `app.js`, `vercel.json`).

2. **Deploy on Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new) and log in with GitHub.
   - Select your `hudle-sobo-tracker` repository.
   - Click **Deploy**!

3. Your website will be live instantly at `https://hudle-sobo-tracker.vercel.app`! 🎉

---

## 💻 Option 2: Vercel CLI (From your Terminal)

Run the following commands in your terminal inside the project directory:

```bash
# 1. Install Vercel CLI globally (if not already installed)
npm install -g vercel

# 2. Deploy directly to Vercel
vercel
```

Follow the prompts on screen, and Vercel will give you a live production URL immediately.

---

## 📱 Features Included on Your Vercel Webpage

1. **7 South Mumbai Venues**: Pre-loaded for Courtside Worli, Padel 360, NSCI Worli, 7Padel Malabar Hill, NautiPickle Ballard Pier, Smash Dock Colaba, Global Sports Lower Parel.
2. **Real-Time Millisecond Clock**: NTP-synced time display for precision tracking.
3. **Interactive Sniper Panel**: Select venue, date, and time window to schedule sub-second auto-booking.
4. **Auth & Webhooks**: Configure your Hudle Bearer Token & Telegram alerts safely stored in your browser's localStorage.
