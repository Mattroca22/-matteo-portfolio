import requests
import json
import random

def run_pipeline():
    print("[ETL] Conectando con la API de la NHTSA...")
    years = ["2023", "2024", "2025"]
    makes = ['toyota', 'ford', 'tesla', 'honda', 'chevrolet']
    states = ["US-CA", "US-TX", "US-FL", "US-NY", "US-IL", "US-PA"]
    
    master_dashboard = {}

    for year in years:
        quarters = ["Q1", "Q2", "Q3", "Q4"]
        trend = [{"period": q, "volume": random.randint(400000, 600000)} for q in quarters]
        map_values = {uid: random.randint(10000, 100000) for uid in states}
        
        yearly_dataset = []
        for make in makes:
            url = f"https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/{make}/modelyear/{year}?format=json"
            try:
                response = requests.get(url)
                if response.status_code == 200:
                    models = response.json().get('Results', [])[:3]
                    for m in models:
                        yearly_dataset.append({
                            "model": m['Model_Name'],
                            "make": make.upper(),
                            "sales": random.randint(30000, 95000)
                        })
            except Exception:
                pass
        
        yearly_dataset = sorted(yearly_dataset, key=lambda x: x['sales'], reverse=True)[:4]
        
        master_dashboard[year] = {
            "total_sales": sum(d['volume'] for d in trend),
            "trend_data": trend,
            "map_data": map_values,
            "top_models": yearly_dataset
        }

    # Apunta directo a tu carpeta 'assests' (con tu typo exacto)
    with open("./src/assests/automotive-senior-data.json", "w", encoding="utf-8") as f:
        json.dump(master_dashboard, f, indent=2, ensure_ascii=False)
    print("[SUCCESS] JSON creado exitosamente en src/assests/")

if __name__ == "__main__":
    run_pipeline()