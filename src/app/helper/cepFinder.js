const axios = require('axios');

class CepFinder {
  async finder(cep) {
    const result = await axios.get(`https://viacep.com.br/ws/${cep}/json`);
    return result.data;
  }
}
module.exports = new CepFinder();
