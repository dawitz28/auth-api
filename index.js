'use strict';
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/food', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const server = require('./src/auth/server.js');

server.start(3000);