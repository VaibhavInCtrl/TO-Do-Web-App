const express = require("express");

const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.listen(process.env.PORT || "3000", (req, res) => {
    console.log("Server up and running on port 3000");
})

app.set("view engine", "ejs");

app.use(express.static('Public'));

var inputs = ["What do you want to do today?"];

var worklist = ["What work do you have today?"]
app.get("/", (req, res) => {
    var date = new Date();
    var printer = "";
    var options = {
        weekday: "long",
        month: "long",
        day: "numeric"
    }
    printer = (date.toLocaleDateString('en', options));

    res.render("list", {
        printer: printer,
        inputs: inputs
    })
})

app.post("/", (req, res) => {
    var input = req.body.create;
    if (req.body.list === "Work"){
        worklist.push(input);
        res.redirect("/work");
    }
    else{
        inputs.push(input);
        res.redirect("/")
    }
    
})


app.get("/work", (req, res) => {
    res.render("list", {
        printer: "Work",
        inputs: worklist
    })
})