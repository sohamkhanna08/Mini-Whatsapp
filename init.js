const mongoose = require('mongoose');
const Chat = require("./models/chat.js");

main()
.then((res)=>{
    console.log("connection successful")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {from: "neha",
    to: "priya",
    msg: "send exam sheets",
    created_at: new Date()},

    {from: "rahul",
        to: "sneha",
        msg: "how are u",
        created_at: new Date()},

    {from: "paul",
    to: "amanda",
    msg: "are you happy?",
    created_at: new Date()},

    {from: "mark",
        to: "don",
        msg: "hope you are fine",
        created_at: new Date()},

    {from: "smith",
    to: "steve",
    msg: "what is the time?",
    created_at: new Date()},
];

Chat.insertMany(allChats);