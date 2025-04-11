const winston = require("winston");
const expressWinston = require("express-winston");

module.exports=error =>(expressWinston.errorLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
}))
