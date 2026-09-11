import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
import pickle
import os

"""
ROADGUARD - Model Training Script
Algorithm: Random Forest Classifier
Target: Risk Level (0 = Low, 1 = Medium, 2 = High)
"""

def generate_synthetic_dataset(num_samples=1500, filename="dataset.csv"):
    """
    Generates a realistic road safety dataset based on established
    transportation engineering accident causation factors.
    """
    np.random.seed(42)
    
    weathers = ['Clear', 'Rainy', 'Foggy', 'Snow', 'Overcast']
    road_conditions = ['Dry', 'Wet', 'Icy', 'Potholes / Damaged', 'Under Construction']
    traffic_levels = ['Low', 'Moderate', 'Heavy', 'Congested']
    visibilities = ['Good (>1km)', 'Moderate (500m-1km)', 'Poor (100-500m)', 'Very Poor (<100m)']
    times_of_day = ['Morning Rush', 'Afternoon', 'Evening Rush', 'Late Night', 'Dawn']
    road_types = ['Highway', 'Urban Arterial', 'Residential', 'Rural Single Lane', 'Ghat / Mountain']
    lighting_conditions = ['Daylight', 'Well Lit Street', 'Dimly Lit', 'Dark / No Lights']
    
    data = []
    
    for _ in range(num_samples):
        w = np.random.choice(weathers, p=[0.45, 0.25, 0.12, 0.06, 0.12])
        r = np.random.choice(road_conditions, p=[0.50, 0.25, 0.08, 0.10, 0.07])
        t = np.random.choice(traffic_levels, p=[0.25, 0.40, 0.25, 0.10])
        v = np.random.choice(visibilities, p=[0.50, 0.25, 0.15, 0.10])
        tod = np.random.choice(times_of_day, p=[0.25, 0.25, 0.25, 0.18, 0.07])
        rt = np.random.choice(road_types, p=[0.30, 0.30, 0.20, 0.12, 0.08])
        l = np.random.choice(lighting_conditions, p=[0.50, 0.25, 0.15, 0.10])
        
        # Speed varies by road type
        if rt == 'Highway':
            speed = np.random.randint(60, 130)
        elif rt == 'Urban Arterial':
            speed = np.random.randint(40, 80)
        elif rt == 'Residential':
            speed = np.random.randint(20, 50)
        elif rt == 'Ghat / Mountain':
            speed = np.random.randint(25, 65)
        else:
            speed = np.random.randint(35, 75)
            
        num_vehicles = np.random.randint(1, 30)
        
        # Calculate risk score base
        score = 15.0
        
        # Weather impact
        if w == 'Rainy': score += 18
        elif w == 'Foggy': score += 24
        elif w == 'Snow': score += 26
        elif w == 'Overcast': score += 5
        
        # Road condition impact
        if r == 'Wet': score += 18
        elif r == 'Icy': score += 32
        elif r == 'Potholes / Damaged': score += 16
        elif r == 'Under Construction': score += 14
        
        # Visibility impact
        if v == 'Poor (100-500m)': score += 20
        elif v == 'Very Poor (<100m)': score += 30
        elif v == 'Moderate (500m-1km)': score += 8
        
        # Lighting & Time
        if l == 'Dark / No Lights': score += 20
        elif l == 'Dimly Lit': score += 12
        if tod == 'Late Night': score += 15
        
        # Speed vs limit risk
        if speed > 100: score += 22
        elif speed > 80: score += 12
        elif speed > 60: score += 5
        
        # Traffic density
        if t == 'Heavy': score += 14
        elif t == 'Congested': score += 18
        
        # Road type risk
        if rt == 'Ghat / Mountain': score += 18
        elif rt == 'Rural Single Lane': score += 10
        
        # Add slight natural randomness
        score += np.random.normal(0, 5)
        score = max(5, min(98, score))
        
        if score < 42:
            risk_level = 'LOW'
        elif score < 70:
            risk_level = 'MEDIUM'
        else:
            risk_level = 'HIGH'
            
        data.append({
            'weather': w,
            'road_condition': r,
            'traffic_level': t,
            'visibility': v,
            'time_of_day': tod,
            'speed_kmh': speed,
            'road_type': rt,
            'lighting': l,
            'num_vehicles': num_vehicles,
            'risk_score': round(score, 1),
            'risk_level': risk_level
        })
        
    df = pd.DataFrame(data)
    df.to_csv(filename, index=False)
    print(f"Generated synthetic dataset with {len(df)} rows saved to {filename}")
    return df

def train():
    os.makedirs("model", exist_ok=True)
    dataset_path = "model/dataset.csv"
    
    if not os.path.exists(dataset_path):
        df = generate_synthetic_dataset(1500, dataset_path)
    else:
        df = pd.read_csv(dataset_path)
        
    # Feature columns
    feature_cols = [
        'weather', 'road_condition', 'traffic_level', 'visibility',
        'time_of_day', 'speed_kmh', 'road_type', 'lighting', 'num_vehicles'
    ]
    
    X = df[feature_cols]
    y = df['risk_level']
    
    # One-hot encode categorical features
    X_encoded = pd.get_dummies(X, drop_first=True)
    
    # Train-test split (80% train, 20% test)
    X_train, X_test, y_train, y_test = train_test_split(
        X_encoded, y, test_size=0.20, random_state=42, stratify=y
    )
    
    print(f"Training Random Forest Classifier on {len(X_train)} samples...")
    model = RandomForestClassifier(
        n_estimators=100,
        max_depth=12,
        min_samples_split=4,
        random_state=42
    )
    model.fit(X_train, y_train)
    
    # Evaluation
    y_pred = model.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    print(f"Model Accuracy on Test Set: {acc * 100:.2f}%")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))
    
    # Save the trained model and column blueprint
    model_payload = {
        'model': model,
        'feature_names': list(X_encoded.columns),
        'accuracy': round(acc * 100, 2)
    }
    
    model_file = "model/roadguard_model.pkl"
    with open(model_file, "wb") as f:
        pickle.dump(model_payload, f)
        
    print(f"Successfully serialized model to {model_file}")

if __name__ == "__main__":
    train()
