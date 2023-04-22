const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://hayagreevan:hayagreevan@cluster0.sjx3gfu.mongodb.net/ofds?retryWrites=true&w=majority',{useNewUrlParser: true}).catch(e =>
{
    console.error('Connection Error',e.message)
})

const db = mongoose.connection
module.exports =db
