const HttpError = require('./http');

class NotFound extends HttpError {
  constructor(payload) {
    super();

    this.statusCode = 404;
    this.description = 'Not Found';
    this.message = `${payload} was not found`;
  }
}

module.exports = NotFound;
