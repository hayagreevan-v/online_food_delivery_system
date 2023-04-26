//const mongoose = require('mongoose')

const postSchema = new require('mongoose').Schema({
    myFile:String
})

module.exports= require('mongoose').models.posts || require('mongoose').model('post',postSchema)

