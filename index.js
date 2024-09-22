const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views",path.join(__dirname,"views")); //tells vs code to look into dirname of index.js/views to look for ejs files
app.set("view engine","ejs"); //sets the engine which serves the ejs files
app.use(express.static(path.join(__dirname,"public"))); //tells express to take static files from this folder
app.use(express.urlencoded({extended:true})); //parsing data from a post request
app.use(methodOverride("_method")); //this allows form to send PUT/DELETE requests too, usually form can only handle GET/POST request

main()
.then((res)=>{
    console.log("connection successful")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//Index Route
app.get("/chats",async (req,res)=>{
    let chats = await Chat.find();
    res.render("index.ejs", {chats});
})

//New Route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})

//Create Route
app.post("/chats",(req,res)=>{
    let {from,msg,to} = req.body;
    let newchat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    })
    
    newchat.save().then((res)=> console.log("chat was saved")).catch((err)=>console.log(err));
    res.redirect("/chats")
})

//Edit Route
app.get("/chats/:id/edit",async (req,res) => {
    let {id} = req.params;
    let editChat = await Chat.findById(id);
    res.render("edit.ejs", {editChat});
})

//Update Route
app.put("/chats/:id", async (req,res) => {
   let {msg}=req.body;
   let {id} = req.params;
   let updatedChat = await Chat.findByIdAndUpdate(id, {msg :msg, updated_at:new Date()}, {runValidators:true});
   res.redirect("/chats");
})

//Delete Route
app.delete("/chats/:id", async (req,res) => {
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
 })

//Home Route
app.get("/", (req,res) => {
    res.send("root is working");
})

port = 8080;

app.listen(port,() =>{
    console.log("server is listening on", port);
})