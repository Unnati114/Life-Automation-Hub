const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const userRoute = require('./routes/user');
app.use('/api/users', userRoute);


app.get('/', (req, res) => res.send('LETAH Backend Running!'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Start server
app.listen(process.env.PORT || 5000, () => console.log(`Server running on ${process.env.PORT || 5000}`));