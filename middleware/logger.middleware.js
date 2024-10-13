// const fs = require('fs');
// const path = require('path');

// function logRequest(req, res, next) {
//   const timestamp = new Date().toISOString();
//   const logMessage = `[${timestamp}] ${req.method} ${req.url}\n`;
  
//   fs.appendFile(path.join(__dirname, '../logs/requests.log'), logMessage, (err) => {
//     if (err) {
//       console.error('Error writing to log file:', err);
//     }
//   });
  
//   next();
// }

// module.exports = logRequest;