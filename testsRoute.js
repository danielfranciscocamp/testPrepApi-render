
const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/:subject', (req, res) => {
  // Get the subject from the URL parameter and convert it to lowercase
  const test = req.params.subject.toLowerCase()
    
  // Query the database using the subject as the table name
  db.query(`SELECT * FROM ??`,[test], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Query failed', details: err });
    }
    res.json(results);
  });
});

module.exports = router;

