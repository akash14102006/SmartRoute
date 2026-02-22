/**
 * SmartRoute | Application Logic
 */

// ─── Google Maps Places Autocomplete ─────────────────────────────────────────
// This function is called automatically by the Google Maps script in index.html
// It won't run until you replace YOUR_GOOGLE_MAPS_API_KEY with your real key.

let startPlaceData = null;  // Stores full place object for start location
let endPlaceData = null;  // Stores full place object for end location

function initAutocomplete() {
    const startInput = document.getElementById('start-loc');
    const endInput = document.getElementById('end-loc');

    if (!startInput || !endInput) return;

    // Options: search worldwide, return address + coordinates
    const options = {
        fields: ['formatted_address', 'geometry', 'name', 'place_id'],
        types: ['geocode', 'establishment'],   // cities, addresses, businesses
    };

    // Attach autocomplete to Start Location
    const startAC = new google.maps.places.Autocomplete(startInput, options);
    startAC.addListener('place_changed', () => {
        startPlaceData = startAC.getPlace();
        if (!startPlaceData.geometry) {
            showInputError(startInput, 'Please select a location from the dropdown.');
            startPlaceData = null;
        } else {
            clearInputError(startInput);
            console.log('Start:', startPlaceData.formatted_address,
                startPlaceData.geometry.location.lat(),
                startPlaceData.geometry.location.lng());
        }
    });

    // Attach autocomplete to End Location
    const endAC = new google.maps.places.Autocomplete(endInput, options);
    endAC.addListener('place_changed', () => {
        endPlaceData = endAC.getPlace();
        if (!endPlaceData.geometry) {
            showInputError(endInput, 'Please select a location from the dropdown.');
            endPlaceData = null;
        } else {
            clearInputError(endInput);
            console.log('End:', endPlaceData.formatted_address,
                endPlaceData.geometry.location.lat(),
                endPlaceData.geometry.location.lng());
        }
    });
}

// Helper: highlight input in red with a small error message
function showInputError(input, msg) {
    input.style.borderColor = '#EF4444';
    let errEl = input.parentElement.querySelector('.input-error');
    if (!errEl) {
        errEl = document.createElement('span');
        errEl.className = 'input-error';
        input.parentElement.appendChild(errEl);
    }
    errEl.textContent = msg;
}

function clearInputError(input) {
    input.style.borderColor = '';
    const errEl = input.parentElement.querySelector('.input-error');
    if (errEl) errEl.remove();
}


// --- Routing & Navigation ---
function navigateTo(sectionId) {
    // Hide all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    const target = document.getElementById(sectionId);
    if (target) target.classList.add('active');

    // Update Nav Links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });

    // Close Carbon Tracker if going home
    if (sectionId === 'landing') {
        document.getElementById('carbon-tracker').classList.remove('active');
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Multi-step Wizard Logic ---
function nextStep(stepNumber) {
    document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));
    document.getElementById(`step-${stepNumber}`).classList.add('active');

    // Update dots
    document.querySelectorAll('.step-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index + 1 === stepNumber);
    });
}

// --- UI Controls ---
function toggleSwitch(el) {
    el.classList.toggle('checked');
}

function selectChip(el, value) {
    el.parentElement.querySelectorAll('.chip').forEach(chip => chip.classList.remove('active'));
    el.classList.add('active');
    window.optPriority = value;
}

// --- Mock Route Optimization Engine ---
let currentRoutes = [];

// --- API Integration ---
const API_BASE_URL = "http://localhost:8000";

async function calculateRoute() {
    const start = document.getElementById('start-loc').value || "Current Location";
    const end = document.getElementById('end-loc').value || "Target Warehouse";

    // UI state
    const btn = document.querySelector('#step-2 .btn-primary');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i data-lucide="loader-2" class="animate-spin" style="margin-right: 10px;"></i> AI Optimizing...';
    lucide.createIcons();

    const requestData = {
        start_location: start,
        end_location: end,
        vehicle_mode: document.getElementById('v-mode').value,
        fuel_type: document.getElementById('f-type').value,
        cargo_weight: parseFloat(document.getElementById('cargo-weight').value) || 0,
        optimization_priority: window.optPriority || 'time',
        traffic_enabled: document.getElementById('traffic-toggle').classList.contains('checked'),
        reroute_enabled: document.getElementById('reroute-toggle').classList.contains('checked')
    };

    try {
        const response = await fetch(`${API_BASE_URL}/api/plan-route`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) throw new Error("Backend connection failed");

        currentRoutes = await response.json();
        renderRoutes(currentRoutes);
        runSimulation();
        nextStep(3);

        // Enable Carbon Tracker
        document.getElementById('carbon-tracker').classList.add('active');
        startCarbonTracking(requestData.fuel_type);

    } catch (error) {
        console.error("API Error:", error);
        alert("Make sure the FastAPI backend is running on localhost:8000");
    } finally {
        btn.innerHTML = originalText;
        lucide.createIcons();
    }
}

