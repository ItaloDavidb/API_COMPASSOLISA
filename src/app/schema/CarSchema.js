const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const CarSchema = mongoose.Schema({
  modelo: {
    type:String,
    required:true
  },
  cor:{
    type:String,
    required:true
  },
  ano:{
    type:String,
    required:true
  },
  acessorios:[{
    descricao:{
      type:String,
      required:true
    }
  }],
  quantidadePassageiros:{
    type:Number,
    required:true
  },
  __v: { type: Number, select: false}
  
},{ versionKey: false });
CarSchema.plugin(mongoosePaginate);

const Car = mongoose.model('Car', CarSchema);
module.exports = Car;