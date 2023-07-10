const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true) // no error and the request or the origin is allowed to send request to this api
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}

module.exports = corsOptions