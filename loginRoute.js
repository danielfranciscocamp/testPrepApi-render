const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const db = require('./db');
const {secret} = require('./utilities/auth')

router.post('/', (req, res) => {
       const available = ['student', 'admin']
       const{role} = req.body
        
       // Safelist roles to avoid SQL injection
       if (!available.includes(role)) {
        return res.status(400).json({ error: 'Invalid role' });
        }
       
       const { name, email, password } = req.body.form;
       const table = `${role}_table`
       
       
       const sql = `SELECT * FROM ${table} WHERE email = ? AND ${role}_password = ?;`
       
       db.query(sql, [email, password], (err, results) => {
              if (err) {
              return res.status(401).json({ message: 'Invalid credentials' });
              }
              const username = results?.[0]?.[`${role}_name`];
              const token = jwt.sign({ username }, secret, { expiresIn: '1h' });
              res.json({ token, username });
       });
});


module.exports = router;

