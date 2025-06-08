
const express = require('express');
const router = express.Router();
const db = require('./db'); 
const { authenticateToken } = require('./utilities/auth')

router.get('/',authenticateToken, (req,res)=>{
      const getStudentScoresQuery =  `SELECT subject_name, student_name, score 
 FROM students INNER JOIN
 test_scores ON students.student_id = test_scores.student_id;`
   
 db.query(getStudentScoresQuery, (err, result)=>{
    if(err){
       return res.status(500).json({ error: 'Database error' });
    }else{
         res.send(result)
    }
 })

})

module.exports = router

