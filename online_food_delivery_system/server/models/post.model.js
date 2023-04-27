//const mongoose = require('mongoose')

const postSchema = new require('mongoose').Schema({
    myfile: {type:String, required:true}
})

module.exports= require('mongoose').models.posts || require('mongoose').model('post',postSchema)

