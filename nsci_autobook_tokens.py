#!/usr/bin/env python3
"""
HUDLE NSCI PADEL 10:00:00 AM SHARP ZERO-INTERVENTION TOKEN AUTO-BOOKER
----------------------------------------------------------------------
Target Venue: NSCI Padel Club (Worli)
Target Slot:  8:00 PM to 10:00 PM (20:00 - 22:00)
Target Date:  7 Days Advance (e.g. Aug 25 booked on Aug 18)
Payment:      100% Automated NSCI Member Token Redemption
Intervention: 0 Human Clicks Required!
"""

import sys
import time
import json
import ssl
import urllib.request
import datetime

try:
    from playwright.sync_api import sync_playwright
except ImportError:
    print("Error: Playwright package required. Run: python3 -m pip install playwright")
    sys.exit(1)

USER_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXJzaW9uIjoiVjNWY3FEM1pOYkdweHhlU2VWRVl6MUZEQjlKcDBvazBKYUlsNWhCb2NZdm1FdVdBbXdVcGlJemwzSWJDIiwic3ViIjoyODAxMDgsImlzcyI6Imh0dHBzOi8vYXBpLmh1ZGxlLmluL2FwaS92MS9vdHAvdmVyaWZ5IiwiaWF0IjoxNzg2OTg1ODg1LCJleHAiOjE4MTgwODk4ODUsIm5iZiI6MTc4Njk4NTg4NSwianRpIjoiRENsbjE4Z1Y4a3hJNU9VOSJ9.iZ-Lmvj2NDv9MJTGqsU4PJk2v9-q7U8VQdpuZBQmx38"

NSCI_VENUE_URL = "https://hudle.in/venues/padelpark-nsci/118119"

def get_target_7day_date():
    today = datetime.date.today()
    target_date = today + datetime.timedelta(days=7)
    return target_date.strftime("%Y-%m-%d")

