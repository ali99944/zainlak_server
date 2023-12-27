const mongoose = require('mongoose')
const uri = 'mongodb://127.0.0.1:27017/technicians'; // Replace with your MongoDB connection URI


mongoose.connect(uri).then(() => console.log('connected mongoose'))
