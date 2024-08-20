const mongoose = require('mongoose');
const RoomModel = require('../models/Room');

mongoose.connect('mongodb://127.0.0.1:27017/Guest', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to the database');

  
  const rooms = [];

  
  for (let i = 1; i <= 10; i++) {
    rooms.push({ id: i.toString(), block: 'single', price: 100, status: 'Available' });
  }

 
  for (let i = 11; i <= 25; i++) {
    rooms.push({ id: i.toString(), block: 'double', price: 150, status: 'Available' });
  }

  
  for (let i = 26; i <= 50; i++) {
    rooms.push({ id: i.toString(), block: 'triple', price: 200, status: 'Available' });
  }

  RoomModel.insertMany(rooms)
    .then(() => {
      console.log('Rooms inserted successfully');
      mongoose.connection.close();
    })
    .catch(err => {
      console.error('Error inserting rooms:', err);
      mongoose.connection.close();
    });
}).catch(err => {
  console.error('Error connecting to the database', err);
});
