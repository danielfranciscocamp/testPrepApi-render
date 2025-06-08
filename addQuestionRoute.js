const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/',(req,res)=>{
     const available = ['biology', 'math', 'chemistry', 'history']
     const{subject} = req.body
      
     const lowerCaseSubject = subject.toLowerCase()
     console.log(lowerCaseSubject)
    //    Safelist roles to avoid SQL injection
       if (!available.includes(lowerCaseSubject)) {
        return res.status(400).json({ error: 'Invalid role' });
        }

    const table = `${lowerCaseSubject}_test`
     const {question, option_a, option_b, option_c, option_d, correct_answer} = req.body.newQuestion;
      
    const sql = `
        INSERT INTO ${table} (question, option_a, option_b, option_c, option_d, correct_answer)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [question, option_a, option_b, option_c, option_d, correct_answer], (err, result) => {
        if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ error: 'Failed to insert item' });
        }

        res.status(200).json({ message: 'item added successfully', insertId: result.insertId });
    });

})

module.exports = router