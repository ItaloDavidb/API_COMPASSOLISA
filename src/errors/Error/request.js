const HttpError = require('./http');

class BadRequest extends HttpError {
  constructor(payload) {
    super();

    this.statusCode = 400;
    this.description = 'Bad Request';
    this.message = `${payload}`;
  }
}

module.exports = BadRequest;
