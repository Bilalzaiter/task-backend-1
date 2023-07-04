const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const errorRoutes = require('./routes/errorRoute')
const app = express()
const path = require('path');
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/lec-2')

app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json())
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle 404 errors
app.use(errorRoutes);

app.listen(3000, () => {
    console.log('listen on port @ http://localhost:3000')
})