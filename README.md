# 🏥 MediCamp - Medical Camp Management System

**MediCamp** is a full-stack Medical Camp Management System built with the **MERN stack (MongoDB, Express, React, Node.js)**. It simplifies the process of organizing, managing, and participating in medical camps through a role-based dashboard, secure authentication, and a clean responsive UI.

---

## 🚀 Live Demo

🌐 [Live Site Link](https://medicamp-1e9cc.web.app/)  
🔐 Organizer Login:  
- **Username**: organizer@medicamp.com  
- **Password**: organizer123

---

## 📸 Preview

![MediCamp Homepage Screenshot](./public/preview-home.png)

---

## 📦 Tech Stack

- **Frontend:** React, React Router DOM, Tailwind CSS, TanStack Query, Shadcn/UI, Framer Motion, Stripe, Firebase Auth
- **Backend:** Node.js, Express, MongoDB, JWT
- **Tools & Libraries:** Axios, React Hook Form, Recharts, SweetAlert2, React Toastify

---

## ✅ Features

- 🔐 Role-based authentication (Organizer / Participant)
- 🧠 Organizer Dashboard: Add, Manage Camps, View Registrations
- 🙋 Participant Dashboard: Join Camps, Payments, Feedback, Analytics
- 💳 Stripe integration for secure payments
- 📊 Real-time charts showing user analytics (Recharts)
- 🔍 Search, sort, and pagination in all tables
- 📱 Fully responsive on desktop, tablet, and mobile
- 🧾 JWT secured private routes (persistent login)
- 🧼 Sweet Alerts + Toasts for all interactions (no default browser alerts)
- 🎭 404 Page + animation using Framer Motion / AOS
- 📬 Feedback & Ratings system from participants
- 🧪 TanStack Query for all `GET` API calls
- ✨ Extra Feature: Volunteer Management (Organizer-side)

---


---

## 🧪 Test Accounts

### ✅ Organizer
- Email: organizer@medicamp.com
- Password: organizer123

### ✅ Participant
- Email: user@medicamp.com
- Password: user123

---

## ⚙️ Local Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/medicamp.git
cd medicamp

# Install server
cd server
npm install
npm run dev

# Install client
cd ../client
npm install
npm run dev



