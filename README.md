<div align="center">

<img src="logo.png" alt="SmartRoute Logo" width="120" />

# SmartRoute AI

### Dynamic Route Optimization Platform

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Google Maps](https://img.shields.io/badge/Google_Maps_API-4285F4?style=for-the-badge&logo=googlemaps&logoColor=white)](https://developers.google.com/maps)

<br/>

> **AI-powered dynamic route optimization** for enterprise logistics and personal travel.  
> Reduce fuel costs by **30%**, eliminate traffic delays, and reach net-zero emissions with real-time AI routing logic.

<br/>

[🚀 Live Demo](#) &nbsp;|&nbsp; [📖 Docs](#️-setup--installation) &nbsp;|&nbsp; [🐛 Report Bug](https://github.com/akash14102006/SmartRoute/issues) &nbsp;|&nbsp; [✨ Request Feature](https://github.com/akash14102006/SmartRoute/issues)

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Setup & Installation](#️-setup--installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Reference](#-api-reference)
- [Roadmap](#️-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🧠 About the Project

**SmartRoute AI** is a full-stack route optimization platform that combines real-time traffic data, AI-powered scoring algorithms, and an intuitive multi-step UI to deliver the smartest route for any delivery or travel scenario.

Whether you're managing a fleet of delivery trucks or planning a personal trip, SmartRoute evaluates multiple route alternatives and recommends the best one based on:

- 🕒 **Estimated Time of Arrival (ETA)**
- ⛽ **Fuel cost efficiency**
- 🌿 **Carbon footprint (CO₂ emissions)**
- 🚦 **Real-time traffic conditions**

---

## ✨ Features

### 🗺️ Real-Time Location Search
- Google Maps Places Autocomplete on both Start and End location fields
- Worldwide address and business search
- Returns exact latitude/longitude coordinates for precise routing

### 🔀 Multi-Route Evaluation Engine
- Fetches multiple route alternatives via Google Routes API (v2)
- Scores each route based on distance, traffic delay, and efficiency
- Highlights the recommended route with clear visual indicators

### 🚗 Vehicle & Efficiency Configuration
- Vehicle type selection (Car, Truck, Van, Motorbike)
- Fuel type and consumption parameters
- Toggle options: Real-time traffic, Avoid tolls, Eco mode

### 📊 Fleet Simulation Dashboard
- Simulate delivery fleet scenarios
- Tabular breakdown of route statistics
- Carbon emission tracking per route

### 🌱 Real-Time Carbon Tracker
- Live CO₂ calculation as route is optimized
- Auto re-route alerts when ETA increases beyond threshold
- Floating tracker bar with efficiency percentage

### 🎨 Premium UI/UX Design
- **Sandal White & Obsidian Black** professional theme
- 3D anime-style hero section with floating illustration cards
- Smooth scroll-reveal animations and micro-interactions
- Fully responsive across all screen sizes

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| HTML5 | Semantic page structure |
| CSS3 (Vanilla) | Custom design system, animations, responsive layout |
| JavaScript (ES6+) | App logic, routing, DOM control |
| Google Maps Places API | Real-time address autocomplete |
| Lucide Icons | Clean, consistent iconography |
| Google Fonts (Outfit + Inter) | Premium typography |

### Backend
| Technology | Purpose |
|---|---|
| Python 3.11 | Core language |
| FastAPI | High-performance REST API |
| Google Routes API v2 | Multi-route fetching with traffic data |
| Gemini AI | Route explanation and scoring enhancement |
| Uvicorn | ASGI server |

---

## 📁 Project Structure

```
SmartRoute/
│
├── 📄 index.html           # Main frontend — multi-page SPA
├── 🎨 style.css            # Full design system (1100+ lines)
├── ⚡ script.js            # Frontend logic, autocomplete, navigation
├── 🖼️ logo.png             # SmartRoute brand logo
├── 📄 README.md            # This file
│
├── 📁 image/               # Illustration assets
│   ├── undraw_my-location_dcug.png     # Location tracking hero image
│   ├── undraw_designer_efwz.png        # Global analytics hero image
│   ├── undraw_access-account_aydp.png
│   ├── undraw_push-notifications_5z1s.png
│   └── undraw_retro-video-game_l9zp.png
│
└── 📁 backend/             # FastAPI backend service
    ├── main.py             # API routes and optimization logic
    └── requirements.txt    # Python dependencies
```

---

## ⚙️ Setup & Installation

### Prerequisites
- A modern browser (Chrome recommended)
- Python 3.9+ (for backend)
- A [Google Cloud](https://console.cloud.google.com) account

### 1. Clone the Repository

```bash
git clone https://github.com/akash14102006/SmartRoute.git
cd SmartRoute
```

### 2. Frontend Setup

The frontend is pure HTML/CSS/JS — no build step required.

Simply open `index.html` in your browser:

```bash
# On Windows
start index.html

# Or use VS Code Live Server extension for the best experience
```

### 3. Add Your Google Maps API Key

Open `index.html` and find line ~13. Replace the key:

```html
<script
  src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initAutocomplete"
  async defer>
</script>
```

**How to get a key:**
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a project → Enable **Places API** + **Maps JavaScript API**
3. Go to **Credentials** → Create **API Key**

### 4. Backend Setup

```bash
cd backend

# Create a virtual environment
python -m venv venv
venv\Scripts\activate       # Windows
# source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Set your API keys
set GOOGLE_MAPS_API_KEY=your_key_here      # Windows
set GEMINI_API_KEY=your_gemini_key_here

# Run the server
uvicorn main:app --reload --port 8000
```

Backend will be live at: `http://localhost:8000`

API Docs (auto-generated): `http://localhost:8000/docs`

---

## 🔧 Configuration

| Variable | Location | Description |
|---|---|---|
| `GOOGLE_MAPS_API_KEY` | `index.html` line 13 | Frontend Places Autocomplete |
| `GOOGLE_MAPS_API_KEY` | Backend `.env` | Routes API calls |
| `GEMINI_API_KEY` | Backend `.env` | AI route explanation |

---

## 🚀 Usage

### Step 1 — Enter Locations
Type your **start** and **end** location. Google Maps will suggest real addresses in real-time as you type.

### Step 2 — Configure Vehicle
Select your vehicle type, fuel parameters, and route preferences (avoid tolls, eco mode, etc.)

### Step 3 — View Optimized Routes
SmartRoute will return multiple route options, ranked by a composite score. The top route is marked **RECOMMENDED**.

### Step 4 — Track Emissions
The floating Carbon Tracker bar shows live CO₂ data and auto re-route alerts.

---

## 📡 API Reference

### `POST /optimize`

Optimizes a route between two coordinates.

**Request Body:**
```json
{
  "start_location": "Chennai, Tamil Nadu",
  "end_location": "Bengaluru, Karnataka",
  "vehicle_type": "truck",
  "fuel_type": "diesel",
  "avoid_tolls": false,
  "eco_mode": true
}
```

**Response:**
```json
{
  "routes": [
    {
      "name": "Route A — NH 48",
      "duration_minutes": 182,
      "distance_km": 348,
      "fuel_cost_inr": 1240,
      "co2_kg": 4.2,
      "score": 94,
      "recommended": true
    }
  ]
}
```

---

## 🗺️ Roadmap

- [x] Real-time Google Places Autocomplete
- [x] Multi-step optimizer form
- [x] Route scoring algorithm
- [x] Carbon emission tracking
- [x] Fleet simulation dashboard
- [ ] Google Maps route visualization (map view)
- [ ] User accounts & saved routes
- [ ] Mobile app (React Native)
- [ ] Webhook for auto re-routing alerts
- [ ] Fleet management multi-vehicle support

---

## 🤝 Contributing

Contributions are welcome! Here's how:

```bash
# 1. Fork the repo
# 2. Create your feature branch
git checkout -b feature/AmazingFeature

# 3. Commit your changes
git commit -m "Add AmazingFeature"

# 4. Push to the branch
git push origin feature/AmazingFeature

# 5. Open a Pull Request
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

**Built with ❤️ by [Akash](https://github.com/akash14102006)**

⭐ **Star this repo** if you found it helpful!

[![GitHub stars](https://img.shields.io/github/stars/akash14102006/SmartRoute?style=social)](https://github.com/akash14102006/SmartRoute/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/akash14102006/SmartRoute?style=social)](https://github.com/akash14102006/SmartRoute/network)

</div>
