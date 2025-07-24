<div align="center">
   <img src="https://i.ibb.co/Z6L6p0YY/musivivelogo.png" alt="musivivelogo" border="0">
  <h1>MusiVive 🎧</h1>
  <p><i>Your Ultimate Music Streaming Experience</i></p>
</div>

---

## 🎵 About the Project

**MusiVive** is a full-featured, modern music streaming web app built using the **MERN stack with EJS templates**.  
Think of it as a minimal, elegant and ad-free Spotify alternative – perfect for discovering, playing, and saving your favorite tracks.

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
| !(<img src="https://iili.io/Fk9S0Je.md.png" alt="Fk9S0Je.md.png" border="0">)| !(<img src="https://iili.io/Fk9gTMl.md.png" alt="Fk9gTMl.md.png" border="0">) |

---

## 📂 Project Structure
MusiVive/<br>
├── app.js<br>
├── models/<br>
├── init/<br>
├── views/<br>
&nbsp;| &nbsp; ├── layouts/<br>
├── public/<br>
&nbsp;| &nbsp;├── css/<br>
├── .env<br>
├── package.json<br>
├── package-lock.json<br>
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

(PASTE THIS IN env)
DB_URL=mongodb+srv://your-db-url
SECRET=session-secret
(Enter your mongoDB url and session secret)

# 4. Start the app
nodemon app.js
```

Thanks for reading !!<br>
Made with by [Akshat Goyal](https://github.com/akshatgoyal-19)



