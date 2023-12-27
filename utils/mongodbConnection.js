const mongoose = require('mongoose')
const uri = process.env.MONGODB_CONNECTION_STRING; // Replace with your MongoDB connection URI


mongoose.connect(uri).then(() => console.log('connected mongoose'))
