const Room = require('../models/room.model');

// get rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ timestamp: -1 });
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// create room
exports.createRoom = async (req, res) => {
  try {
    const { roomName } = req.body;
    if (!roomName) {
      return res.status(400).json({ msg: 'Please enter a room name.' });
    }
    const existingRoom = await Room.findOne({ roomName });
    if (existingRoom) {
      return res.status(400).json({ msg: 'Room with that name already exists.' });
    }
    const newRoom = new Room({ roomName });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};