const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const contentRoutes = require('./routes/contentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Test database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('MySQL Connected...');
    connection.release();
  }
});

app.use('/api/users', userRoutes);
app.use('/api/content', contentRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
