
const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/',(req,res)=>{
       const available = ['student', 'admin']
       const{role} = req.body

       // Safelist roles to avoid SQL injection
       if (!available.includes(role)) {
        return res.status(400).json({ error: 'Invalid role' });
        }
       const table = `${role}_table`
        const { name, email, password } = req.body.form;

    const sql = `
        INSERT INTO ${table} (${role}_name, email, ${role}_password)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ error: 'Failed to insert admin' });
        }

        res.status(200).json({ message: 'Admin added successfully', insertId: result.insertId });
    });
    
});

module.exports = router

