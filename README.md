# Real-Time MERN Chat Application 

A full-stack, real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.IO. This project features a web client and an optional React Native mobile client, allowing users to join rooms, exchange messages instantly, and see who's online.

###  Live Demo
* **Web App (Frontend):** `https://realtime-chat-system-two.vercel.app/`
* **Server (Backend):** `https://realtime-chat-system-nkxh.onrender.com`

---

###  Visual Showcase

This application provides a clean, responsive user interface inspired by modern chat apps like WhatsApp.

**

---

###  Core Features

* **User Authentication:** Secure registration and login for registered users.
* **Guest Mode:** Allows users to join and chat instantly with a temporary guest name.
* **Chat Rooms:**
    * View a list of all available rooms.
    * Create new, persistent chat rooms.
    * Join any existing room from the lobby.
* **Real-Time Communication:**
    * Messages are broadcast instantly to all users in a room using **Socket.IO**.
    * A "User is typing..." indicator appears to show activity.
* **Online User List:** See a live list of all users currently active in your chat room.
* **Chat History:** Messages are saved to MongoDB, and the history is loaded automatically when you join a room.
* **Responsive Design:** A mobile-first design that scales seamlessly from small phone screens to large desktop monitors.
* **📱 (Optional) Mobile Client:** A functional mobile app built with **React Native CLI** that connects to the same backend.

---

### 🛠️ Tech Stack

This project is built with a modern, robust tech stack:

| Category      | Technology                                                              |
| :------------ | :---------------------------------------------------------------------- |
| **Backend** | **Node.js**, **Express.js**, **Socket.IO**, **Mongoose**, **bcrypt.js** |
| **Frontend** | **React.js**, **React Router**, **Axios**, **Socket.IO Client** |
| **Mobile** | **React Native CLI**, **React Navigation** |
| **Database** | **MongoDB** (via MongoDB Atlas)                                         |
| **Deployment**| **Vercel** (Backend), **Netlify** (Frontend)                              |

---

###  Getting Started

To get a local copy up and running, follow these simple steps.

#### Prerequisites

* **Node.js** (v16 or later)
* **npm** or **yarn**
* A **MongoDB Atlas** account or a local MongoDB instance.

#### 1. Backend Setup

```bash
# Clone the backend repository
git clone [Your Backend Repo URL]
cd chat-backend

# Install dependencies
npm install

# Create a .env file in the root and add your variables
touch .env
```

Your `.env` file should look like this:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```bash
# Run the server
npm run dev
```
The backend will be running on `http://localhost:5000`.

#### 2. Frontend (Web) Setup

```bash
# Clone the frontend repository in a separate terminal
git clone [Your Frontend Repo URL]
cd chat-frontend

# Install dependencies
npm install

# IMPORTANT: Update the API URL
# In the React project, find all instances of 'http://localhost:5000'
# and ensure they point to your running backend server.

# Run the React development server
npm start
```
The frontend will open on `http://localhost:3000`.

---

###  Project Structure

The backend code is organized into a modular structure for better separation of concerns, making it clean and scalable.

* `config/`: Handles the database connection.
* `controllers/`: Contains the business logic for each route.
* `models/`: Defines the Mongoose schemas for Users, Rooms, and Messages.
* `routes/`: Defines the API endpoints (e.g., `/api/auth`, `/api/rooms`).
* `services/`: Encapsulates the Socket.IO real-time logic.
* `server.js`: The main entry point that initializes the app and ties everything together.

---


---

### 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
