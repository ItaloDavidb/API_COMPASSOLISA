const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const ENUM = require('../helper/ENUM');
const bcrypt = require('bcrypt');
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
    required:true,
    select:false
  },
  habilitado:{
    type:String,
    enum: ENUM.habilitado
  },
  __v: { type: Number, select: false}
},{ versionKey: false });
PeopleSchema.pre('save',async function(next){
  const hash = await bcrypt.hash(this.senha,10);
  this.senha= hash;
  next();
});
PeopleSchema.plugin(mongoosePaginate);
const People = mongoose.model('People', PeopleSchema);
module.exports = People;
