const { Schema, model, Types } = require("mongoose");

const bookingSchema = new Schema({
  user:{type: Types.ObjectId,ref: 'user', required: true},
  tour: {type: Types.ObjectId,ref: 'tour',required: true},
  capacity: {type: Number,default: 20},
  reservationDate: {type: Date,default: Date.now},
  status: {type: String,enum: ['pending', 'paid', 'cancelled'],default: 'pending'},
  paymentStatus: {type: Boolean, default: false}
  
});

const Bookingmodel = model('booking', bookingSchema);

module.exports = Bookingmodel;
