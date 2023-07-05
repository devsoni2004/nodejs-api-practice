const mongoose = require('mongoose')

const Connection = mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1/test")


module.exports={
    Connection
}