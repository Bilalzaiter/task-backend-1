require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const errorRoutes = require('./routes/errorRoute')
const app = express()
const path = require('path');
const mongoose = require('mongoose')
const RootRoute = require('./routes/root')
const getLogger = require("./middleware/logger");
const logger = getLogger("server");
const loggerDb = getLogger('database');
logger.info("Test on server file");

const connectDb = async () =>{
    try {
        await mongoose.connect(process.env.DB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        })
    } catch (error) {
        console.error(error.message)
    }
}
connectDb()
app.use(cookieParser());
app.use(morgan());
app.use(express.json());
const whitelist = ['*','http://localhost:3000', 'http://example2.com'];
app.use(cors(corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  }))


// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/',cors(corsOptions), RootRoute)

// Handle 404 errors
app.use(errorRoutes);

// Event handler for successful connection
mongoose.connection.on('connected', () => {
  console.log('Connected to Database');
  loggerDb.info('Connected to Database');
});

// Event handler for disconnections
mongoose.connection.on('disconnected', () => {
  console.log('Database Disconnected');
  loggerDb.error('Database Disconnected');
});

// Event handler for reconnections
mongoose.connection.on('reconnected', () => {
  console.log('Database Reconnected');
  loggerDb.info('Database Reconnected');
});

// Event handler for connection errors
mongoose.connection.on('error', (error) => {
  console.log('Database Connection Error:', error);
  loggerDb.error(`Database Connection Error: ${error.message}`);
});

app.listen(3000, () => {
    console.log('listen on port @ http://localhost:3000')
    
})