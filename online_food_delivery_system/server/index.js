//import model
//import Post from './model/post.model.js';
const Post = require("./models/post.model.js")
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

const app =express();

app.use(cors());

const productRouter = require('./routes/ProductRouter')
var corOptions ={
    origin:"https://localhost:3000"
}


/**Post: https://localhost:3000/uploads*/
app.post("/feedback",async(req,res)=>{
    const body=req.body;
    try{
        const newImage=await Post.create(body)
        newImage.save();
        res.status(201).json({msg:"New image uploaded...!"})
    }
    catch(error){
        res.status(409).json({message: error.message})
    }
})


//app.use(cors(corOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
db.on('error',console.error.bind(console,"MongDB Connection error"))

app.get("/",(req,res)=>{
    try{
    res.json({message:"Welcome to Food Delivery System"});
    Post.find({}).then(data=>{
        res.json(data)
    }).catch(error=>{
        res.status(408).json({error})
    })
    }
    catch(error){
        res.json({error})
    }
});

const PORT = process.env.PORT||3001;
app.listen(PORT,()=>{
    console.log(`Server is running on Port ${PORT}`);
});

app.use('/api/',productRouter);
