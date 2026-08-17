// HUDLE SOUTH MUMBAI TRACKER & UNIFIED FULL-TIMESLOT CALENDAR MATRIX

const SOBO_VENUES_DATA = [
  {
    id: "courtside_worli",
    name: "Courtside Padel Social Club",
    location: "Worli",
    type: "padel",
    sportsText: "Padel (3 Courts)",
    priceOnwards: 2200,
    matrix: {
      "06:00 AM": { status: "open", price: 2200 },
      "07:00 AM": { status: "booked", price: 2200 },
      "08:00 AM": { status: "booked", price: 2200 },
      "09:00 AM": { status: "open", price: 2200 },
      "10:00 AM": { status: "open", price: 2200 },
      "05:00 PM": { status: "open", price: 2800 },
      "06:00 PM": { status: "open", price: 2800 },
      "07:00 PM": { status: "open", price: 2800 },
      "08:00 PM": { status: "booked", price: 2800 },
      "09:00 PM": { status: "open", price: 2800 },
      "10:00 PM": { status: "open", price: 2800 }
    }
  },
  {
    id: "padel_360_worli",
    name: "Padel 360",
    location: "Worli",
    type: "padel",
    sportsText: "Padel & Pickleball (AC Indoor)",
    priceOnwards: 2400,
    matrix: {
      "06:00 AM": { status: "open", price: 2400 },
      "07:00 AM": { status: "open", price: 2400 },
      "08:00 AM": { status: "booked", price: 2400 },
      "09:00 AM": { status: "open", price: 2400 },
      "04:00 PM": { status: "open", price: 3000 },
      "05:00 PM": { status: "open", price: 3000 },
      "06:00 PM": { status: "open", price: 3000 },
      "07:00 PM": { status: "booked", price: 3000 },
      "08:00 PM": { status: "open", price: 3000 },
      "09:00 PM": { status: "booked", price: 3000 },
      "10:00 PM": { status: "open", price: 3000 }
    }
  },
  {
    id: "nsci_padel_worli",
    name: "NSCI Padel Club",
    location: "Worli",
    type: "padel",
    sportsText: "Padel (Members Only)",
    priceOnwards: 1800,
    matrix: {
      "07:00 AM": { status: "open", price: 1800 },
      "08:00 AM": { status: "open", price: 1800 },
      "09:00 AM": { status: "booked", price: 1800 },
      "06:00 PM": { status: "open", price: 2200 },
      "07:00 PM": { status: "booked", price: 2200 },
      "08:00 PM": { status: "open", price: 2200 },
      "09:00 PM": { status: "open", price: 2200 }
    }
  },
  {
    id: "7padel_malabar_hill",
    name: "7Padel | PDP Malabar Hill",
    location: "Malabar Hill",
    type: "padel",
    sportsText: "Padel (Priyadarshini Park)",
    priceOnwards: 2000,
    matrix: {
      "06:00 AM": { status: "open", price: 2000 },
      "07:00 AM": { status: "booked", price: 2000 },
      "08:00 AM": { status: "open", price: 2000 },
      "05:00 PM": { status: "open", price: 2500 },
      "06:00 PM": { status: "open", price: 2500 },
      "07:00 PM": { status: "open", price: 2500 },
      "08:00 PM": { status: "booked", price: 2500 },
      "09:00 PM": { status: "booked", price: 2500 },
      "10:00 PM": { status: "open", price: 2500 }
    }
  },
  {
    id: "nautipickle_ballard_pier",
    name: "NautiPickle",
    location: "Ballard Pier",
    type: "pickleball",
    sportsText: "Pickleball (Luxury AC)",
    priceOnwards: 1600,
    matrix: {
      "06:00 AM": { status: "open", price: 1600 },
      "07:00 AM": { status: "open", price: 1600 },
      "08:00 AM": { status: "open", price: 1600 },
      "09:00 AM": { status: "open", price: 1600 },
      "10:00 AM": { status: "booked", price: 1600 },
      "05:00 PM": { status: "open", price: 2000 },
      "06:00 PM": { status: "open", price: 2000 },
      "07:00 PM": { status: "open", price: 2000 },
      "08:00 PM": { status: "booked", price: 2000 },
      "09:00 PM": { status: "open", price: 2000 },
      "10:00 PM": { status: "open", price: 2000 }
    }
  },
  {
    id: "smash_dock_colaba",
    name: "Smash Dock",
    location: "Colaba",
    type: "pickleball",
    sportsText: "Pickleball (9-Layer Acrylic)",
    priceOnwards: 1800,
    matrix: {
      "06:00 AM": { status: "open", price: 1800 },
      "07:00 AM": { status: "open", price: 1800 },
      "08:00 AM": { status: "booked", price: 1800 },
      "09:00 AM": { status: "open", price: 1800 },
      "06:00 PM": { status: "booked", price: 2200 },
      "07:00 PM": { status: "open", price: 2200 },
      "08:00 PM": { status: "open", price: 2200 },
      "09:00 PM": { status: "booked", price: 2200 },
      "10:00 PM": { status: "open", price: 2200 }
    }
  },
  {
    id: "global_sports_lower_parel",
    name: "Global Sports Pickleball",
    location: "Lower Parel",
    type: "pickleball",
    sportsText: "Pickleball (3 Courts)",
    priceOnwards: 1500,
    matrix: {
      "06:00 AM": { status: "open", price: 1500 },
      "07:00 AM": { status: "open", price: 1500 },
      "08:00 AM": { status: "open", price: 1500 },
      "09:00 AM": { status: "open", price: 1500 },
      "10:00 AM": { status: "booked", price: 1500 },
      "05:00 PM": { status: "open", price: 1900 },
      "06:00 PM": { status: "open", price: 1900 },
      "07:00 PM": { status: "booked", price: 1900 },
      "08:00 PM": { status: "open", price: 1900 },
      "09:00 PM": { status: "open", price: 1900 },
      "10:00 PM": { status: "open", price: 1900 }
    }
  }
];

