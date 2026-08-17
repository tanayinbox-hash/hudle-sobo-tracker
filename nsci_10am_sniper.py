#!/usr/bin/env python3
"""
HUDLE NSCI PADEL 10:00:00 AM SHARP MILLISECOND SLOT SNIPER
-----------------------------------------------------------
Target Venue: NSCI Padel Club (Worli)
Target Slot:  8:00 PM to 10:00 PM (20:00 - 22:00)
Advance:      7 Days in Advance (e.g. Aug 25 booked on Aug 18)
Release Time: 10:00:00.000 AM IST Sharp
"""

import sys
import time
import json
import ssl
import urllib.request
import datetime
from concurrent.futures import ThreadPoolExecutor

USER_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXJzaW9uIjoiVjNWY3FEM1pOYkdweHhlU2VWRVl6MUZEQjlKcDBvazBKYUlsNWhCb2NZdm1FdVdBbXdVcGlJemwzSWJDIiwic3ViIjoyODAxMDgsImlzcyI6Imh0dHBzOi8vYXBpLmh1ZGxlLmluL2FwaS92MS9vdHAvdmVyaWZ5IiwiaWF0IjoxNzg2OTg1ODg1LCJleHAiOjE4MTgwODk4ODUsIm5iZiI6MTc4Njk4NTg4NSwianRpIjoiRENsbjE4Z1Y4a3hJNU9VOSJ9.iZ-Lmvj2NDv9MJTGqsU4PJk2v9-q7U8VQdpuZBQmx38"

NSCI_VENUE_ID = "7d204b7b-8574-4ac7-823a-2f9d77789dc0"
NSCI_COURTS = [
    {"name": "Court 1", "id": "24073885-5158-4da6-8deb-883e057fc18b"},
    {"name": "Court 2", "id": "e7c1e55a-dd5d-44d1-89c7-06939454cc35"}
]

# TARGET SLOTS FROM 8 PM TO 10 PM (2 HOURS = 4 HALF-HOUR SLOTS)
TARGET_TIMESLOTS_24H = ["20:00:00", "20:30:00", "21:00:00", "21:30:00"]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "Accept": "application/json",
    "Authorization": f"Bearer {USER_TOKEN}",
    "api-secret": "hudle-api1798@prod",
    "x-app-version": "1.0.1",
    "x-app-source": "consumer",
    "Content-Type": "application/json"
}

SSL_CTX = ssl._create_unverified_context()

def get_target_7day_date():
    today = datetime.date.today()
    target_date = today + datetime.timedelta(days=7)
    return target_date.strftime("%Y-%m-%d")

def fetch_court_slots(court_obj, target_date):
    url = f"https://api.hudle.in/api/v1/venues/{NSCI_VENUE_ID}/facilities/{court_obj['id']}/slots?start_date={target_date}&end_date={target_date}"
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        res = urllib.request.urlopen(req, context=SSL_CTX, timeout=3)
        data = json.loads(res.read().decode('utf-8'))
        slots = data.get('data', [])
        return court_obj['name'], slots
    except Exception as e:
        return court_obj['name'], []

def attempt_nsci_snipe(target_date):
    print(f"\n⚡ [10:00:00.000 AM] FIRING NSCI SNIPER FOR DATE: {target_date} (8:00 PM - 10:00 PM)...")
    
    with ThreadPoolExecutor(max_workers=4) as executor:
        futures = [executor.submit(fetch_court_slots, court, target_date) for court in NSCI_COURTS]
        results = [f.result() for f in futures]
    
    found_court = None
    target_slot_uuids = []

    for court_name, slots in results:
        matched_uuids = []
        for s in slots:
            s_time = s.get('start_time', '').split(" ")[-1]
            if s_time in TARGET_TIMESLOTS_24H and s.get('is_available') and not s.get('is_booked'):
                matched_uuids.append(s.get('uuid'))
        
        # Prefer court that has all 4 consecutive slots (8 PM to 10 PM)
        if len(matched_uuids) == 4:
            found_court = court_name
            target_slot_uuids = matched_uuids
            break
        elif len(matched_uuids) > len(target_slot_uuids):
            found_court = court_name
            target_slot_uuids = matched_uuids

    if found_court and target_slot_uuids:
        print(f"🎯 [SNIPER HIT!] Found {len(target_slot_uuids)} open slots on {found_court} for {target_date} (8 PM - 10 PM)!")
        print(f"   Slot UUIDs: {target_slot_uuids}")
        print(f"👉 Direct Checkout Link: https://hudle.in/venues/padelpark-nsci/118119")
        return True
    else:
        print(f"❌ [SNIPER RETRY] Slots not released yet or booked. Polling again...")
        return False

def wait_until_10am_sharp():
    now = datetime.datetime.now()
    target_10am = now.replace(hour=10, minute=0, second=0, microsecond=0)
    
    if now > target_10am:
        # If past 10 AM today, target 10 AM tomorrow
        target_10am += datetime.timedelta(days=1)
    
    print(f"⏰ NSCI 10 AM SNIPER ARMED!")
    print(f"   Current Time: {now.strftime('%Y-%m-%d %H:%M:%S.%f')[:-3]}")
    print(f"   Target 10 AM Release: {target_10am.strftime('%Y-%m-%d %H:%M:%S.000')}")
    target_date = (target_10am.date() + datetime.timedelta(days=7)).strftime("%Y-%m-%d")
    print(f"   Target Booking Date (7 Days Advance): {target_date}")
    print(f"   Target Time: 8:00 PM - 10:00 PM (20:00 - 22:00)")
    
    while True:
        now = datetime.datetime.now()
        diff = (target_10am - now).total_seconds()
        
        if diff <= 0.2: # 200 milliseconds before 10:00 AM
            break
        elif diff > 10:
            time.sleep(1)
        else:
            time.sleep(0.05)

    # 10 AM MILLISECOND BURST
    start_time = time.time()
    attempts = 0
    while time.time() - start_time < 30: # Snipe aggressively for 30 seconds
        attempts += 1
        success = attempt_nsci_snipe(target_date)
        if success:
            break
        time.sleep(0.15) # Poll every 150ms

if __name__ == "__main__":
    wait_until_10am_sharp()
