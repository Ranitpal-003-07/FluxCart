# ⚡️ Fluxcart

Fluxcart is a blazing-fast, modern e-commerce dashboard application built with **Vite**, **React**, **Chakra UI**, **Recharts**, and **Firebase**. It features seamless authentication, real-time Firestore data handling, and an intuitive admin interface for managing products and analyzing data.

---

## 🛠️ Tech Stack

- **Frontend:**
  - [Vite](https://vitejs.dev/) — Lightning-fast build tool
  - [React](https://reactjs.org/) — UI library for building component-driven interfaces
  - [Chakra UI](https://chakra-ui.com/) — Accessible and customizable component library
  - [Recharts](https://recharts.org/) — Declarative charting built on React

- **Backend/Cloud Services:**
  - [Firebase Authentication](https://firebase.google.com/products/auth) — Secure authentication system
  - [Firestore](https://firebase.google.com/products/firestore) — Scalable NoSQL cloud database

---

## 🔐 Authentication

Firebase Authentication enables secure and streamlined sign-in experiences. Currently supports:
- Email/password authentication
- Real-time auth state handling
- Protected routes with automatic redirection

---

## 🧭 Pages

### 🚪 Login
Secure entry point to access the dashboard. Integrated with Firebase Auth and provides error handling and input validation.

### 🏠 Home
A minimal landing interface showing quick navigation to the core features of the dashboard.

### 📊 Dashboard
A fully responsive admin panel featuring:
- **📈 Analytics Chart:** Real-time data visualization using Recharts.
- **📦 Product Summary:** Aggregated data display of all products.
- **🧾 Product Table:** A powerful table UI featuring:
  - Inline **editing** of products
  - **Add new product** modal
  - **Delete** single or multiple rows
  - **Bulk selection** for multi-row operations

---

## ✨ Features

- 🔥 **Vite-powered** development for lightning-fast HMR
- 💅 Fully themed with **Chakra UI**, dark mode ready
- 📉 Integrated **Recharts** for modern data visualization
- 🔐 **Firebase Auth** with route protection and session persistence
- 📁 **Firestore integration** for real-time product data storage and updates
- 🧩 Modular code structure with clean component separation
- 📦 Easily extendable for order management, customer analytics, etc.

---

## 📁 Project Structure
src/
├── assets/ # Static assets
├── components/ # Reusable components (NavBar, ProductTable, etc.)
├── pages/ # Route-specific pages (Login, Home, Dashboard)
├── services/ # Firebase config, Auth, Firestore handlers
├── hooks/ # Custom React hooks
├── App.jsx # App layout and routing
└── main.jsx # Vite/React app bootstrap

---

## 🚀 Getting Started

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/fluxcart.git
cd fluxcart

2. Install dependencies

npm install
# or
yarn

3. Configure Firebase

Create a .env file in the root with your Firebase credentials:

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

4. Start the app

npm run dev
# or
yarn dev

🧪 Development Notes

    React Router v6 for client-side routing

    Chakra UI handles theming and responsive layout

    Form validations handled using native HTML5 and Chakra

    Firebase handles both Auth and real-time Firestore reads/writes

    Recharts used for dynamic data representation in charts

🧱 Future Enhancements

    🌍 Role-based access control (Admin vs User)

    📊 Extended dashboard analytics

    🛒 Orders and customer management

    📱 PWA support for mobile dashboards

    🧠 AI product recommendations

🤝 Contributing

    Fork the repo

    Create your feature branch: git checkout -b feature/YourFeature

    Commit your changes: git commit -am 'Add some feature'

    Push to the branch: git push origin feature/YourFeature

    Open a Pull Request

📜 License

This project is licensed under the MIT License.
🧑‍💻 Maintainer

Developed with ❤️ by Your Name — Open for collaboration.

    “A good dashboard gives you control. A great dashboard gives you insight.” — Ranit Pal


---

Let me know if you'd like a custom badge set, deployment instructions (e.g., Netlify or Firebase Hosting), or a logo added.

