const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const youtubeSongSchema = new Schema({
//   title: String,
//   artist: String,
//   coverUrl: String,
//   audioUrl: String,
//   year: String,
// });

const playlistSchema = new Schema({
  name: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  songs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
});


module.exports = mongoose.model("Playlist", playlistSchema);

