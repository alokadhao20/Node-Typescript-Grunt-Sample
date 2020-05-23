const dotenv = require('dotenv');
dotenv.config();

let mongoIP = process.env.MONGO_IP
let mongoPORT = process.env.MONGO_PORT
let mongoURL = mongoIP+':'+mongoPORT;
if(mongoIP == null) {
    throw new Error("mongoIP is null =",mongoIP);
}
if(mongoPORT == null) {
    throw new Error("mongoPORT is null =",mongoPORT);
}

console.log("MongoURL - ", mongoURL);

let config = {
  "PORT": 9095,
  "mongodb": {
    "url": "mongodb://"+ mongoURL,
    "userCollection": "user",
    "dbName": "test01"
  }
}


exports.config = config;
// module.exports = config;