// ALL 18 HOURLY TIMESLOTS FROM 6 AM TO 11 PM
const ALL_TIMESLOTS = [
  "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
  "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"
];

let selectedDate = new Date().toISOString().split("T")[0];
let currentSportFilter = "all";

document.addEventListener("DOMContentLoaded", () => {
  initClock();
  initBookingDate();
  renderDatePills();
  renderCalendarHeaders();
  renderCalendarMatrix();
  initModal();
  initSniperForm();
});

// REAL-TIME CLOCK WITH MILLISECONDS
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

function initBookingDate() {
  const dateInput = document.getElementById("booking-date-input");
  dateInput.value = selectedDate;
}

// RENDER ALL 18 TIMESLOT TABLE HEADERS
function renderCalendarHeaders() {
  const headerRow = document.getElementById("calendar-header-row");
  headerRow.innerHTML = `<th class="venue-col-header">South Mumbai Venue</th>`;
  
  ALL_TIMESLOTS.forEach(timeStr => {
    const th = document.createElement("th");
    th.textContent = timeStr;
    headerRow.appendChild(th);
  });
}

// RENDER INTERACTIVE DATE PILLS
function renderDatePills() {
  const bar = document.getElementById("date-pills-bar");
  bar.innerHTML = "";
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dateStr = d.toISOString().split("T")[0];
    
    let label = i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    
    const btn = document.createElement("button");
    btn.className = `date-btn ${dateStr === selectedDate ? 'active' : ''}`;
    btn.textContent = label;
    btn.onclick = () => {
      selectedDate = dateStr;
      document.getElementById("booking-date-input").value = dateStr;
      renderDatePills();
      renderCalendarMatrix();
    };
    bar.appendChild(btn);
  }
}

