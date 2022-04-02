const JOI = require('joi');

function errorHandler(err, _req, res, _next) {
  if (JOI.isError(err)) {
    const statusAndMessage = err.message.split('*');
    const status = Number(statusAndMessage[0]);
    const message = statusAndMessage[1];

    return res.status(status).json({ message });
  }
}

module.exports = errorHandler;
