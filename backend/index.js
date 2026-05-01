const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/Task');
const assistantRoutes = require('./routes/assistantRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/assistant', assistantRoutes);

app.get('/', (req, res) => res.send('LETAH Backend Running!'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/letahDB")
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Error:', err));

// Start server
app.listen(process.env.PORT || 5000, () => console.log(`Server running on ${process.env.PORT || 5000}`));