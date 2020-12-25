const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database ==>
connectDB();
// Middleware ==>
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routers ==>
app.use('/users', require('./routes/api/users'));
app.use('/auth', require('./routes/api/auth'));
app.use('/pets', require('./routes/api/pets'));

app.listen(PORT, () => {
	console.log(`Server on http://localhost:${PORT}`);
});
