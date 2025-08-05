// room routes
const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room.controller');

router.get('/', roomController.getAllRooms);
router.post('/', roomController.createRoom);

module.exports = router;