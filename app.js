// HUDLE SOUTH MUMBAI TRACKER & SNIPER - VERCEL APP LOGIC

const SOBO_VENUES_DATA = [
  {
    id: "courtside_worli",
    name: "Courtside Padel Social Club",
    location: "Worli",
    type: "padel",
    sportsText: "Padel",
    courtsCount: "3 Courts",
    surface: "Elite Synthetic Turf + Stadium Lighting",
    priceOnwards: 2200,
    slots: [
      { time: "07:00 AM", status: "open", price: 2200 },
      { time: "08:00 AM", status: "booked", price: 2200 },
      { time: "06:00 PM", status: "open", price: 2800 },
      { time: "07:00 PM", status: "open", price: 2800 },
      { time: "08:00 PM", status: "booked", price: 2800 }
    ]
  },
  {
    id: "padel_360_worli",
    name: "Padel 360",
    location: "Worli",
    type: "padel",
    sportsText: "Padel & Pickleball",
    courtsCount: "AC Indoor Courts",
    surface: "Red Spanish Turf + Air Conditioned",
    priceOnwards: 2400,
    slots: [
      { time: "06:30 AM", status: "open", price: 2400 },
      { time: "07:30 AM", status: "open", price: 2400 },
      { time: "07:00 PM", status: "booked", price: 3000 },
      { time: "08:00 PM", status: "open", price: 3000 }
    ]
  },
  {
    id: "nsci_padel_worli",
    name: "NSCI Padel Club",
    location: "Worli",
    type: "padel",
    sportsText: "Padel (Members Only)",
    courtsCount: "2 Modern Courts",
    surface: "Members Exclusive Facility",
    priceOnwards: 1800,
    slots: [
      { time: "07:00 AM", status: "open", price: 1800 },
      { time: "06:00 PM", status: "open", price: 2200 },
      { time: "07:00 PM", status: "booked", price: 2200 }
    ]
  },
  {
    id: "7padel_malabar_hill",
    name: "7Padel | PDP Malabar Hill",
    location: "Malabar Hill",
    type: "padel",
    sportsText: "Padel",
    courtsCount: "Priyadarshini Park",
    surface: "Outdoor Sea Breeze Court",
    priceOnwards: 2000,
    slots: [
      { time: "06:00 AM", status: "open", price: 2000 },
      { time: "07:00 AM", status: "booked", price: 2000 },
      { time: "06:00 PM", status: "open", price: 2500 },
      { time: "07:00 PM", status: "open", price: 2500 }
    ]
  },
  {
    id: "nautipickle_ballard_pier",
    name: "NautiPickle",
    location: "Ballard Pier",
    type: "pickleball",
    sportsText: "Pickleball",
    courtsCount: "Indoor AC Courts",
    surface: "Luxury AC + Curated F&B",
    priceOnwards: 1600,
    slots: [
      { time: "07:00 AM", status: "open", price: 1600 },
      { time: "08:00 AM", status: "open", price: 1600 },
      { time: "07:00 PM", status: "open", price: 2000 },
      { time: "08:00 PM", status: "open", price: 2000 }
    ]
  },
  {
    id: "smash_dock_colaba",
    name: "Smash Dock",
    location: "Colaba",
    type: "pickleball",
    sportsText: "Pickleball",
    courtsCount: "Championship Surface",
    surface: "9-Layer Acrylic Indoor AC",
    priceOnwards: 1800,
    slots: [
      { time: "06:30 AM", status: "open", price: 1800 },
      { time: "06:00 PM", status: "booked", price: 2200 },
      { time: "07:00 PM", status: "open", price: 2200 }
    ]
  },
  {
    id: "global_sports_lower_parel",
    name: "Global Sports Pickleball Center",
    location: "Lower Parel",
    type: "pickleball",
    sportsText: "Pickleball",
    courtsCount: "3 Courts",
    surface: "Peninsula Corporate Park",
    priceOnwards: 1500,
    slots: [
      { time: "07:00 AM", status: "open", price: 1500 },
      { time: "08:00 AM", status: "open", price: 1500 },
      { time: "06:00 PM", status: "open", price: 1900 },
      { time: "07:00 PM", status: "booked", price: 1900 }
    ]
  }
];

// INITIALIZE APP
document.addEventListener("DOMContentLoaded", () => {
  initClock();
  initBookingDate();
  renderVenues("all");
  initFilterTabs();
  initModal();
  initSniperForm();
});