function generateMockRoutes(vehicle, fuel) {
    const baseETA = 45; // minutes
    const baseDist = 12.5; // km

    return [
        {
            id: 'A',
            name: 'Express Highway 4',
            eta: Math.round(baseETA * 0.9),
            dist: baseDist * 1.2,
            fuel: 3.2,
            co2: 1.1,
            risk: 'Low',
            score: 94,
            cost: '$12.40',
            labels: ['Fastest'],
            explanation: 'Avoids suburban traffic with high-speed bypass.'
        },
        {
            id: 'B',
            name: 'Coastal Road',
            eta: baseETA + 5,
            dist: baseDist * 0.95,
            fuel: 2.8,
            co2: 0.8,
            risk: 'Medium',
            score: 88,
            cost: '$10.20',
            labels: ['Cheapest', 'Eco'],
            explanation: 'Minimum elevation gain results in optimal fuel usage.'
        },
        {
            id: 'C',
            name: 'City Central',
            eta: baseETA + 15,
            dist: baseDist * 0.8,
            fuel: 3.8,
            co2: 1.5,
            risk: 'High',
            score: 65,
            cost: '$14.10',
            labels: [],
            explanation: 'Shortest path but heavily impacted by gridlock.'
        }
    ];
}

function renderRoutes(routes) {
    const list = document.getElementById('route-output-list');
    list.innerHTML = '';

    routes.forEach((route, index) => {
        const item = document.createElement('div');
        item.className = `route-item ${index === 0 ? 'selected' : ''}`;
        item.innerHTML = `
            <div class="route-meta">
                <span class="route-name">${route.name}</span>
                <span class="route-time">${route.eta} mins</span>
            </div>
            <div class="route-labels">
                ${route.labels.map(l => `<span class="label label-${l.toLowerCase()}">${l}</span>`).join('')}
            </div>
            <div class="route-stats">
                <span>Dist: ${route.dist.toFixed(1)} km</span>
                <span>Fuel: ${route.fuel}L</span>
                <span>CO2: ${route.co2}kg</span>
                <span>Risk: <b class="risk-${route.risk.toLowerCase()}">${route.risk}</b></span>
            </div>
        `;
        item.onclick = () => selectRoute(route, item);
        list.appendChild(item);
    });
}

function selectRoute(route, el) {
    document.querySelectorAll('.route-item').forEach(item => item.classList.remove('selected'));
    el.classList.add('selected');

    // Update explanation
    document.getElementById('exp-text').innerText = route.explanation;
    document.querySelector('#exp-panel p:first-child').innerText = `Why ${route.name}?`;
}

function runSimulation() {
    const tbody = document.getElementById('sim-table-body');
    tbody.innerHTML = '';

    currentRoutes.forEach(route => {
        const row = document.createElement('tr');
        if (route.id === 'A') row.className = 'rec-highlight';
        row.innerHTML = `
            <td>${route.name}</td>
            <td>${route.eta}m</td>
            <td>${route.fuel}L</td>
            <td>${route.co2}kg</td>
            <td><span class="risk-label risk-${route.risk.toLowerCase()}">${route.risk}</span></td>
        `;
        tbody.appendChild(row);
    });
}

// --- Live Carbon Tracker Animation ---
let trackingInterval;
function startCarbonTracking(fuelType) {
    if (trackingInterval) clearInterval(trackingInterval);

    let distTraveled = 0;
    const co2Display = document.getElementById('carbon-live');
    const statusDisplay = document.getElementById('tracking-status');

    trackingInterval = setInterval(async () => {
        if (!document.getElementById('carbon-tracker').classList.contains('active')) {
            clearInterval(trackingInterval);
            return;
        }

        distTraveled += 0.05; // Simulate 50m movement

        try {
            const res = await fetch(`${API_BASE_URL}/api/real-time-impact?dist_traveled=${distTraveled}&efficiency_rating=1.0`);
            const data = await res.json();

            co2Display.innerText = `${data.live_co2.toFixed(3)} kg`;
            statusDisplay.innerText = `Efficiency: ${data.efficiency_score}%`;

            if (data.re_route_flag && document.getElementById('reroute-toggle').classList.contains('checked')) {
                statusDisplay.innerText = "!! RE-ROUTING DETECTED !!";
                statusDisplay.style.color = "#ef4444";
                setTimeout(() => { statusDisplay.style.color = "#34d399"; }, 2000);
            }
        } catch (e) {
            // Fallback to local logic if backend fails during tracking
            const localCo2 = distTraveled * (fuelType === 'Electric' ? 0 : 0.12);
            co2Display.innerText = `${localCo2.toFixed(3)} kg`;
        }
    }, 1000);
}

// --- Header Scroll Effect ---
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// --- Scroll Reveal Animation ---
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
    // Reveal sections and cards
    document.querySelectorAll('section, .glass-card, .hero-content, .hero-visual').forEach(el => {
        el.classList.add('reveal-init');
        revealObserver.observe(el);
    });
});
