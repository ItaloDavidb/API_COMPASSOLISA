const HttpError = require('./http');

class BadRequest extends HttpError {
  constructor({ details }) {
    super(400, 'Bad Request');

    this.name = 'Bad Request';
    this.body = { details };
  }
}

module.exports = BadRequest;