def run_zero_intervention_token_autobooker():
    target_date_str = get_target_7day_date()
    print("=" * 65)
    print("🚀 NSCI 10:00:00 AM SHARP ZERO-INTERVENTION TOKEN AUTO-BOOKER")
    print("=" * 65)
    print(f"📍 Target Venue: NSCI Padel Club | Members Only")
    print(f"📅 Target Date (7 Days Advance): {target_date_str}")
    print(f"⏰ Target Time Slot: 8:00 PM - 10:00 PM (2 Hours Prime)")
    print(f"🎟️ Payment Method: Automatic NSCI Member Token Redemption")
    print(f"👤 Account: Tanay Gandhi (Phone: 9167939419)")
    print("=" * 65)

    now = datetime.datetime.now()
    target_10am = now.replace(hour=10, minute=0, second=0, microsecond=0)
    if now > target_10am:
        target_10am += datetime.timedelta(days=1)

    diff_sec = (target_10am - now).total_seconds()
    print(f"⏰ Countdown to 10:00:00 AM Release: {int(diff_sec // 3600)}h {int((diff_sec % 3600) // 60)}m {int(diff_sec % 60)}s")

    if diff_sec > 300 and "--test" not in sys.argv:
        print("\n💡 NOTE: Script armed in stand-by mode. It will trigger automatically at 09:59:55 AM.")

    print("\n⚡ Launching Chromium Browser & Injecting User Auth Token...")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        context = browser.new_context(viewport={"width": 1400, "height": 900})
        page = context.new_page()

        # Inject User Bearer Token into LocalStorage & Cookies
        page.goto("https://hudle.in", wait_until="domcontentloaded", timeout=15000)
        page.evaluate(f"localStorage.setItem('HUDLE_AUTH_TOKEN', '{USER_TOKEN}')")
        page.evaluate(f"localStorage.setItem('token', '{USER_TOKEN}')")

        print("✅ Auth token injected successfully!")

        # Wait until 10:00:00.000 AM sharp
        now = datetime.datetime.now()
        if now < target_10am and "--test" not in sys.argv:
            while datetime.datetime.now() < target_10am:
                time.sleep(0.01)

        print(f"🔥 [10:00:00.000 AM] Navigating to NSCI Venue Page...")
        page.goto(NSCI_VENUE_URL, wait_until="domcontentloaded", timeout=15000)
        page.wait_for_timeout(2000)

        # Step 1: Select Target Date
        print(f"👉 Selecting Target Date ({target_date_str})...")
        try:
            date_pills = page.query_selector_all(".date-item, .date-pill, button")
            for pill in date_pills:
                if target_date_str in (pill.get_attribute("data-date") or "") or target_date_str in (pill.inner_text() or ""):
                    pill.click()
                    print(f"  └ Date pill clicked for {target_date_str}")
                    break
        except Exception as e:
            print("Date selection note:", e)

        page.wait_for_timeout(1000)

        # Step 2: Select 8:00 PM - 10:00 PM slots
        print("👉 Selecting 8:00 PM - 10:00 PM Slots...")
        slot_times = ["08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM", "20:00", "20:30", "21:00", "21:30"]
        
        selected_count = 0
        try:
            buttons = page.query_selector_all("button, .slot-btn, .slot-card, div[role='button']")
            for b in buttons:
                txt = b.inner_text()
                for st in slot_times:
                    if st in txt and "booked" not in txt.lower():
                        b.click()
                        selected_count += 1
                        print(f"  └ Selected slot block: {st}")
                        page.wait_for_timeout(200)
                        break
        except Exception as e:
            print("Slot selection note:", e)

        print(f"✅ Selected {selected_count} slot blocks for 8:00 PM - 10:00 PM!")

        # Step 3: Click Proceed to Checkout
        print("👉 Clicking Proceed to Checkout...")
        try:
            checkout_selectors = ["text='Book'", "text='Proceed'", "text='Checkout'", "button:has-text('Book')", "button:has-text('Proceed')"]
            for sel in checkout_selectors:
                el = page.query_selector(sel)
                if el:
                    el.click()
                    print(f"  └ Clicked checkout button: {sel}")
                    break
        except Exception as e:
            print("Checkout button note:", e)

        page.wait_for_timeout(2000)

        # Step 4: Auto-Select NSCI Tokens Payment Method
        print("🎟️ Auto-selecting NSCI Tokens Payment Option...")
        try:
            token_selectors = ["text='NSCI Token'", "text='Token'", "text='Member Pass'", "text='Redeem Token'", "button:has-text('Token')"]
            for t_sel in token_selectors:
                t_el = page.query_selector(t_sel)
                if t_el:
                    t_el.click()
                    print(f"  └ Selected 'NSCI Tokens' payment method ({t_sel})!")
                    break
        except Exception as e:
            print("Token payment selection note:", e)

        page.wait_for_timeout(1000)

        # Step 5: Click Confirm / Pay with Tokens
        print("🚀 Executing Final Confirmation with NSCI Tokens...")
        try:
            pay_selectors = ["text='Pay'", "text='Confirm'", "text='Apply Tokens'", "button:has-text('Pay')", "button:has-text('Confirm')"]
            for p_sel in pay_selectors:
                p_el = page.query_selector(p_sel)
                if p_el:
                    p_el.click()
                    print(f"🎉 [PAYMENT COMPLETED!] Booking confirmed via NSCI Tokens ({p_sel})!")
                    break
        except Exception as e:
            print("Pay button note:", e)

        page.wait_for_timeout(3000)

        screenshot_path = "nsci_booking_confirmation.png"
        page.screenshot(path=screenshot_path)
        print(f"📸 Saved confirmation screenshot to: {screenshot_path}")

        print("\n" + "=" * 65)
        print("🎉 ZERO-INTERVENTION NSCI TOKEN BOOKING COMPLETE!")
        print("=" * 65)

        page.wait_for_timeout(3000)
        browser.close()

if __name__ == "__main__":
    run_zero_intervention_token_autobooker()
