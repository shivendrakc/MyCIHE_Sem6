# Learn2Drive 🚗  
A full-stack MERN application that connects students with driving instructors for easy lesson booking, payment processing, and instructor management.

## 🚀 Tech Stack

- **Frontend:** React + Vite + Tailwind CSS + MUI  
- **Backend:** Node.js + Express  
- **Database:** MongoDB (Mongoose ODM)  
- **Authentication:** JWT + Google OAuth (Passport.js)  
- **Payments:** Stripe  
- **Deployment:** Vercel (Frontend), Render (Backend)

---

## 📁 Project Structure

```bash
.
├── learn2/           # React frontend (Vite + Tailwind)
├── learn2b/          # Node.js backend (Express + Mongoose)
├── uploads/          # Stored instructor/student uploads
├── .env              # Environment variables
├── README.md
└── .gitignore

Please find your .env files in the repo saved as ENV

📦 Setup Instructions
1. Clone the repository

git clone 
cd learn2drive

2. Install dependencies

# Frontend
cd learn2
npm install

# Backend
cd ../learn2b
npm install

3. Run locally
npm run dev 
Backend

npm run dev
Frontend

npm run dev
🔐 Features
✅ Student & Instructor authentication (JWT + Google OAuth)

📅 Lesson booking system

🧾 Secure Stripe payments

📤 Instructor KYC with file uploads

📊 Admin dashboard to review applications

📚 Role-based dashboards for Students, Instructors, and Admins

