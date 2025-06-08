const express = require('express');
const router = express.Router();
const db = require('./db');

router.delete('/', (req, res)=>{
    const available = ['biology', 'math', 'chemistry', 'history']
     const{subject} = req.body
      
     const lowerCaseSubject = subject.toLowerCase()
     
    //    Safelist roles to avoid SQL injection
       if (!available.includes(lowerCaseSubject)) {
        return res.status(400).json({ error: 'Invalid role' });
        }

    const table = `${lowerCaseSubject}_test`
    const {id} = req.body.updatedQuestion;
      
    const sql = `DELETE FROM ${table} WHERE id = ?;
    `;
    db.query(sql, [id], (err, result) => {
        if (err) {
        console.error('Error deleting data:', err);
        return res.status(500).json({ error: 'Failed to delete item' });
        }

        res.status(200).json({ message: 'item deleted successfully', insertId: result.insertId });
    });

})

module.exports = router