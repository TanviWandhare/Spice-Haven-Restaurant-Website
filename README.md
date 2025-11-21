# 🍽️ Spice Haven – Restaurant Website

Spice Haven is a responsive restaurant web application built using **HTML**, **CSS**, and **JavaScript**.  
It allows users to explore delicious dishes, search food items dynamically, view detailed popups, manage their cart, and register/log in using OTP verification. A responsive hamburger menu provides a smooth user experience.

---

## 🚀 Features

### 🌐 Frontend Functionality
- 🏠 **Home Page**
  - Displays featured categories such as Best Sellers, Trending, Starters, Beverages, Main Course, and Combos.

- 🍛 **Our Menu Page**
  - Dynamically fetches items from a JSON file.
  - Organizes food items by category.

- 🔍 **Advanced Search Functionality**
  - Real-time item search with keyword highlighting.
  - When the input is cleared, the entire menu reloads automatically.
  - Pressing **Enter** after typing a search term instantly opens the popup of the first matching item.

- 🧾 **Product Popup View**
  - Clicking a food card opens a detailed popup with description, price, and an “Add to Cart” button.

- 🛒 **Cart System**
  - Add, update, and view items in the cart.
  - Item count persists across pages using **sessionStorage**.
  - Smart Alert Logic:
    - “Added to Cart” alert shows **only when added the first time**.
    - No alert appears when removing and adding again.

- 📱 **Responsive Design**
  - Fully mobile-friendly UI.
  - Includes a working hamburger menu for navigation.

- ✉️ **Subscription Section**
  - Email validation with instant feedback alerts.

---

## 🔐 User Authentication
- 🧍 **Signup & Login**
  - Users can register and log in securely.

- 🔢 **OTP Verification**
  - Simple OTP-based validation flow for authentication.

- 🔄 **Responsive Auth Pages**
  - Works seamlessly across all devices.

---

## 🧩 Tech Stack
- **Frontend:** HTML5, CSS3, JavaScript (ES6)
- **Data Source:** foodItems.json (local dynamic fetch)
- **Storage:** Browser sessionStorage for cart management

---

## ⚙️ How It Works
- All food items are dynamically loaded from **foodItems.json**.
- Items are grouped under multiple categories like Starters, Main Course, Beverages, etc.
- Search functionality filters items by title with live keyword highlighting.
- Clicking an item opens a popup with details and an add-to-cart button.
- Cart data is stored using **localStorage** and reflected in the navbar.
- Authentication pages manage login/signup and OTP verification.

---

## 🧑‍💻 Author

**_Tanvi Wandhare_**  
Front-End Developer  
Passionate about creating modern, responsive, and interactive web apps.
