const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const PeopleSchema = mongoose.Schema({
  nome: {
    type:String,
    required:true
  },
  cpf:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true
  },
  senha:{
    type:String,
    required:true
  },
  habilitado:{
    type:String,
    enum:['sim','não']
  },
},{ versionKey: false });
PeopleSchema.plugin(mongoosePaginate);
const People = mongoose.model('People', PeopleSchema);
module.exports = People;
