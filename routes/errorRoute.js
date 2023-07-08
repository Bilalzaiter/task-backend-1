const express = require('express');
const router = express.Router();
const path = require('path')

router.get("*",(req, res, next) => {
    res.status(404);
    
    // Respond with HTML
    if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, '../public', '404.html'));
      console.log(__dirname)
      return;
    }
    
    // Respond with JSON
    if (req.accepts('json')) {
      res.json({ error: 'Not found' });
      return;
    }
    
    // Respond with plain text
    if (req.accepts('text')) {
      res.send('Not found');
      return;
    }
    
    // Default response for other types
    res.type('txt').send('Not found');
    next()
  })

module.exports = router