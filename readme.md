# 🌐 Full Stack Portfolio Web Application

A dynamic and fully responsive portfolio web application built using modern web technologies. This project showcases personal details, technical skills, and projects while also integrating a real-time communication system with an administrative dashboard for efficient message management.

---

## 🚀 Overview

This application serves as both a professional portfolio and a functional full-stack system. It allows visitors to explore information and directly connect via a contact form, while providing a robust admin interface to manage incoming queries seamlessly.

---

## ✨ Features

### 👤 Portfolio Section

* Clean and responsive user interface
* Sections for:

  * About Me
  * Skills
  * Experience
  * Projects
* Optimized for multiple screen sizes

### 📩 Contact System

* Interactive contact form for user queries
* Form submissions are:

  * Sent directly to email
  * Stored in the database for persistence

### 🗄️ Database Integration

* All messages are stored securely in MongoDB
* Structured schema for efficient data handling

### 🛠️ Admin Dashboard

A dedicated admin panel with advanced controls:

* View all incoming messages
* Search messages efficiently
* Filter based on criteria
* Mark messages as:

  * Read
  * Unread
* Delete messages
* Real-time UI updates without page reload
* Event-based feedback messages for user actions

### ⚡ Dynamic Functionality

* Asynchronous operations (AJAX/jQuery)
* No page refresh required for data updates
* Smooth and interactive user experience

### 📱 Responsive Design

* Fully responsive portfolio and admin panel
* Optimized for desktop, tablet, and mobile devices

---

## 🧰 Tech Stack

**Frontend:**

* HTML5
* CSS3
* JavaScript
* jQuery

**Backend:**

* Node.js

**Database:**

* MongoDB

---

## 📂 Project Structure

```
portfolio-GB/
│
├── css/            # CSS files
├── js/            # JS files
├── portfolio-web.html             # Frontend Portfolio page
├── message.html/            # Frontend dashboard
├── backend/            # Consist of node modules
├── .env               # Environment variables
├── app.js / server.js # Server logic
└── package.json
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/Gulnaaz-dotcom/portfolio-fullstack.git

cd portfolio-fullstack
```

### 2. Install dependencies

```
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory and add:

```
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password_or_app_password
PORT=5000
```

### 4. Run the application

```
npm start
```

---


## 🔄 Core Functional Highlights

* End-to-end full-stack implementation
* Real-time admin operations without reload
* Integrated email + database system
* Structured and scalable backend architecture
* Clean UI with responsive behavior

---

## 🧪 Future Enhancements

* Authentication & authorization for admin panel
* Pagination for large datasets
* Advanced analytics for messages
* Deployment and CI/CD integration
* Enhanced UI/UX improvements

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 📬 Contact

For any inquiries or collaboration opportunities, feel free to connect through the contact form in the application.
