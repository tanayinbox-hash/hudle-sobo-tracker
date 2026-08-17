# 🎾 Hudle South Mumbai Slot Tracker & Auto-Booker Bot

An automated tool to track court availability and snipe newly opened **Padel** and **Pickleball** slots in **South Mumbai (SoBo)** on [Hudle.in](https://hudle.in).

---

## 📍 Configured South Mumbai Venues

Your bot is configured for your 7 chosen South Mumbai venues:

1. **Courtside Padel Social Club** – *Worli* (`courtside_worli`) — Padel
2. **Padel 360** – *Worli* (`padel_360_worli`) — Padel & Pickleball
3. **NSCI Padel Club** – *Worli* (`nsci_padel_worli`) — Padel
4. **7Padel | PDP Malabar Hill** – *Malabar Hill* (`7padel_malabar_hill`) — Padel
5. **NautiPickle** – *Ballard Pier* (`nautipickle_ballard_pier`) — Pickleball
6. **Smash Dock** – *Colaba* (`smash_dock_colaba`) — Pickleball
7. **Global Sports Pickleball Center** – *Lower Parel* (`global_sports_lower_parel`) — Pickleball

---

## 🛠️ Setup & Installation

### 1. Requirements
* Python 3.8+
* `requests` package (`pip install requests`)

### 2. Configure Your Auth Token (`config.py`)
To enable automated booking, fetch your session token from your browser:
1. Log in to [Hudle.in](https://hudle.in) in Google Chrome.
2. Open **Developer Tools** (`Cmd + Option + I` or `F12`) -> Go to the **Network** tab.
3. Click any request to `hudle.in` -> Look under **Request Headers** for `Authorization: Bearer <token>`.
4. Copy `<token>` and paste it into `config.py` as `HUDLE_AUTH_TOKEN` (or set environment variable `export HUDLE_AUTH_TOKEN="your_token"`).

---

## 🚀 How to Run

### 1. Slot Availability Tracker & Monitor (`hudle_tracker.py`)
Scans all 7 South Mumbai venues every 30 seconds for cancellations or new date releases:
```bash
python3 hudle_tracker.py
```
*Outputs real-time notifications to console and optional Telegram bot.*

---

### 2. High-Speed Slot Sniper (`hudle_sniper.py`)
Fires sub-second slot booking requests at the exact millisecond slots open:

```bash
python3 hudle_sniper.py <venue_key> <target_date> <release_time> <preferred_times>
```

#### Example Command:
To snipe a 7:00 PM or 8:00 PM slot at **Courtside Worli** for August 20th when slots open at Midnight (00:00:00):
```bash
python3 hudle_sniper.py courtside_worli 2026-08-20 00:00:00 19:00,20:00
```

---

## 💡 Best Practices for Ultra-Fast Booking
1. **Pre-Load Hudle Wallet**: Keep funds in your Hudle Wallet / Hudle Credits. Payment via Wallet takes `<500ms`, whereas UPI redirects take 15–30 seconds.
2. **Clock Synchronization**: Ensure your computer clock is synchronized via NTP (`sudo ntpdate time.apple.com` on Mac).
