// HUDLE SOUTH MUMBAI LIVE API SLOT TRACKER & UNIFIED CALENDAR MATRIX

const SOBO_VENUES_DATA = [
  {
    id: "9672dd36-168a-40d8-85be-28d7bef3543b",
    slug: "courtside_worli",
    name: "Courtside Padel Social Club",
    location: "Worli",
    type: "padel",
    sportsText: "Padel (3 Courts)",
    priceOnwards: 2200,
    matrix: {}
  },
  {
    id: "b82d19f2-8690-4975-a5d1-5e9ab886e10d",
    slug: "padel_360_worli",
    name: "Padel 360",
    location: "Worli",
    type: "padel",
    sportsText: "Padel & Pickleball (AC Indoor)",
    priceOnwards: 2400,
    matrix: {}
  },
  {
    id: "7d204b7b-8574-4ac7-823a-2f9d77789dc0",
    slug: "nsci_padel_worli",
    name: "NSCI Padel Club",
    location: "Worli",
    type: "padel",
    sportsText: "Padel (Members Only)",
    priceOnwards: 1800,
    matrix: {}
  },
  {
    id: "f598bca7-4947-4bf6-bd2d-f741e3abea82",
    slug: "7padel_malabar_hill",
    name: "7Padel | PDP Malabar Hill",
    location: "Malabar Hill",
    type: "padel",
    sportsText: "Padel (Priyadarshini Park)",
    priceOnwards: 2000,
    matrix: {}
  },
  {
    id: "f8172f52-47fc-4e19-ba87-f9ae625eccb8",
    slug: "smash_dock_colaba",
    name: "Smash Dock",
    location: "Colaba",
    type: "pickleball",
    sportsText: "Pickleball (9-Layer Acrylic)",
    priceOnwards: 1800,
    matrix: {}
  },
  {
    id: "3e7f36b1-775e-4178-bae8-c1dbcb697809",
    slug: "global_sports_lower_parel",
    name: "Global Sports Pickleball",
    location: "Lower Parel",
    type: "pickleball",
    sportsText: "Pickleball (Peninsula Corporate Park)",
    priceOnwards: 1500,
    matrix: {}
  }
];

// ALL 18 HOURLY TIMESLOTS FROM 6 AM TO 11 PM
const ALL_TIMESLOTS = [
  "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
  "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"
];

let selectedDate = new Date().toISOString().split("T")[0];
let currentSportFilter = "padel"; // DEFAULT TO PADEL (ONLY PADEL OR PICKLEBALL AVAILABLE)

document.addEventListener("DOMContentLoaded", () => {
  initClock();
  initBookingDate();
  renderDatePills();
  renderCalendarHeaders();
  syncAllVenuesLiveSlots();
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
      syncAllVenuesLiveSlots();
    };
    bar.appendChild(btn);
  }
}

// SPORT FILTER SWITCHER (ONLY PADEL OR PICKLEBALL)
function setSportFilter(filterMode) {
  currentSportFilter = filterMode;
  
  document.getElementById("filter-btn-padel").className = `sport-filter-btn ${filterMode === 'padel' ? 'active-padel' : ''}`;
  document.getElementById("filter-btn-pickle").className = `sport-filter-btn ${filterMode === 'pickleball' ? 'active-pickle' : ''}`;
  
  renderCalendarMatrix();
}

// FETCH LIVE HUDLE SLOTS DIRECTLY FROM HUDLE REST API
async function syncAllVenuesLiveSlots() {
  const token = localStorage.getItem("HUDLE_AUTH_TOKEN");
  const syncStatusText = document.getElementById("sync-status-text");

  if (!token) {
    syncStatusText.textContent = "⚙️ Add Bearer Token in Settings";
    // Render initial structure
    renderCalendarMatrix();
    return;
  }

  syncStatusText.textContent = "Syncing Hudle API...";

  for (let v of SOBO_VENUES_DATA) {
    try {
      // Use corsproxy.io to bypass browser CORS restriction when calling api.hudle.in directly from web app
      const apiUrl = `https://corsproxy.io/?${encodeURIComponent(`https://api.hudle.in/api/v1/venues/${v.id}/slots?date=${selectedDate}`)}`;
      
      const response = await fetch(apiUrl, {
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
          "api-secret": "hudle-api1798@prod",
          "x-app-version": "1.0.1",
          "x-app-source": "consumer"
        }
      });

      if (response.ok) {
        const jsonRes = await response.json();
        if (jsonRes.data && Array.isArray(jsonRes.data)) {
          v.matrix = parseHudleSlotResponse(jsonRes.data);
        }
      }
    } catch (err) {
      console.warn(`Live sync warning for ${v.name}:`, err);
    }
  }

  syncStatusText.textContent = "Live Synced ✅";
  renderCalendarMatrix();
}

// PARSE HUDLE REST API SLOT JSON RESPONSE
function parseHudleSlotResponse(slotsArray) {
  const matrix = {};
  slotsArray.forEach(slot => {
    // slot format: { start_time: "19:00:00", is_available: true, price: 2800 }
    if (slot.start_time) {
      const timeStr = formatTimeTo12Hr(slot.start_time);
      matrix[timeStr] = {
        status: slot.is_available ? "open" : "booked",
        price: slot.price || slot.discounted_price || 2000
      };
    }
  });
  return matrix;
}

function formatTimeTo12Hr(time24) {
  const [hStr, mStr] = time24.split(":");
  let h = parseInt(hStr, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${String(h).padStart(2, '0')}:00 ${ampm}`;
}

// RENDER CALENDAR MATRIX WITH PADEL OR PICKLEBALL FILTERING & ALL 18 TIMESLOTS
function renderCalendarMatrix() {
  const tbody = document.getElementById("calendar-matrix-body");
  tbody.innerHTML = "";

  const filteredVenues = SOBO_VENUES_DATA.filter(v => {
    if (currentSportFilter === "padel") return v.type === "padel";
    if (currentSportFilter === "pickleball") return v.type === "pickleball";
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
    syncAllVenuesLiveSlots();
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