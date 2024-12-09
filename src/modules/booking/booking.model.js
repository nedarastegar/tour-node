const { Schema, model, Types } = require("mongoose");

const bookingSchema = new Schema({
  user:{type: Types.ObjectId,ref: 'user', required: false},
  tour: {type: Types.ObjectId,ref: 'tour',required: false},
  capacity: {type: Number,default: 20},
  reservationDate: {type: Date,default: Date.now},
  status: {type: String,enum: ['pending', 'paid', 'cancelled'],default: 'pending'},
  paymentStatus: {type: Boolean, default: false}
  
});

const Bookingmodel = model('booking', bookingSchema);

module.exports = Bookingmodel;
