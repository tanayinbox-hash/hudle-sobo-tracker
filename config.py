import os

# =====================================================================
# HUDLE SOUTH MUMBAI SLOT TRACKER & SNIPER CONFIGURATION
# =====================================================================

# 1. USER AUTHENTICATION
# Obtain your Bearer Token from your browser DevTools (Network tab -> Authorization header)
HUDLE_AUTH_TOKEN = os.getenv("HUDLE_AUTH_TOKEN", "YOUR_BEARER_TOKEN_HERE")

# 2. TARGET SOUTH MUMBAI VENUES
SOUTH_MUMBAI_VENUES = {
    "courtside_worli": {
        "id": "courtside-padel-social-club-worli",
        "name": "Courtside Padel Social Club",
        "location": "Worli",
        "sports": ["Padel"]
    },
    "padel_360_worli": {
        "id": "padel-360-worli",
        "name": "Padel 360",
        "location": "Worli",
        "sports": ["Padel", "Pickleball"]
    },
    "nsci_padel_worli": {
        "id": "nsci-padel-club-worli",
        "name": "NSCI Padel Club",
        "location": "Worli",
        "sports": ["Padel"]
    },
    "7padel_malabar_hill": {
        "id": "7padel-pdp-malabar-hill",
        "name": "7Padel | PDP Malabar Hill",
        "location": "Malabar Hill",
        "sports": ["Padel"]
    },
    "nautipickle_ballard_pier": {
        "id": "nautipickle-ballard-pier",
        "name": "NautiPickle",
        "location": "Ballard Pier",
        "sports": ["Pickleball"]
    },
    "smash_dock_colaba": {
        "id": "smash-dock-colaba",
        "name": "Smash Dock",
        "location": "Colaba",
        "sports": ["Pickleball"]
    },
    "global_sports_lower_parel": {
        "id": "global-sports-lower-parel",
        "name": "Global Sports Pickleball Center",
        "location": "Lower Parel",
        "sports": ["Pickleball"]
    }
}

# 3. PREFERRED BOOKING WINDOWS
# Specify time windows in 24h format (HH:MM)
PREFERRED_TIME_WINDOWS = [
    {"start": "06:00", "end": "09:00"},  # Early Morning
    {"start": "18:00", "end": "22:00"}   # Evening Prime Time
]

# 4. NOTIFICATION SETTINGS (Optional)
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "")
DISCORD_WEBHOOK_URL = os.getenv("DISCORD_WEBHOOK_URL", "")

# 5. POLLING & SNIPING SETTINGS
TRACKER_POLL_INTERVAL_SECONDS = 30  # How often to check for cancellations
SNIPER_LEAD_TIME_MS = 150           # Fire request 150ms before target second
