const mongoose=require("mongoose");

const songSchema= new mongoose.Schema({
    title: String,
    artist: String,
    year: Number,
    coverUrl: String,  
    audioUrl: String,
    genre: String,
    language: String,
    bgColor: String,         // Background of the song info box
    lyricsBgColor: String,   // Background of the lyrics container
    lyricsColor: String,     // Highlight color for current lyric
    lyrics: [{
    time: Number,          // In seconds (e.g., 64.25)
    text: String,          // Actual lyric line
}],

});

module.exports= mongoose.model("Song",songSchema)