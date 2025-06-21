# 📖 BookHeavens – BookStore Management Frontend

Welcome to **BookHeavens**, the sleek and user-friendly **frontend** of a bookstore management system. Built as a React application, it delivers a seamless experience for browsing, managing inventory, and interacting with book lovers everywhere.

![image alt](https://github.com/YashSikarwar28/BookHeavens-BookStore-Management-Frontend/blob/2325b01337fba6acf6c28b4c80aff7c8c9fdd07b/Screenshot%20(1).png)

---

## 🌟 Features

- **📚 Browse & Search Books**  
  Easily filter and search books by title, author, genre, ISBN, and more.

- **🧩 Inventory Management**  
  Admins can add, update, or remove books with full CRUD operations.

- **🛒 Shopping Cart**  
  Add books to a cart, adjust quantities, and review selections before checkout.

- **👤 User Authentication**  
  Log in or register (JWT sessions) to access personalized experiences.

- **🔎 Responsive & Accessible UI**  
  Clean, mobile-first design built with React and modern CSS.

- **⚛️ Modular & Performant**  
  Component-driven architecture using React Hooks, Context API, and optimized bundles.

---

## 🏗 Tech Stack

- **Frontend**: React.js   
- **API Requests**: Fetch / Axios  
- **Styling**: CSS Modules / Tailwind CSS  
- **Routing**: React Router v6  
- **Build Tools**: Vite / Webpack / Create React App

---
## 🚀 Getting Started

-This project consists of:

🖥 Frontend: React.js (BookHeavens-BookStore-Management-Frontend)

🛠 Backend: Node.js / Express (BookHeavens-BookStore-Management-Backend)

---

---
📦 Prerequisites
Make sure you have installed:

Node.js (v16+)

npm or yarn

MongoDB (or use MongoDB Atlas for cloud hosting)

---

---
🧩 Step 1: Clone Both Repositorie

Clone the frontend
git clone https://github.com/YashSikarwar28/BookHeavens-BookStore-Management-Frontend.git

Clone the backend
git clone https://github.com/YashSikarwar28/BookHeavens-BookStore-Management-Backend.git

---

---
🖥 Step 2: Setup Backend

cd BookHeavens-BookStore-Management-Backend

# Install dependencies
npm install

# Create .env file
touch .env

Add the following to your .env

 PORT=5000
 
 MONGO_URI=your_mongodb_connection_string
 
 JWT_SECRET=your_jwt_secret

Then start the backend server:

npm run dev
By default, the backend will run on http://localhost:5000.

---

---
🌐 Step 3: Setup Frontend

cd ../BookHeavens-BookStore-Management-Frontend

# Install dependencies

npm install

Create a .env file

REACT_APP_API_BASE_URL=http://localhost:5000/api

Then start the frontend app:
npm start

Your app should now be running on http://localhost:3000.

---
