const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
  modelo: String,
  cor:String,
  ano:String,
  acessorios:[{descricao:{type:String,required:true},_id:false}],
  quantidadePassageiros:Number
});
const Car = mongoose.model('Car', CarSchema);
module.exports = Car;