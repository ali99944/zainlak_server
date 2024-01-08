const dotenv = require('dotenv')
dotenv.config()

exports.port = process.env.PORT
exports.mongoose_connection_string = process.env.MONGODB_CONNECTION_STRING
exports.static_files_host = process.env.STATIC_FILES_HOST