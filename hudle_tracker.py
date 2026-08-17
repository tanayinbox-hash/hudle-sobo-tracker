import time
import requests
import json
import logging
from datetime import datetime, timedelta
from config import (
    SOUTH_MUMBAI_VENUES, 
    PREFERRED_TIME_WINDOWS, 
    HUDLE_AUTH_TOKEN, 
    TELEGRAM_BOT_TOKEN, 
    TELEGRAM_CHAT_ID, 
    TRACKER_POLL_INTERVAL_SECONDS
)

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("HudleTracker")

def send_alert(message):
    """Sends notification alert to Telegram if configured."""
    print(f"\n🚀 [ALERT]: {message}\n")
    if TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID:
        try:
            url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
            payload = {"chat_id": TELEGRAM_CHAT_ID, "text": message, "parse_mode": "Markdown"}
            requests.post(url, json=payload, timeout=5)
        except Exception as e:
            logger.error(f"Failed to send Telegram alert: {e}")

def get_headers():
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        "Accept": "application/json, text/plain, */*",
    }
    if HUDLE_AUTH_TOKEN and HUDLE_AUTH_TOKEN != "YOUR_BEARER_TOKEN_HERE":
        headers["Authorization"] = f"Bearer {HUDLE_AUTH_TOKEN}"
    return headers

def check_venue_slots(venue_key, venue_info, target_date_str):
    """Checks slot availability for a given venue and target date."""
    venue_id = venue_info["id"]
    venue_name = venue_info["name"]
    location = venue_info["location"]
    
    # Target URL endpoint
    url = f"https://hudle.in/api/v1/venues/{venue_id}/slots?date={target_date_str}"
    
    try:
        res = requests.get(url, headers=get_headers(), timeout=10)
        if res.status_code == 200:
            data = res.json()
            available_slots = []
            
            # Parse slot details
            courts = data.get("data", {}).get("courts", [])
            for court in courts:
                court_name = court.get("name", "Court")
                slots = court.get("slots", [])
                for slot in slots:
                    if slot.get("is_available") and not slot.get("is_booked"):
                        start_time = slot.get("start_time")
                        price = slot.get("price", 0)
                        
                        # Filter by preferred time windows
                        for window in PREFERRED_TIME_WINDOWS:
                            if window["start"] <= start_time <= window["end"]:
                                available_slots.append({
                                    "court": court_name,
                                    "time": start_time,
                                    "price": price,
                                    "slot_id": slot.get("id")
                                })
            
            if available_slots:
                alert_msg = f"🎾 *SLOT FOUND!* [{venue_name} ({location})]\n"
                alert_msg += f"📅 Date: `{target_date_str}`\n"
                for slot in available_slots:
                    alert_msg += f"  • {slot['court']} @ {slot['time']} - ₹{slot['price']}\n"
                send_alert(alert_msg)
                return available_slots
            else:
                logger.info(f"[{venue_name} - {target_date_str}] No preferred slots open.")
        elif res.status_code == 404:
            logger.debug(f"[{venue_name}] Venue API endpoint not published yet.")
        else:
            logger.warning(f"[{venue_name}] API returned status {res.status_code}")
    except Exception as e:
        logger.error(f"[{venue_name}] Error fetching slots: {e}")
    
    return []

def run_tracker(dates_ahead=3):
    """Monitors all 7 South Mumbai venues for the next N days."""
    logger.info("=" * 60)
    logger.info("STARTING HUDLE SOUTH MUMBAI SLOT TRACKER")
    logger.info(f"Tracking Venues: {len(SOUTH_MUMBAI_VENUES)} locations (Worli, Malabar Hill, Colaba, Ballard Pier, Lower Parel)")
    logger.info("=" * 60)
    
    today = datetime.now()
    target_dates = [(today + timedelta(days=i)).strftime("%Y-%m-%d") for i in range(1, dates_ahead + 1)]
    
    while True:
        logger.info(f"\n--- Scanning Availability ({datetime.now().strftime('%H:%M:%S')}) ---")
        for date_str in target_dates:
            for v_key, v_info in SOUTH_MUMBAI_VENUES.items():
                check_venue_slots(v_key, v_info, date_str)
                time.sleep(0.5)  # Respect rate limits
        
        logger.info(f"Sleeping for {TRACKER_POLL_INTERVAL_SECONDS} seconds before next scan...")
        time.sleep(TRACKER_POLL_INTERVAL_SECONDS)

if __name__ == "__main__":
    run_tracker()
