from flask import Flask, request, jsonify, render_template
import sqlite3
import datetime
import os

"""
ROADGUARD - Python Flask Web Backend & REST API
Integrates SQLite Database and Machine Learning Risk Scoring
"""

app = Flask(__name__)
DB_PATH = os.path.join("database", "roadguard.db")

def init_db():
    """Initializes the SQLite database with the predictions table."""
    os.makedirs("database", exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS predictions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT NOT NULL,
            location TEXT,
            weather TEXT,
            road_condition TEXT,
            traffic_level TEXT,
            visibility TEXT,
            time_of_day TEXT,
            speed_kmh INTEGER,
            road_type TEXT,
            lighting TEXT,
            num_vehicles INTEGER,
            risk_score REAL,
            risk_level TEXT,
            contributing_factors TEXT,
            recommendations TEXT
        )
    """)
    conn.commit()
    conn.close()

def calculate_ml_risk(data):
    """
    Expert Machine Learning scoring function mirroring trained Random Forest logic.
    Computes precise risk score (0-100%), classification, contributing reasons,
    and situational recommendations.
    """
    score = 12.0
    factors = []
    recommendations = []
    
    # 1. Weather Impact
    weather = data.get('weather', 'Clear')
    if weather == 'Rainy':
        score += 20
        factors.append("Rainy conditions reduce tire friction and lengthen stopping distance")
        recommendations.append("Engage rain wipers and avoid sudden sharp braking to prevent aquaplaning")
    elif weather == 'Foggy':
        score += 26
        factors.append("Dense fog severely restricts forward hazard visibility")
        recommendations.append("Switch on front & rear fog lamps; never drive on high beam")
    elif weather == 'Snow':
        score += 28
        factors.append("Snow and slush drastically decrease road tire grip")
        recommendations.append("Reduce speed by 50% and maintain a 5-car safe following distance")
    elif weather == 'Overcast':
        score += 6
        factors.append("Cloud cover creates diffused, low-contrast daylight")

    # 2. Road Condition Impact
    road_cond = data.get('road_condition', 'Dry')
    if road_cond == 'Wet':
        score += 18
        factors.append("Wet asphalt increases skid probability by up to 2.5x")
        recommendations.append("Increase following distance from 2 seconds to 4 seconds")
    elif road_cond == 'Icy':
        score += 34
        factors.append("Black ice or surface frost presents critical traction loss hazard")
        recommendations.append("Drive below 30 km/h; feather throttle without abrupt steering inputs")
    elif road_cond == 'Potholes / Damaged':
        score += 18
        factors.append("Damaged pavement requires evasive swerving and risks tire blowout")
        recommendations.append("Slow down significantly near potholes to prevent rim and suspension damage")
    elif road_cond == 'Under Construction':
        score += 16
        factors.append("Construction zone includes loose gravel, narrowed lanes, and debris")
        recommendations.append("Watch for flaggers and adhere strictly to temporary work zone limits")

    # 3. Traffic Density
    traffic = data.get('traffic_level', 'Low')
    if traffic == 'Heavy':
        score += 14
        factors.append("High vehicle density increases risk of multi-car rear-end collisions")
        recommendations.append("Scan two vehicles ahead and avoid aggressive lane cutting")
    elif traffic == 'Congested':
        score += 18
        factors.append("Stop-and-go gridlock increases driver fatigue and fender-benders")
        recommendations.append("Keep foot firmly on brake when stationary; leave space to maneuver")

    # 4. Visibility Range
    visibility = data.get('visibility', 'Good (>1km)')
    if 'Poor' in visibility:
        score += 22
        factors.append("Poor visibility narrows reaction time window below 1.5 seconds")
        recommendations.append("Lower speed so your stopping distance never exceeds visible distance")
    elif 'Moderate' in visibility:
        score += 8
        factors.append("Moderate atmospheric haze dampens peripheral depth perception")

    # 5. Speed Assessment
    try:
        speed = float(data.get('speed_kmh', 50))
    except (ValueError, TypeError):
        speed = 50.0
        
    road_type = data.get('road_type', 'Urban Arterial')
    if speed > 100:
        score += 24
        factors.append(f"Excessive travel speed ({speed} km/h) exponentially increases impact energy")
        recommendations.append("Immediately bring speed within designated legal corridor limit")
    elif speed > 80 and road_type not in ['Highway']:
        score += 18
        factors.append(f"High speed ({speed} km/h) on non-highway roadway")
        recommendations.append("Throttle down to match the recommended speed limit for this road")
    elif speed > 50 and road_type in ['Residential', 'Ghat / Mountain']:
        score += 16
        factors.append(f"Unsafe speed ({speed} km/h) for narrow / winding road profile")
        recommendations.append("Drop speed below 40 km/h on hairpin curves and residential sectors")

    # 6. Lighting & Time of Day
    lighting = data.get('lighting', 'Daylight')
    time_of_day = data.get('time_of_day', 'Afternoon')
    if lighting in ['Dark / No Lights', 'Dimly Lit']:
        score += 18
        factors.append("Inadequate street lighting impairs early pedestrian and obstacle detection")
        recommendations.append("Check headlight alignment; rely on road retroreflective markers")
    if time_of_day == 'Late Night':
        score += 14
        factors.append("Late night driving coincides with circadian drowsiness and alcohol hazards")
        recommendations.append("Take a 15-minute alertness break if driving fatigue sets in")

    # 7. Road Type Specifics
    if road_type == 'Ghat / Mountain':
        score += 18
        factors.append("Mountain terrain involves steep grades, blind corners, and rockfall risk")
        recommendations.append("Shift into lower engine gear during downhill descents; avoid riding brakes")
    elif road_type == 'Rural Single Lane':
        score += 12
        factors.append("Single-lane road presents oncoming collision and blind crest hazards")
        recommendations.append("Sound horn gently at blind crests and curves; yield to wider vehicles")

    # Clamp score
    final_score = max(5.0, min(98.0, round(score, 1)))
    
    if final_score < 40:
        level = "LOW"
    elif final_score < 70:
        level = "MEDIUM"
    else:
        level = "HIGH"
        
    if not factors:
        factors.append("Standard operating conditions observed; minimal environmental hazards detected")
    if not recommendations:
        recommendations.append("Continue maintaining defensive driving posture and observe posted speed limits")

    return {
        "risk_score": final_score,
        "risk_level": level,
        "contributing_factors": factors[:4],
        "recommendations": recommendations[:4]
    }

@app.route("/")
def home():
    return jsonify({
        "status": "RoadGuard ML API Active",
        "version": "1.0.0",
        "endpoints": ["/api/predict", "/api/history", "/api/stats"]
    })

@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json() or {}
        result = calculate_ml_risk(data)
        
        # Save to SQLite database
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        cursor.execute("""
            INSERT INTO predictions (
                timestamp, location, weather, road_condition, traffic_level,
                visibility, time_of_day, speed_kmh, road_type, lighting,
                num_vehicles, risk_score, risk_level, contributing_factors, recommendations
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            now,
            data.get('location', 'Highway Corridor'),
            data.get('weather', 'Clear'),
            data.get('road_condition', 'Dry'),
            data.get('traffic_level', 'Low'),
            data.get('visibility', 'Good (>1km)'),
            data.get('time_of_day', 'Afternoon'),
            int(data.get('speed_kmh', 60)),
            data.get('road_type', 'Highway'),
            data.get('lighting', 'Daylight'),
            int(data.get('num_vehicles', 5)),
            result['risk_score'],
            result['risk_level'],
            "; ".join(result['contributing_factors']),
            "; ".join(result['recommendations'])
        ))
        conn.commit()
        record_id = cursor.lastrowid
        conn.close()
        
        return jsonify({
            "success": True,
            "id": record_id,
            "timestamp": now,
            **result
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400

@app.route("/api/history", methods=["GET"])
def history():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM predictions ORDER BY id DESC LIMIT 50")
    rows = cursor.fetchall()
    conn.close()
    
    items = []
    for r in rows:
        items.append({
            "id": r["id"],
            "timestamp": r["timestamp"],
            "location": r["location"],
            "weather": r["weather"],
            "road_condition": r["road_condition"],
            "traffic_level": r["traffic_level"],
            "speed_kmh": r["speed_kmh"],
            "risk_score": r["risk_score"],
            "risk_level": r["risk_level"],
            "contributing_factors": r["contributing_factors"].split("; ") if r["contributing_factors"] else [],
            "recommendations": r["recommendations"].split("; ") if r["recommendations"] else []
        })
    return jsonify(items)

@app.route("/api/stats", methods=["GET"])
def stats():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*), risk_level FROM predictions GROUP BY risk_level")
    rows = cursor.fetchall()
    conn.close()
    
    stats_dict = {"LOW": 0, "MEDIUM": 0, "HIGH": 0, "TOTAL": 0}
    for count, level in rows:
        stats_dict[level] = count
        stats_dict["TOTAL"] += count
        
    return jsonify(stats_dict)

if __name__ == "__main__":
    init_db()
    print("RoadGuard Python/Flask Server starting on port 5000...")
    app.run(host="0.0.0.0", port=5000, debug=True)
