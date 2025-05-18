
# 📘 Restaurant Discount System Backend Documentation

## Overview
This is the backend API for a machine learning-driven restaurant discount system. The system predicts customer traffic by the hour and suggests discounts to increase traffic during slower times. Admins (restaurant managers) can view, accept, or reject these discounts, and customers can view only the accepted ones.

**Live API:** [https://restaurant-discount-prediction-project.onrender.com](https://restaurant-discount-prediction-project.onrender.com)

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js
- Access to MongoDB (used MongoDB Atlas in deployment)

### Installation
```bash
npm install
node server.js
```

---

## 🗃️ Database Schema

### MongoDB Cluster
- **Database:** `restaurant_prediction_data`
- **Collections:** `restaurant_<restaurant_id>`

### Sample Document
```json
{
  "restaurant_id": "0001",
  "date": "2025-05-13",
  "expected_customers": {
    "10": 10,
    "11": 23
  },
  "discounts": {
    "10": 15,
    "11": 0
  },
  "accepted_discounts": {
    "10": true,
    "11": false
  }
}
```

---

## 📡 API Endpoints

### `/admin`

#### `GET /admin/discounts/:restaurantId/:date`
Fetch all predicted discounts (both accepted and pending) for a specific restaurant and date.

**Response**
```json
{
  "restaurant_id": "0001",
  "date": "2025-05-13",
  "discounts": { "10": 15 },
  "accepted_discounts": { "10": true }
}
```

#### `POST /admin/accept`
Accept or reject a discount for a given hour.

**Body**
```json
{
  "restaurant_id": "0001",
  "date": "2025-05-13",
  "hour": "10",
  "accepted": true
}
```

---

### `/discounts`

#### `GET /discounts/:restaurantId/:date`
Return only the accepted discounts for a specific restaurant and date.

**Response**
```json
{
  "discounts": {
    "10": 15,
    "14": 10
  }
}
```

---

### `/user`

#### `GET /user/discounts/:restaurantId/:date`
Alias for `/discounts`. Fetches accepted discounts for customer display.

---

## 🧭 Future Features

- Admin authentication (JWT)
- Discount editing capabilities
- Audit logging and analytics

---

## 📘 OpenAPI Spec

An OpenAPI (Swagger) spec is available for API exploration and integration. Contact the team for the latest JSON or Swagger UI link.

---

## 👥 Contributors

- Backend Developer: [Your Name]
- ML Team: Integrated prediction service
