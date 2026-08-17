// HUDLE SOUTH MUMBAI TRACKER & UNIFIED CALENDAR SCHEDULE - VERCEL APP LOGIC

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
      "06:00 PM": { status: "open", price: 2800 },
      "07:00 PM": { status: "open", price: 2800 },
      "08:00 PM": { status: "booked", price: 2800 },
      "09:00 PM": { status: "open", price: 2800 }
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
      "06:00 PM": { status: "open", price: 3000 },
      "07:00 PM": { status: "booked", price: 3000 },
      "08:00 PM": { status: "open", price: 3000 },
      "09:00 PM": { status: "booked", price: 3000 }
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
      "06:00 AM": { status: "empty" },
      "07:00 AM": { status: "open", price: 1800 },
      "08:00 AM": { status: "open", price: 1800 },
      "06:00 PM": { status: "open", price: 2200 },
      "07:00 PM": { status: "booked", price: 2200 },
      "08:00 PM": { status: "open", price: 2200 },
      "09:00 PM": { status: "empty" }
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
      "06:00 PM": { status: "open", price: 2500 },
      "07:00 PM": { status: "open", price: 2500 },
      "08:00 PM": { status: "booked", price: 2500 },
      "09:00 PM": { status: "booked", price: 2500 }
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
      "06:00 PM": { status: "open", price: 2000 },
      "07:00 PM": { status: "open", price: 2000 },
      "08:00 PM": { status: "booked", price: 2000 },
      "09:00 PM": { status: "open", price: 2000 }
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
      "06:00 PM": { status: "booked", price: 2200 },
      "07:00 PM": { status: "open", price: 2200 },
      "08:00 PM": { status: "open", price: 2200 },
      "09:00 PM": { status: "booked", price: 2200 }
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
      "06:00 PM": { status: "open", price: 1900 },
      "07:00 PM": { status: "booked", price: 1900 },
      "08:00 PM": { status: "open", price: 1900 },
      "09:00 PM": { status: "open", price: 1900 }
    }
  }
];

const TIME_SLOTS = ["06:00 AM", "07:00 AM", "08:00 AM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM"];

let selectedDate = new Date().toISOString().split("T")[0];

document.addEventListener("DOMContentLoaded", () => {
  initClock();
  initBookingDate();
  renderDatePills();
  renderCalendarMatrix();
  renderCardsView();
  initModal();
  initSniperForm();
});

// REAL-TIME CLOCK
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

// RENDER UNIFIED CALENDAR SCHEDULE MATRIX
function renderCalendarMatrix() {
  const tbody = document.getElementById("calendar-matrix-body");
  tbody.innerHTML = "";

  SOBO_VENUES_DATA.forEach(v => {
    const tr = document.createElement("tr");
    
    // Venue label cell
    const labelTd = document.createElement("td");
    labelTd.className = "venue-label-cell";
    labelTd.innerHTML = `
      <div class="venue-title-text">${v.type === 'padel' ? '🎾' : '🏓'} ${v.name}</div>
      <div class="venue-sub-text">📍 ${v.location} • ${v.sportsText}</div>
    `;
    tr.appendChild(labelTd);

    // Render columns for each time slot
    TIME_SLOTS.forEach(timeStr => {
      const slotData = v.matrix[timeStr] || { status: "empty" };
      const td = document.createElement("td");

      if (slotData.status === "open") {
        td.innerHTML = `
          <button class="matrix-slot-btn open" onclick="selectSlotForSniper('${v.id}', '${timeStr}')">
            <span>⚡ ₹${slotData.price}</span>
            <span style="font-size: 9px; opacity: 0.8;">SNIPE</span>
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

// RENDER SECONDARY CARDS VIEW
function renderCardsView() {
  const grid = document.getElementById("cards-view-section");
  grid.innerHTML = "";

  SOBO_VENUES_DATA.forEach(v => {
    const card = document.createElement("div");
    card.className = "venue-card";
    
    const slotsHTML = Object.entries(v.matrix).map(([time, data]) => {
      if (data.status === 'open') {
        return `<span class="slot-pill">⚡ ${time} - ₹${data.price}</span>`;
      } else if (data.status === 'booked') {
        return `<span class="slot-pill booked">❌ ${time}</span>`;
      }
      return '';
    }).join("");

    card.innerHTML = `
      <div>
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span class="badge ${v.type === 'padel' ? 'badge-padel' : 'badge-pickle'}">${v.type.toUpperCase()}</span>
          <span class="badge badge-location">📍 ${v.location}</span>
        </div>
        <h3 style="font-size:18px; font-weight:800; margin-bottom:4px;">${v.name}</h3>
        <p style="font-size:12px; color:var(--text-muted); margin-bottom:14px;">${v.sportsText}</p>
        <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:14px;">${slotsHTML}</div>
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:13px; color:var(--text-secondary);">From <b>₹${v.priceOnwards}</b></span>
        <button class="btn-card-action" onclick="selectSlotForSniper('${v.id}', '07:00 PM')">⚡ Snipe Slot</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// SWITCH VIEWS
function switchView(mode) {
  const calendarSec = document.getElementById("calendar-view-section");
  const cardsSec = document.getElementById("cards-view-section");
  const btnCal = document.getElementById("btn-view-calendar");
  const btnCards = document.getElementById("btn-view-cards");

  if (mode === 'calendar') {
    calendarSec.style.display = "block";
    cardsSec.style.display = "none";
    btnCal.classList.add("active");
    btnCards.classList.remove("active");
  } else {
    calendarSec.style.display = "none";
    cardsSec.style.display = "grid";
    btnCal.classList.remove("active");
    btnCards.classList.add("active");
  }
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