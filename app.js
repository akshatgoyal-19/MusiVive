require('dotenv').config();

const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const session = require("express-session");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const mongoStore=require("connect-mongo")
const Song = require("./models/song");
const User = require("./models/user");
const Playlist = require("./models/playlist");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`➡️  ${req.method} ${req.url}`);
  next();
});

app.use(session({
  secret: process.env.secret,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  store: mongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    touchAfter: 24 * 3600 
  }),
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7 
  }
}));


app.use(passport.initialize());
app.use(passport.session());



app.use(async (req, res, next) => {
  res.locals.currentUser = req.user;
  if (req.user) {
    try {
      const playlists = await Playlist.find({ owner: req.user._id }).populate("songs");
      res.locals.userPlaylist = playlists;
    } catch (err) {
      console.error("Error loading playlists", err);
      res.locals.userPlaylist = [];
    }
  } else {
    res.locals.userPlaylist = [];
  }
  next();
});

const MONGO_URL= process.env.MONGO_URL || "mongodb://127.0.0.1:27017/MusiVive"
async function main(){
    await mongoose.connect(MONGO_URL)
}

main().then(()=>{
    console.log("connected to db")
}).catch(()=>{
    console.log("err")
})

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

app.get("/", async (req, res) => {
  let songs = await Song.find({});
  res.render("home.ejs", { songs, showRightSideBar: false });
});

app.get("/song/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Invalid MongoDB ObjectId → 404
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).render("error404", { message: "Invalid Song ID", showRightSideBar: false });
    }

    const song = await Song.findById(id);

    // 2. No song found → 404
    if (!song) {
      return res.status(404).render("error404", { message: "Song not found", showRightSideBar: false });
    }

    // 3. Only run this if song exists
    const relatedSongs = await Song.find({
      _id: { $ne: song._id },
      $or: [
        { artist: song.artist },
        { genre: song.genre },
        { language: song.language }
      ]
    });

    res.render("song.ejs", {
      song,
      relatedSongs,
      showRightSideBar: true
    });

  } catch (err) {
    console.error("💥 Error in /song/:id:", err);
    res.status(500).render("error500", {
      message: "Internal Server Error",
      showRightSideBar: false
    });
  }
});



app.get("/signup",(req,res)=>{
  res.render("signup.ejs",{errorMessage:null});
})

app.post("/signup",async (req,res)=>{
  const {username,email,password} =req.body;
  try{
    const existingEmail=await User.findOne({email});
    if(existingEmail){
      return res.render("signup",{errorMessage: "Email Already Registered!"});
    }
     const existingUsername=await User.findOne({username});
    if(existingUsername){
      return res.render("signup",{errorMessage: "Username Already Exists!"});
    }
    const newUser=await User.register(new User({username,email}),password);
    passport.authenticate('local')(req,res,()=>{
      res.redirect("/")
    })

  }catch(err){
    res.render("signup",{ errorMessage: "Error while signup"})
  }
})

app.get("/login",(req,res)=>{
  res.render("login",{errorMessage:null})
})

app.post("/login", passport.authenticate('local',{
  successRedirect:"/",
  failureRedirect:"/login",
  
}))

app.get("/logout",(req,res)=>{
   req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
})


app.get("/playlist/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Check for invalid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).render("error404", {
        message: "Invalid Playlist ID",
        showRightSideBar: false
      });
    }

    const playlist = await Playlist.findById(id).populate("songs");

    // 2. If playlist not found
    if (!playlist) {
      return res.status(404).render("error404", {
        message: "Playlist not found",
        showRightSideBar: false
      });
    }

    // 3. Only then render playlist page
    const songs = await Song.find({});
    const allSongs = playlist.songs.map(song => ({
      _id: song._id,
      title: song.title,
      artist: song.artist,
      coverUrl: song.coverUrl,
      audioUrl: song.audioUrl
    }));

    res.render("playlist", {
      playlist,
      allSongs,
      songs,
      showRightSideBar: true
    });

  } catch (err) {
    console.error("💥 Error in /playlist/:id:", err);
    res.status(500).render("error500", {
      message: "Internal Server Error",
      showRightSideBar: false
    });
  }
});


app.post("/playlist/create", isLoggedIn, async (req, res) => {
  const { name } = req.body;
  if (!name || name.trim() === "") return res.status(400).json({ error: "Playlist name required" });

  try {
    const newPlaylist = new Playlist({
      name: name.trim(),
      owner: req.user._id,
    });
    await newPlaylist.save();
    res.json({ _id: newPlaylist._id, name: newPlaylist.name });
  } catch (err) {
    console.error("Error creating playlist:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/song/:id/add-to-playlist", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { playlistId } = req.body;
  try {
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) return res.status(400).json({ error: "Playlist not found" });

    if (!playlist.songs.includes(id)) {
      playlist.songs.push(id);
      await playlist.save();
    }

    res.status(200).json({ message: "Song added to playlist" });
  } catch (err) {
    console.error("Error adding song to playlist:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/:playlistId/remove-song/:songId", async (req, res) => {
  const { playlistId, songId } = req.params;
  try {
    await Playlist.findByIdAndUpdate(playlistId, { $pull: { songs: songId } });
    res.json({ success: true });
  } catch (err) {
    console.error("Error removing song:", err);
    res.status(500).json({ success: false });
  }
});

app.delete("/:playlistId/deleteplaylist",async (req,res)=>{
  const {playlistId}=req.params;
  try{
    await Playlist.findByIdAndDelete(playlistId);
    res.json({success:true});
  }catch(err){
    console.error(err);
    res.status(500).json({success:false,error:"failed removing"})
  }
})

app.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "Missing query" });

  try {
    const results = await Song.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { artist: { $regex: query, $options: "i" } },
        { genre: { $regex: query, $options: "i" } },
        { language: { $regex: query, $options: "i" } }
      ]
    });

    res.json({ results });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Search failed" });
  }
});


app.get("/rs/random-song", async (req, res) => {
  const count = await Song.countDocuments();
  const rand = Math.floor(Math.random() * count);
  const song = await Song.findOne().skip(rand);
  res.json(song);
});

app.get("/autoimg/playlist/:id/songs", async (req, res) => {
  const playlist = await Playlist.findById(req.params.id).populate("songs");
  if (!playlist) return res.status(404).json({ error: "Not found" });
  res.json({ songs: playlist.songs });
});

app.get("/crash", (req, res) => {
  throw new Error("💥 Simulated Server Crash");
});


app.use((err, req, res, next) => {
  console.error(" Internal Error:", err.stack);
  res.status(500).render("error500", { showRightSideBar: false });
});

app.use((req, res) => {
  res.status(404).render("error404", { showRightSideBar: false });
});




const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});