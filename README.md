<div align="center">
  <img src="https://i.imgur.com/8iM5EEN.png" width="100" alt="MusiVive Logo" />
  <h1>MusiVive 🎧</h1>
  <p><i>Your Ultimate Music Streaming Experience</i></p>
</div>

---

## 🎵 About the Project

**MusiVive** is a full-featured, modern music streaming web app built using the **MERN stack with EJS templates**.  
Think of it as a minimal, elegant Spotify alternative – perfect for discovering, playing, and saving your favorite tracks.

---

## ✨ Features

- 🎧 Persistent global music player (play without stopping on navigation)
- 🔎 Dynamic song search with AJAX
- 🎼 Time-synced lyrics with highlight and scroll
- 🎶 Create and manage your playlists
- ☁️ Cloudinary for song & image hosting
- 🔐 User authentication (Login/Signup/Session)

---

## 🖥️ Tech Stack

| Tech             | Purpose                        |
|------------------|-------------------------------|
| **Node.js + Express** | Backend server              |
| **MongoDB + Mongoose** | Database & models          |
| **EJS + ejs-mate**     | Templating engine (views)  |
| **Bootstrap 5**        | Frontend styling           |
| **AJAX + Fetch API**   | Dynamic navigation & UI    |
| **Cloudinary**         | Hosting audio/image files  |
| **Passport.js**        | Authentication             |

---

## 🚀 Live Demo

🌐 **Visit now**: [Click Here ](https://musivive.onrender.com)

---

## 📸 Screenshots

| Homepage | Song Page |
|---------|-----------|
| ![Home](https://i.imgur.com/6MIgM7s.png) | ![Song](https://i.imgur.com/zj9ADUZ.png) |

---

## 📂 Project Structure
MusiVive/
├── app.js
├── models/
├── init/
├── views/
│ ├── layouts/
├── public/
│ ├── css/
├── .env
├── package.json
├── package-lock.json
└── README.md


---

## ⚙️ Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/akshatgoyal-19/MusiVive.git
cd MusiVive

# 2. Install dependencies
npm install

# 3. Set environment variables
touch .env

DB_URL=mongodb+srv://your-db-url

SECRET=session-secret

# 4. Start the app
nodemon app.js
```
Thanks for reading !!
Made with ❤️ by [Akshat Goyal](https://github.com/akshatgoyal-19)



