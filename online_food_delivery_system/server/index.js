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

const connect = require("./db/conn.js")
app.use(express.json());




//app.use(cors(corOptions));
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb',extended: true}));
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
})

/**Post: https://localhost:3001/feedback */
app.post("/feedback",async(req,res)=>{
    //const body=req.body;
    const { name, review, myfile } = req.body;
    //console.log(req.body);
    try{
        //const newImage=await Post.create(body)
        //newImage.save().then().catch(e => console.log(e));
        //const newPost = await Post.create({ name, review, myfile });
        const newPost = await Post.create({ name, review, myfile });
        newPost.save().then().catch(e => console.log(e));
        res.status(201).json({msg:"New image uploaded...!"});
    }
    catch(error){
        console.log(error);
        res.status(409).json({message: error.message});
    }
})

const PORT = process.env.PORT||3001;
app.listen(PORT,()=>{
    console.log(`Server is running on Port ${PORT}`);
});
/*
connect().then(() => {
    try{
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        })
    }catch(error){
        console.log("Can't connect to the server");
    }
}).catch((error) => {
    console.log("Invalid Database Connection...!")
})
*/
app.use('/api/',productRouter);
