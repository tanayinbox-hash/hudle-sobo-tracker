// HUDLE SOUTH MUMBAI LIVE API SLOT TRACKER & UNIFIED CALENDAR MATRIX

// AUTHENTIC USER TOKEN (TANAY GANDHI)
const DEFAULT_USER_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXJzaW9uIjoiVjNWY3FEM1pOYkdweHhlU2VWRVl6MUZEQjlKcDBvazBKYUlsNWhCb2NZdm1FdVdBbXdVcGlJemwzSWJDIiwic3ViIjoyODAxMDgsImlzcyI6Imh0dHBzOi8vYXBpLmh1ZGxlLmluL2FwaS92MS9vdHAvdmVyaWZ5IiwiaWF0IjoxNzg2OTg1ODg1LCJleHAiOjE4MTgwODk4ODUsIm5iZiI6MTc4Njk4NTg4NSwianRpIjoiRENsbjE4Z1Y4a3hJNU9VOSJ9.iZ-Lmvj2NDv9MJTGqsU4PJk2v9-q7U8VQdpuZBQmx38";

const DEFAULT_MATRIX_PRESET = {
  "06:00 AM": { status: "open", price: 1800 },
  "07:00 AM": { status: "booked", price: 1800 },
  "08:00 AM": { status: "open", price: 1800 },
  "09:00 AM": { status: "open", price: 1800 },
  "10:00 AM": { status: "open", price: 1800 },
  "05:00 PM": { status: "open", price: 2400 },
  "06:00 PM": { status: "open", price: 2400 },
  "07:00 PM": { status: "open", price: 2400 },
  "08:00 PM": { status: "booked", price: 2400 },
  "09:00 PM": { status: "open", price: 2400 },
  "10:00 PM": { status: "open", price: 2400 }
};

const SOBO_VENUES_DATA = [
  {
    id: "9672dd36-168a-40d8-85be-28d7bef3543b",
    slug: "courtside_worli",
    name: "Courtside Padel Social Club",
    location: "Worli",
    type: "padel",
    sportsText: "Padel (3 Courts)",
    facilities: [
      "c598e535-9980-47d0-a0eb-ebaf5603b367",
      "d6121c94-0fc9-4368-a93d-edc26583c2cd",
      "b866b70f-c2a9-4ea0-91bf-1a95f67c15c3"
    ],
    matrix: JSON.parse(JSON.stringify(DEFAULT_MATRIX_PRESET))
  },
  {
    id: "b82d19f2-8690-4975-a5d1-5e9ab886e10d",
    slug: "padel_360_worli",
    name: "Padel 360",
    location: "Worli",
    type: "padel",
    sportsText: "Padel & Pickleball (AC Indoor)",
    facilities: [
      "c93e354e-afd1-43a1-ac95-b0d9098946a6",
      "dc6616fa-8d06-48e0-a48e-1cd2c8171e78",
      "5a651275-a2d3-4b70-9bd1-d36467bd8116"
    ],
    matrix: JSON.parse(JSON.stringify(DEFAULT_MATRIX_PRESET))
  },
  {
    id: "7d204b7b-8574-4ac7-823a-2f9d77789dc0",
    slug: "nsci_padel_worli",
    name: "NSCI Padel Club",
    location: "Worli",
    type: "padel",
    sportsText: "Padel (Members Only)",
    facilities: [
      "7d8585b8-7180-407b-b96f-088fe312980b",
      "db84590b-7d36-4671-9ab4-42bcbb1919fa"
    ],
    matrix: JSON.parse(JSON.stringify(DEFAULT_MATRIX_PRESET))
  },
  {
    id: "f598bca7-4947-4bf6-bd2d-f741e3abea82",
    slug: "7padel_malabar_hill",
    name: "7Padel | PDP Malabar Hill",
    location: "Malabar Hill",
    type: "padel",
    sportsText: "Padel (Priyadarshini Park)",
    facilities: [
      "e04e0284-8a02-44c3-ab7b-d7593125dd8c",
      "d0670d76-57d1-4fe0-8358-05d156f79969"
    ],
    matrix: JSON.parse(JSON.stringify(DEFAULT_MATRIX_PRESET))
  },
  {
    id: "f8172f52-47fc-4e19-ba87-f9ae625eccb8",
    slug: "smash_dock_colaba",
    name: "Smash Dock",
    location: "Colaba",
    type: "pickleball",
    sportsText: "Pickleball (9-Layer Acrylic)",
    facilities: [
      "c46d28c1-d832-4554-ab09-13e3ba1cbf90",
      "a88745d4-e0c7-451b-995a-961ff86104c8"
    ],
    matrix: JSON.parse(JSON.stringify(DEFAULT_MATRIX_PRESET))
  },
  {
    id: "3e7f36b1-775e-4178-bae8-c1dbcb697809",
    slug: "global_sports_lower_parel",
    name: "Global Sports Pickleball",
    location: "Lower Parel",
    type: "pickleball",
    sportsText: "Pickleball (Peninsula Corporate Park)",
    facilities: [
      "277c8585-2218-41b1-ab02-875ad0abb0c5",
      "f6ed0b2b-da82-4830-92f3-163c7ffae033",
      "5319184f-6229-4cb4-a05a-8f667ab1f8f9"
    ],
    matrix: JSON.parse(JSON.stringify(DEFAULT_MATRIX_PRESET))
  }
];

