const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  id: { 
    type: String, 
    unique: true, 
    required: true 
  },
  block: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true, 
    min: [0, 'Price must be a positive number'] 
  },
  status: { 
    type: String, 
    enum: ['Available', 'Occupied'], 
    default: 'Available', 
    required: true 
  },
});


const RoomModel = mongoose.model('Room', roomSchema);

module.exports = RoomModel;
