require("dotenv").config();
const http = require("http");
const createError = require('http-errors');
const express = require("express");
const cors = require('cors');
const app = express();
const logger = require("./utils/errors/Logger")
const config = require('./config/Environment');
//console.log(config);return false;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  app.use(function(req, res, next)  {
    logger.info(req.body);
    let oldSend = res.send;
    res.send = function (data) {
      //console.log(data);return false;
      logger.info(data);
      oldSend.apply(res, arguments);
    }
    next();
  })
const authRouter = require("./api/login/login_router");


const apiErrorHandler = require('./utils/errors/api-error-handler');
const ApiError = require('./utils/errors/ApiError');

app.use("/api/login", authRouter);

app.use('*',(req, res, next) => {
  const error = next(ApiError.notFound(`URL Not found`,404));
  next(error);
});

// error handler middleware
app.use(apiErrorHandler);

const server = http.createServer(app);

var httpPORT = config.httpPORT
server.listen(httpPORT, () => {
    console.log('Server is listening on port: ' + httpPORT + ' in ' + config.envName + ' environment');
})