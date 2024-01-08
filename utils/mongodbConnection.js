const mongoose = require('mongoose');
const { mongoose_connection_string } = require('../configs');
const uri = mongoose_connection_string;


mongoose.connect(uri).then(() => console.log('connected mongoose'))