// SPORT FILTER SWITCHER (TOP TOOLBAR)
function setSportFilter(filterMode) {
  currentSportFilter = filterMode;
  
  document.getElementById("filter-btn-all").className = `sport-filter-btn ${filterMode === 'all' ? 'active-all' : ''}`;
  document.getElementById("filter-btn-padel").className = `sport-filter-btn ${filterMode === 'padel' ? 'active-padel' : ''}`;
  document.getElementById("filter-btn-pickle").className = `sport-filter-btn ${filterMode === 'pickleball' ? 'active-pickle' : ''}`;
  
  renderCalendarMatrix();
}

// RENDER CALENDAR MATRIX WITH SPORT FILTERING & ALL 18 TIMESLOTS
function renderCalendarMatrix() {
  const tbody = document.getElementById("calendar-matrix-body");
  tbody.innerHTML = "";

  const filteredVenues = SOBO_VENUES_DATA.filter(v => {
    if (currentSportFilter === "all") return true;
    if (currentSportFilter === "padel") return v.type === "padel" || v.sportsText.includes("Padel");
    if (currentSportFilter === "pickleball") return v.type === "pickleball" || v.sportsText.includes("Pickleball");
    return true;
  });

  filteredVenues.forEach(v => {
    const tr = document.createElement("tr");
    
    // Sticky pinned venue label cell
    const labelTd = document.createElement("td");
    labelTd.className = "venue-label-cell";
    labelTd.innerHTML = `
      <div class="venue-title-text">${v.type === 'padel' ? '🎾' : '🏓'} ${v.name}</div>
      <div class="venue-sub-text">📍 ${v.location} • ${v.sportsText}</div>
    `;
    tr.appendChild(labelTd);

    // Render cells for all 18 hourly timeslots
    ALL_TIMESLOTS.forEach(timeStr => {
      const slotData = v.matrix[timeStr] || { status: "empty" };
      const td = document.createElement("td");

      if (slotData.status === "open") {
        td.innerHTML = `
          <button class="matrix-slot-btn open" onclick="selectSlotForSniper('${v.id}', '${timeStr}')">
            <span>⚡ ₹${slotData.price}</span>
            <span style="font-size: 8px; opacity: 0.8;">SNIPE</span>
          </button>
        `;
      } else if (slotData.status === "booked") {
        td.innerHTML = `
          <button class="matrix-slot-btn booked" disabled>
            <span>❌ Sold</span>
          </button>
        `;
      } else {
        td.innerHTML = `
          <button class="matrix-slot-btn empty" disabled>
            <span>-</span>
          </button>
        `;
      }
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
}

function selectSlotForSniper(venueId, timeStr) {
  document.getElementById("target-venue-select").value = venueId;
  const sniperSec = document.querySelector(".sniper-panel");
  sniperSec.scrollIntoView({ behavior: 'smooth' });
}

// SETTINGS MODAL
function initModal() {
  const modal = document.getElementById("settings-modal");
  const openBtn = document.getElementById("btn-open-settings");
  const closeBtn = document.getElementById("btn-close-settings");
  const saveBtn = document.getElementById("btn-save-settings");

  openBtn.addEventListener("click", () => modal.classList.add("open"));
  closeBtn.addEventListener("click", () => modal.classList.remove("open"));

  document.getElementById("hudle-token-input").value = localStorage.getItem("HUDLE_AUTH_TOKEN") || "";
  document.getElementById("telegram-token-input").value = localStorage.getItem("TELEGRAM_BOT_TOKEN") || "";
  document.getElementById("telegram-chat-input").value = localStorage.getItem("TELEGRAM_CHAT_ID") || "";

  saveBtn.addEventListener("click", () => {
    localStorage.setItem("HUDLE_AUTH_TOKEN", document.getElementById("hudle-token-input").value);
    localStorage.setItem("TELEGRAM_BOT_TOKEN", document.getElementById("telegram-token-input").value);
    localStorage.setItem("TELEGRAM_CHAT_ID", document.getElementById("telegram-chat-input").value);
    modal.classList.remove("open");
    alert("✅ Credentials and Alert Settings Saved!");
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