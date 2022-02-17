class ConflictError extends Error {
  constructor(payload) {
    super();

    this.statusCode = 409;
    this.description = 'Conflict';
    this.message = `${payload} already in use`;
  }
}

module.exports = ConflictError;
