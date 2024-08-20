const mongoose = require('mongoose');
const RoomModel = require('./Room'); 

const bookingSchema = new mongoose.Schema({
  name: String,
  contact: String,
  email: String,
  maritalStatus: String,
  guardianName: String,
  guardianContact: String,
  address: String,
  checkInDate: Date,
  checkOutDate: Date,
  foodPreference: String,
  category: String,
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' }, 
});


bookingSchema.pre('remove', async function (next) {
  try {
    const room = await RoomModel.findById(this.roomId);
    if (room) {
      room.status = 'Available';
      await room.save();
    }
    next();
  } catch (err) {
    next(err);
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
