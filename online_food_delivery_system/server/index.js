const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

const app =express();

var corOptions ={
    origin:"https://localhost:3000"
}

app.use(cors(corOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
db.on('error',console.error.bind(console,"MongDB Connection error"))

app.get("/",(req,res)=>{
    res.json({message:"Welcome to Food Delivery System"});
});

const PORT = process.env.PORT||3001;
app.listen(PORT,()=>{
    console.log('Server is running on Port ${PORT}')
});

