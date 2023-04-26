//const mongoose = require('mongoose')

const postSchema = require('mongoose').Schema({
    myFile:String
});

module.exports= require('mongoose').model('post',postSchema)