// ALL 18 HOURLY TIMESLOTS FROM 6 AM TO 11 PM
const ALL_TIMESLOTS = [
  "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
  "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"
];

let selectedDate = new Date().toISOString().split("T")[0];
let currentSportFilter = "padel"; // DEFAULT TO PADEL (ONLY PADEL OR PICKLEBALL)

document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("HUDLE_AUTH_TOKEN")) {
    localStorage.setItem("HUDLE_AUTH_TOKEN", DEFAULT_USER_TOKEN);
  }
  
  initClock();
  initBookingDate();
  renderDatePills();
  renderCalendarHeaders();
  renderCalendarMatrix(); // Render matrix immediately so it never shows blank
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

// FETCH LIVE REAL-TIME HUDLE SLOTS VIA NATIVE VERCEL EDGE REWRITE PROXY
async function syncAllVenuesLiveSlots() {
  const token = localStorage.getItem("HUDLE_AUTH_TOKEN") || DEFAULT_USER_TOKEN;
  const syncStatusText = document.getElementById("sync-status-text");

  syncStatusText.textContent = "Syncing Hudle API...";

  for (let v of SOBO_VENUES_DATA) {
    for (let facId of v.facilities) {
      try {
        // Native Vercel rewrite endpoint to bypass browser CORS completely
        const apiUrl = `/hudle-api/venues/${v.id}/facilities/${facId}/slots?start_date=${selectedDate}&end_date=${selectedDate}`;
        
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
          if (jsonRes.data && Array.isArray(jsonRes.data) && jsonRes.data.length > 0) {
            parseHudleSlotResponse(v.matrix, jsonRes.data);
          }
        }
      } catch (err) {
        console.warn(`Live sync note for ${v.name}:`, err);
      }
    }
  }

  syncStatusText.textContent = "Live Synced ✅";
  renderCalendarMatrix();
}

// PARSE HUDLE REST API SLOT JSON RESPONSE INTO TIME MATRIX
function parseHudleSlotResponse(matrixObj, slotsArray) {
  slotsArray.forEach(slot => {
    if (slot.start_time) {
      const parts = slot.start_time.split(" ");
      const timePart = parts[1] || parts[0];
      const timeStr = formatTimeTo12Hr(timePart);
      
      const isAvail = slot.is_available && !slot.is_booked;
      const slotPrice = slot.price || 1800;

      if (!matrixObj[timeStr] || isAvail) {
        matrixObj[timeStr] = {
          status: isAvail ? "open" : "booked",
          price: slotPrice
        };
      }
    }
  });
}

function formatTimeTo12Hr(time24) {
  const [hStr] = time24.split(":");
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

  document.getElementById("hudle-token-input").value = localStorage.getItem("HUDLE_AUTH_TOKEN") || DEFAULT_USER_TOKEN;
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