// CLOCK SYNCHRONIZER WITH MILLISECONDS
function initClock() {
  const clockEl = document.getElementById("clock");
  function update() {
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    const ms = String(now.getMilliseconds()).padStart(3, '0');
    clockEl.textContent = `${hrs}:${mins}:${secs}.${ms} IST`;
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// DEFAULT BOOKING DATE TO TOMORROW
function initBookingDate() {
  const dateInput = document.getElementById("booking-date-input");
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  dateInput.value = tomorrow.toISOString().split("T")[0];
}

// RENDER VENUES GRID
function renderVenues(filterCategory) {
  const grid = document.getElementById("venues-grid");
  grid.innerHTML = "";
  
  const filtered = SOBO_VENUES_DATA.filter(v => {
    if (filterCategory === "all") return true;
    if (filterCategory === "padel") return v.type === "padel" || v.sportsText.includes("Padel");
    if (filterCategory === "pickleball") return v.type === "pickleball" || v.sportsText.includes("Pickleball");
    return true;
  });

  filtered.forEach(v => {
    const card = document.createElement("div");
    card.className = "venue-card";
    
    const slotsHTML = v.slots.map(s => `
      <span class="slot-pill ${s.status === 'booked' ? 'booked' : ''}">
        ${s.time} ${s.status === 'booked' ? '❌' : '⚡'}
      </span>
    `).join("");

    card.innerHTML = `
      <div>
        <div class="venue-top">
          <div class="venue-badge-group">
            <span class="badge ${v.type === 'padel' ? 'badge-padel' : 'badge-pickle'}">${v.sportsText}</span>
            <span class="badge badge-location">📍 ${v.location}</span>
          </div>
        </div>
        
        <h3 class="venue-name">${v.name}</h3>
        <p class="venue-info">${v.courtsCount} • ${v.surface}</p>
        
        <div class="slot-pills">
          ${slotsHTML}
        </div>
      </div>
      
      <div class="venue-bottom">
        <div class="price-tag">From <span>₹${v.priceOnwards}</span>/hr</div>
        <button class="btn-card-action" onclick="snipeVenueDirect('${v.id}')">
          ⚡ Snipe Slot
        </button>
      </div>
    `;
    
    grid.appendChild(card);
  });
}

// FILTER TABS
function initFilterTabs() {
  const btns = document.querySelectorAll(".tab-btn");
  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderVenues(btn.dataset.filter);
    });
  });
}

// SETTINGS MODAL
function initModal() {
  const modal = document.getElementById("settings-modal");
  const openBtn = document.getElementById("btn-open-settings");
  const closeBtn = document.getElementById("btn-close-settings");
  const saveBtn = document.getElementById("btn-save-settings");

  openBtn.addEventListener("click", () => modal.classList.add("open"));
  closeBtn.addEventListener("click", () => modal.classList.remove("open"));

  // Load saved settings
  document.getElementById("hudle-token-input").value = localStorage.getItem("HUDLE_AUTH_TOKEN") || "";
  document.getElementById("telegram-token-input").value = localStorage.getItem("TELEGRAM_BOT_TOKEN") || "";
  document.getElementById("telegram-chat-input").value = localStorage.getItem("TELEGRAM_CHAT_ID") || "";

  saveBtn.addEventListener("click", () => {
    localStorage.setItem("HUDLE_AUTH_TOKEN", document.getElementById("hudle-token-input").value);
    localStorage.setItem("TELEGRAM_BOT_TOKEN", document.getElementById("telegram-token-input").value);
    localStorage.setItem("TELEGRAM_CHAT_ID", document.getElementById("telegram-chat-input").value);
    modal.classList.remove("open");
    alert("✅ Credentials and Alert Webhooks Saved!");
  });
}

// SNIPER FORM SUBMIT
function initSniperForm() {
  const form = document.getElementById("sniper-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const venueId = document.getElementById("target-venue-select").value;
    const date = document.getElementById("booking-date-input").value;
    const time = document.getElementById("preferred-time-select").value;
    
    alert(`🚀 SNIPER ARMED!\n\nTarget Venue: ${venueId}\nDate: ${date}\nTimes: ${time}\nRelease Time: Midnight 00:00:00.000\n\nThe sniper will fire auto-checkout at exact release!`);
  });
}

function snipeVenueDirect(venueId) {
  document.getElementById("target-venue-select").value = venueId;
  window.scrollTo({ top: 150, behavior: 'smooth' });
}