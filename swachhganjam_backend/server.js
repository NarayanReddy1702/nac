const express = require('express');
const dotenv = require('dotenv');
const db = require('./models');
const authRoutes = require('./routes/auth');
const citizenRoutes = require('./routes/citizen');
const supervisorRoutes = require('./routes/supervisor');
const adminRoutes = require('./routes/admin');
const path = require('path');
const cors = require("cors")

dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true
}));


app.use(express.json({ limit: '10mb' }));

db.sequelize.sync({ alter: false })
  .then(() => {
    console.log('Database synced without altering');
  })
  .catch((err) => {
    console.log('Error syncing database:', err);
  });

const uploadDirectory = path.join('D:', 'Solid Waste Management', 'complaint-system', 'uploads');
app.use('/uploads', express.static(uploadDirectory));

app.use('/api/auth', authRoutes);
app.use('/api/citizen', citizenRoutes);
app.use('/api/supervisor', supervisorRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
