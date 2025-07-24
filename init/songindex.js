const mongoose=require("mongoose");
const initdata=require("./song_data.js")
const Song=require("../models/song.js")

const MONGO_URL=process.env.MONGO_URL
main().then(()=>{
    console.log("connected to db")
}).catch((err)=>{
    console.log(err)
})

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB= async ( )=> {
    await Song.deleteMany({});
    await Song.insertMany(initdata.data);            

    console.log("data initialised")
 }

initDB();