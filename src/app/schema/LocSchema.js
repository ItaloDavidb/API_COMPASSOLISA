const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const LocSchema = mongoose.Schema({
  nome: {
    type:String,
    required:true
  },
  cnpj:{
    type:String,
    required:true
  },
  atividades:{
    type:String,
    required:true
  },
  endereco:[{
    cep:{
      type:String,
      required:true
    },
    number:{
      type:Number,
      required:true,
    },
    isFilial:{
      type:Boolean,
      required:true,
      default:false
    }
  }],
  __v: { type: Number, select: false}
  
},{ versionKey: false });
LocSchema.plugin(mongoosePaginate);

const Car = mongoose.model('Locadora', LocSchema);
module.exports = Car;