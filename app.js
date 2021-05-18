const { create } = require("domain");
const express = require("express");
const https = require("https");
const app = express();
app.use(express.urlencoded({extended:true}))
app.listen("3000",(req,res)=>{
    console.log("Server up and running on port 3000");
})
app.set("view engine","ejs");
var inputs = ["What do you want to do today?"];
app.post("/",(req,res)=>{
    var input = req.body.create;
    inputs.push(input);
    res.redirect("/")
})

app.get("/",(req,res)=>{
    var date = new Date();
    var printer = "";
    var options = {
        weekday: "long",
        year: "numeric",
        month: "long"
    } 
    printer = (date.toLocaleDateString('en', options));
    console.log(printer);
    res.render("list",{
        printer:printer,
        inputs:inputs
    }
    )
})
app.use(express.static('public'))