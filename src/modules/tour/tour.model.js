const { Schema, model } = require("mongoose");

const tourSchema = new Schema({
  nameTour:{type: String,required: true},
  origin: { type: String, required: true},
  destination: {type: String,required: true},
  departureDate: {type: Date,required: true},
  Returndate:{type: Date,required: true},
  price: { type: Number },
  Seatsavalable: {type: Number},
  booked: { type: Number, default: 0 }, // تعداد رزروهای انجام شده
  Transportation: { type: String }
  
});

const Tourmodel = model('tour', tourSchema);

module.exports = Tourmodel;
