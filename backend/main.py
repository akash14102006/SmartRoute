from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import math
import random

# For real implementation, import googlemaps and ortools
# import googlemaps
# from ortools.constraint_solver import routing_enums_pb2
# from ortools.constraint_solver import pywrapcp

app = FastAPI(title="SmartRoute API", description="Enterprise Route Optimization Engine")

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class RouteRequest(BaseModel):
    start_location: str
    end_location: str
    vehicle_mode: str
    fuel_type: str
    cargo_weight: float
    optimization_priority: str
    traffic_enabled: bool
    reroute_enabled: bool

class RouteResponse(BaseModel):
    id: str
    name: str
    eta: int
    distance: float
    fuel_used: float
    co2_emissions: float
    risk_score: str
    evaluation_score: int
    cost_estimate: str
    labels: List[str]
    explanation: str

@app.get("/")
async def root():
    return {"status": "online", "message": "SmartRoute AI Engine is running"}

@app.post("/api/plan-route", response_model=List[RouteResponse])
async def plan_route(request: RouteRequest):
    """
    Simulates Google Maps Routes API (v2) and Google Route Optimization API logic.
    In a production environment, this would call the actual Google Cloud endpoints.
    """
    
    # Logic to adjust values based on vehicle and fuel type
    efficiency_map = {
        "petrol": 1.0,
        "diesel": 0.9,
        "Electric": 0.0, # Handled separately
        "CNG": 0.7
    }
    
    vehicle_mult = {
        "car": 1.0,
        "bike": 0.4,
        "van": 1.5,
        "truck": 3.5,
        "bus": 2.5
    }
    
    base_dist = 15.4 # km
    base_time = 35 # mins
    
    # Handle cargo impact (OR-Tools VRP logic simulation)
    cargo_impact = 1 + (request.cargo_weight / 5000) # Simple linear impact for demo
    
    routes = [
        {
            "id": "A",
            "name": "Express Corridor v2",
            "eta": int(base_time * 0.85 * cargo_impact),
            "distance": round(base_dist * 1.1, 1),
            "fuel_used": round(4.2 * vehicle_mult[request.vehicle_mode] * efficiency_map[request.fuel_type], 1),
            "co2_emissions": round(1.2 * vehicle_mult[request.vehicle_mode] * (0 if request.fuel_type == "Electric" else 1), 2),
            "risk_score": "Low",
            "evaluation_score": 96,
            "cost_estimate": "$14.50",
            "labels": ["Fastest", "Recommended"],
            "explanation": "Utilizes AI delay prediction to bypass 2.4km of congestion on local roads."
        },
        {
            "id": "B",
            "name": "Efficiency Loop",
            "eta": int(base_time * 1.1 * cargo_impact),
            "distance": round(base_dist * 0.9, 1),
            "fuel_used": round(3.1 * vehicle_mult[request.vehicle_mode] * efficiency_map[request.fuel_type], 1),
            "co2_emissions": round(0.85 * vehicle_mult[request.vehicle_mode] * (0 if request.fuel_type == "Electric" else 1), 2),
            "risk_score": "Medium",
            "evaluation_score": 91,
            "cost_estimate": "$11.20",
            "labels": ["Cheapest", "Eco Friendly"],
            "explanation": "Optimized for minimal fuel burn and consistent elevation profile."
        }
    ]
    
    # Add a riskier route for comparison
    routes.append({
        "id": "C",
        "name": "Urban Transit",
        "eta": int(base_time * 1.4 * cargo_impact),
        "distance": round(base_dist * 0.75, 1),
        "fuel_used": round(5.4 * vehicle_mult[request.vehicle_mode] * efficiency_map[request.fuel_type], 1),
        "co2_emissions": round(1.8 * vehicle_mult[request.vehicle_mode] * (0 if request.fuel_type == "Electric" else 1), 2),
        "risk_score": "High",
        "evaluation_score": 62,
        "cost_estimate": "$18.90",
        "labels": ["Shortest"],
        "explanation": "Direct city center route. High risk score due to construction on Main St."
    })

    return routes

@app.get("/api/real-time-impact")
async def get_real_time_impact(dist_traveled: float, efficiency_rating: float):
    """
    Live Carbon Tracking Engine logic.
    Calculates fuel burn and CO2 emissions in real-time.
    """
    # 2.31 kg CO2 per liter of petrol average
    co2_per_km = 0.12 * efficiency_rating 
    current_co2 = dist_traveled * co2_per_km
    
    return {
        "live_co2": round(current_co2, 3),
        "efficiency_score": 98.4,
        "re_route_flag": False if random.random() > 0.1 else True
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
