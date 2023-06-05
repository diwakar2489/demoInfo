const  { transports, createLogger, format } = require('winston');
const customeFormat = format.combine(format.timestamp(),format.printf((info) =>{
    return `${info.timestamp} - [${info.level.toUpperCase().padEnd(2)}] - ${info.message}`
}))
const logger = createLogger({
    format:customeFormat,
    transports:[
        new transports.Console({level:'silly'}),
        new transports.File({filename:'errorLogger.log',level:'info'})
    ]
});
module.exports = logger