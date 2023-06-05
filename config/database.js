// const log4js = require("log4js");
// log4js.configure({
//   appenders: { databaseConnection: { type: "file", filename: "errorLogger.log" } },
//   categories: { default: { appenders: ["databaseConnection"], level: "error" } },
// });

//const logger = log4js.getLogger("databaseConnection");
const Logger = require("../utils/errors/Logger")
module.exports = function () {
   
   let mysql = require("mysql");
   let connection = mysql.createConnection({
      // port: process.env.DB_PORT,
      // host: process.env.DB_HOST,
      // user: process.env.DB_USER,
      // password: process.env.DB_PASS,
      // database: process.env.MYSQL_DB
      port: '3306',
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'info_hub'
   });
   
   connection.connect((err) => {
      if (err) {
         console.log(`connectionRequest Failed ${err.stack}`)
         Logger.error(`connectionRequest Failed ${err.stack}`);
      } else {
         console.log(`DB connectionRequest Successful ${connection.threadId}`)
         Logger.info(`DB connectionRequest Successful ${connection.threadId}`);
      }
   });
   return connection;
}