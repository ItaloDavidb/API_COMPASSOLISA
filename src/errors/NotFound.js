class NotFound extends Error {
  constructor(service) {
    super(`${service} not found`);
    this.name = 'NotFound';
  }
}

module.exports = NotFound;