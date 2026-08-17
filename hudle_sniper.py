import time
import requests
import json
import logging
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timedelta
from config import SOUTH_MUMBAI_VENUES, HUDLE_AUTH_TOKEN, SNIPER_LEAD_TIME_MS

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("HudleSniper")

def get_headers():
    if not HUDLE_AUTH_TOKEN or HUDLE_AUTH_TOKEN == "YOUR_BEARER_TOKEN_HERE":
        raise ValueError("CRITICAL: HUDLE_AUTH_TOKEN is not configured! Please update config.py with your Bearer Token.")
    
    return {
        "Authorization": f"Bearer {HUDLE_AUTH_TOKEN}",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

def execute_slot_booking(venue_id, slot_id, target_date):
    """Fires high-speed slot lock & booking payload directly to Hudle REST API."""
    url = "https://hudle.in/api/v1/booking/cart/add"
    payload = {
        "venue_id": venue_id,
        "slot_id": slot_id,
        "date": target_date,
        "payment_method": "WALLET"  # Instant 1-click execution via Hudle Wallet
    }
    
    start_time = time.time()
    try:
        res = requests.post(url, json=payload, headers=get_headers(), timeout=3)
        latency = (time.time() - start_time) * 1000
        
        if res.status_code in [200, 201]:
            logger.info(f"🎉 SUCCESS! Slot {slot_id} booked in {latency:.1f}ms! Response: {res.text[:100]}")
            return True
        else:
            logger.error(f"❌ Booking failed ({res.status_code}) in {latency:.1f}ms: {res.text}")
            return False
    except Exception as e:
        logger.error(f"⚠️ Exception during sniper execution: {e}")
        return False

def wait_until_target_release(target_time_str):
    """
    Blocks until the exact millisecond before target release time.
    Format of target_time_str: '2026-08-18 00:00:00' or '00:00:00'
    """
    now = datetime.now()
    if len(target_time_str) == 8:
        # e.g., "00:00:00" -> target is today or tomorrow at that time
        target = datetime.strptime(f"{now.strftime('%Y-%m-%d')} {target_time_str}", "%Y-%m-%d %H:%M:%S")
        if target < now:
            target += timedelta(days=1)
    else:
        target = datetime.strptime(target_time_str, "%Y-%m-%d %H:%M:%S")
    
    # Adjust for lead time
    target_lead = target - timedelta(milliseconds=SNIPER_LEAD_TIME_MS)
    
    logger.info(f"Target slot release time: {target.strftime('%Y-%m-%d %H:%M:%S.%f')}")
    logger.info(f"Sniper firing scheduled at: {target_lead.strftime('%Y-%m-%d %H:%M:%S.%f')} (Lead time: {SNIPER_LEAD_TIME_MS}ms)")
    
    while True:
        current = datetime.now()
        diff = (target_lead - current).total_seconds()
        
        if diff <= 0:
            break
        elif diff > 5:
            time.sleep(1)
        elif diff > 0.1:
            time.sleep(0.01)
        else:
            # Busy-wait loop for sub-millisecond precision
            pass
    
    logger.info(f"🚀 FIRING SNIPER AT {datetime.now().strftime('%H:%M:%S.%f')}")

def snipe_venue_slots(venue_key, target_date_str, release_time_str="00:00:00", preferred_times=["19:00", "20:00"]):
    """
    Orchestrates high-speed slot sniping for a specific South Mumbai venue.
    """
    venue_info = SOUTH_MUMBAI_VENUES.get(venue_key)
    if not venue_info:
        logger.error(f"Venue key '{venue_key}' not found in config.py")
        return
    
    logger.info("=" * 60)
    logger.info(f"HUDLE SLOT SNIPER READY: {venue_info['name']} ({venue_info['location']})")
    logger.info(f"Target Date: {target_date_str} | Preferred Slots: {preferred_times}")
    logger.info("=" * 60)
    
    # Step 1: Wait until the slot release second
    wait_until_target_release(release_time_str)
    
    # Step 2: Concurrently query slot IDs and fire booking payload
    venue_id = venue_info["id"]
    slots_url = f"https://hudle.in/api/v1/venues/{venue_id}/slots?date={target_date_str}"
    
    start_time = time.time()
    try:
        res = requests.get(slots_url, headers=get_headers(), timeout=2)
        if res.status_code == 200:
            courts = res.json().get("data", {}).get("courts", [])
            target_slots = []
            
            for court in courts:
                for slot in court.get("slots", []):
                    if slot.get("start_time") in preferred_times and slot.get("is_available"):
                        target_slots.append((venue_id, slot.get("id"), target_date_str))
            
            if not target_slots:
                logger.warning("No matching preferred slots were open upon release.")
                return
            
            logger.info(f"Found {len(target_slots)} target slots! Executing parallel checkout...")
            
            # Step 3: Fire parallel checkout tasks
            with ThreadPoolExecutor(max_workers=5) as executor:
                futures = [executor.submit(execute_slot_booking, v_id, s_id, d_str) for v_id, s_id, d_str in target_slots]
                results = [f.result() for f in futures]
                
            if any(results):
                logger.info("✅ SNIPER MISSION ACCOMPLISHED! Slot successfully secured.")
            else:
                logger.error("❌ All slot booking attempts failed or were taken.")
        else:
            logger.error(f"Failed to fetch slots at release time: Status {res.status_code}")
    except Exception as e:
        logger.error(f"Sniper execution error: {e}")

if __name__ == "__main__":
    import sys
    # Example usage: python hudle_sniper.py courtside_worli 2026-08-20 00:00:00 19:00,20:00
    if len(sys.argv) > 1:
        v_key = sys.argv[1]
        t_date = sys.argv[2]
        r_time = sys.argv[3] if len(sys.argv) > 3 else "00:00:00"
        p_times = sys.argv[4].split(",") if len(sys.argv) > 4 else ["19:00", "20:00"]
        snipe_venue_slots(v_key, t_date, r_time, p_times)
    else:
        logger.info("Demo Mode: Configure arguments or run with parameters: python hudle_sniper.py <venue_key> <target_date> <release_time> <preferred_times>")
