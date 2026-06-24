# Real-Time Hospital Bed Availability System

## Overview

The Real-Time Hospital Bed Availability System is a full-stack MERN application that helps users find hospitals and check the availability of ICU beds, Oxygen beds, and Ventilator beds in real time.

The system provides role-based access where administrators can update bed availability and users can search and view hospital information instantly.

---

## Features

### Authentication & Authorization

* JWT-based Authentication
* Secure Password Hashing using bcryptjs
* Role-Based Access Control (Admin / Patient)

### Hospital Management

* Add Hospitals
* View Hospitals
* Search Hospitals by Name
* Filter Hospitals by City

### Bed Availability Tracking

* ICU Bed Availability
* Oxygen Bed Availability
* Ventilator Availability
* Oxygen Support Status

### Real-Time Updates

* Socket.IO Integration
* Live Bed Availability Updates
* Instant Dashboard Refresh

### Responsive UI

* React + TypeScript Frontend
* Tailwind CSS Styling
* Mobile-Friendly Design

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs
* Socket.IO

### Tools

* Git
* GitHub
* Postman
* MongoDB Atlas

---

## System Architecture

User
↓
React Frontend
↓
Axios API Calls
↓
Express Backend
↓
MongoDB Atlas

Socket.IO
↑
Real-Time Updates

---

## Project Structure

hospital-bed-system/

backend/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── server.js

frontend/
├── api/
├── components/
├── context/
├── hooks/
├── pages/
├── routes/
├── types/
├── App.tsx

---

## Database Models

### User

| Field      | Type            |
| ---------- | --------------- |
| name       | String          |
| email      | String          |
| password   | String          |
| role       | ADMIN / PATIENT |
| hospitalId | ObjectId        |

### Hospital

| Field   | Type   |
| ------- | ------ |
| name    | String |
| city    | String |
| address | String |
| phone   | String |
| email   | String |

### BedAvailability

| Field           | Type     |
| --------------- | -------- |
| hospitalId      | ObjectId |
| icuBeds         | Object   |
| oxygenBeds      | Object   |
| ventilatorBeds  | Object   |
| oxygenAvailable | Boolean  |
| lastUpdated     | Date     |

---

## Authentication Flow

1. User Registers
2. Password is Hashed using bcryptjs
3. User Logs In
4. JWT Token Generated
5. Token Stored in Local Storage
6. Protected Routes Verified using Middleware

---

## API Endpoints

### Auth APIs

POST /api/auth/register

POST /api/auth/login

GET /api/auth/me

### Hospital APIs

GET /api/hospitals

POST /api/hospitals

GET /api/hospitals/:id

### Bed APIs

GET /api/beds

POST /api/beds

PUT /api/beds/:id

---

##  Real-Time Updates

Socket.IO is used to provide real-time synchronization of bed availability data.

When an administrator updates bed counts:

1. Database gets updated
2. Backend emits event
3. Connected clients receive update
4. UI updates automatically without refresh

---

## Screenshots

### Home Page

(Add Screenshot Here)

### Login Page

(Add Screenshot Here)

### Admin Dashboard

(Add Screenshot Here)

### Hospital Details Page

(Add Screenshot Here)

---

##  Installation

### Clone Repository

```bash
git clone https://github.com/Lasyaaa/hospital-bed-system.git
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

Create a .env file inside backend/

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
NODE_ENV=development
```

---

##  Future Enhancements

* Google Maps Integration
* Geolocation-based Search
* Email Notifications
* SMS Alerts
* Analytics Dashboard
* Mobile Application
* Integration with Real Hospital APIs

---

##  Resume Description

Developed a full-stack MERN application for real-time hospital bed availability tracking. Implemented JWT authentication, role-based access control, MongoDB Atlas integration, and Socket.IO-powered live updates. Built responsive dashboards with search and filtering features to improve healthcare resource visibility.

---

##  Author

Lasya Priya

B.Tech Information Technology

VNR Vignana Jyothi Institute of Engineering and Technology

GitHub: https://github.com/Lasyaaa
