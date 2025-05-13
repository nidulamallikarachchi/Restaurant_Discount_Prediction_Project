# Completed by: Nidula (13/05/2025)
# Manually adds prediction data to MongoDB for any given date
# Also ensures the restaurant is registered in the 'restaurants' collection

import random
from datetime import datetime
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

# ------------------ MongoDB Setup ------------------
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["restaurant_prediction_data"]

# ------------------ Manual Input ------------------
# ✅ Edit these two lines when inserting new mock data
restaurant_info = {
    "restaurant_id": "0003",
    "restaurant_name": "Green Garden"
}

# Enter date in YYYY-MM-DD format
mock_date = "2025-05-13"

# ------------------ Insert into 'restaurants' Collection ------------------
restaurants_collection = db["restaurants"]

if not restaurants_collection.find_one({"_id": restaurant_info["restaurant_id"]}):
    restaurants_collection.insert_one({
        "_id": restaurant_info["restaurant_id"],
        "restaurant_name": restaurant_info["restaurant_name"]
    })
    print(f"✅ Added '{restaurant_info['restaurant_name']}' to 'restaurants' collection.")
else:
    print(f"ℹ️ Restaurant '{restaurant_info['restaurant_name']}' already exists in 'restaurants'.")

# ------------------ Generate Prediction Data ------------------
def simulate_prediction_data(info, date):
    expected_customers = {}
    discounts = {}
    accepted_discounts = {}

    for hour in range(8, 22):
        expected = random.randint(5, 30)
        if expected < 10:
            discount = 30
        elif expected < 20:
            discount = 15
        else:
            discount = 0

        hour_str = str(hour).zfill(2)
        expected_customers[hour_str] = expected
        discounts[hour_str] = discount
        accepted_discounts[hour_str] = None

    return {
        "restaurant_id": info["restaurant_id"],
        "date": date,
        "expected_customers": expected_customers,
        "discounts": discounts,
        "accepted_discounts": accepted_discounts
    }

# ------------------ Insert into Prediction Collection ------------------
collection_name = f"restaurant_{restaurant_info['restaurant_id']}"
collection = db[collection_name]

prediction = simulate_prediction_data(restaurant_info, mock_date)
collection.insert_one(prediction)

print(f"✅ Inserted prediction for {mock_date} into collection '{collection_name}'")
