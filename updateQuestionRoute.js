
const express = require('express');
const router = express.Router();
const db = require('./db');

router.put('/',(req, res)=>{
    const available = ['biology', 'math', 'chemistry', 'history']
     const{subject} = req.body
      
     const lowerCaseSubject = subject.toLowerCase()
     
    //    Safelist roles to avoid SQL injection
       if (!available.includes(lowerCaseSubject)) {
        return res.status(400).json({ error: 'Invalid role' });
        }

    const table = `${lowerCaseSubject}_test`
    const {question, option_a, option_b, option_c, option_d, correct_answer, id} = req.body.updatedQuestion;
      console.log(id)
    const sql = `UPDATE ${table}
SET question = ?, option_a = ?, option_b = ?, option_c = ?, option_d = ?, correct_answer = ?
WHERE id = ?;
`;

    db.query(sql, [question, option_a, option_b, option_c, option_d, correct_answer, id], (err, result) => {
        if (err) {
        console.error('Error updating data:', err);
        return res.status(500).json({ error: 'Failed to update item' });
        }

        res.status(200).json({ message: 'item updated successfully', insertId: result.insertId });
    });

})

module.exports = router

