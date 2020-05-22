// import express from 'express';
import express = require('express');
import {config} from '../config/config.js';
import { Mongodb } from "./common/mongodb/mongodb";
import { UserRouter } from "./routers/userRouter";
const app = express();
const port = config.PORT;

const allowCrossDomain = (req:any, res:any, next:any) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', "Content-Type, authorization");
  next();
}

const mongo = new Mongodb(config.mongodb.url,config.mongodb.dbName);

app.use( (req, res, next) => {
  res.locals.mongo = mongo
  next()
})

const userRouter = new UserRouter();
app.use("/api/v1/user/", userRouter.userRoute);

async function main() {
  try {
    await mongo.init();
    // Start server
    app.listen(config.PORT, async () => {
      console.log(`Server is listning in port ${config.PORT}`);
    });
  } catch (er) {
    console.log("error:" + er);
    return er;
  }
}

main();

