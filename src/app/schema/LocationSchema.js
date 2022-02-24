const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const LocationSchema = mongoose.Schema(
  {
    id_user: {
      type: String,
      ref: 'People',
      required: true
    },
    data_inicio: {
      type: String,
      required: true
    },
    data_fim: {
      type: String,
      required: true
    },
    id_carro: {
      type: String,
      ref: 'Car',
      required: true
    },
    id_locadora: {
      type: String,
      ref: 'Locadora',
      required: true
    },
    valor_final: {
      type: Number,
      required: true
    },

    __v: { type: Number, select: false }
  },
  { versionKey: false }
);
LocationSchema.plugin(mongoosePaginate);

const Location = mongoose.model('Location', LocationSchema);
module.exports = Location;
