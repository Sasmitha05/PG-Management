const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const GuestModel = require('./models/Guest');
const BookingModel = require('./models/Booking');
const RoomModel = require('./models/Room');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/Guest', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to the database');
})
.catch(err => {
  console.error('Error connecting to the database', err);
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    if ((username === 'Sreeleka' && password === 'sreeleka11') || (username === 'Sasmitha' && password === 'sasmitha05')) {
      return res.json('Admin Success');
    }

    const user = await GuestModel.findOne({ username });

    if (user) {
      if (user.password === password) {
        res.json('Success');
      } else {
        res.json('Wrong Password');
      }
    } else {
      res.json('User Not Found');
    }
  } catch (err) {
    res.status(500).json('Server Error');
  }
});

app.post('/signup', async (req, res) => {
  try {
    const guest = await GuestModel.create(req.body);
    res.json(guest);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post('/api/bookings', async (req, res) => {
  const bookingData = req.body;
  const { category } = bookingData;

  if (!bookingData.name || !bookingData.contact || !bookingData.email || !category) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const room = await RoomModel.findOneAndUpdate(
      { block: category, status: 'Available' },
      { status: 'Occupied' },
      { new: true }
    );

    if (room) {
      bookingData.roomId = room._id;
      const booking = await BookingModel.create(bookingData);
      res.status(201).json(booking);
    } else {
      res.status(400).json({ message: 'No available rooms in this category' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/bookings/:id', async (req, res) => {
  try {
    const booking = await BookingModel.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await RoomModel.findByIdAndUpdate(booking.roomId, { status: 'Available' });
    await booking.remove();

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await BookingModel.find().populate('roomId');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/rooms', async (req, res) => {
  try {
    const rooms = await RoomModel.find();
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
