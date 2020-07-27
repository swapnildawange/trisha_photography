const express = require("express");
const body_parser = require("body-parser");
const mongoose = require("mongoose");

const { log } = require("console");
const { strict } = require("assert");

const app = express();
app.use(express.static("public"));
app.use(body_parser.urlencoded({ extended: true }));

//connect to database
mongoose.connect("mongodb://localhost:27017/trisha", { useNewUrlParser: true });

//crete database schema
const clientSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [1, "Please type First Name"],
  },
  last_name: {
    type: String,
    required: [1, "Please type Last Name"],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
  },
  date: {
    type: String,
  },
  mobile: {
    type: Number,
    minlength: 10,
    maxlength: 10,
  },
});

//create client

const Client = new mongoose.model("Client", clientSchema);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.get("/contact", function (req, res) {
  res.sendFile(__dirname + "/contact.html");
});

app.post("/", function (req, res) {
  const first_name = req.body.fname;
  const last_name = req.body.lname;
  const email = req.body.email;
  const date = req.body.date;
  const mobile = req.body.mobile;

  const client = new Client({
    first_name: first_name,
    last_name: last_name,
    email: email,
    date: date,
    mobile: mobile,
  });

  client.save();
  // console.log(req.body);

  res.redirect("/contact");
});

app.listen(5000, function () {
  console.log("server is running on port 5000");
});
