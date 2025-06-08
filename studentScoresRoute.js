const express = require('express');
const router = express.Router();
const db = require('./db'); 

// Endpoint to add a test score for a student
router.post('/', (req, res) => {
  // Define valid subjects
  const available = ['math', 'biology', 'chemistry', 'history'];
  const { user, score, subject } = req.body; 

  // Validate subject
  if (!available.includes(subject)) {
    return res.status(400).json({ error: 'Invalid subject' });
  }

  // Insert a new student; uses parameterized query to prevent SQL injection
  const insertStudent = `INSERT INTO students (student_name) VALUES (?)`;
  
  db.query(insertStudent, [user], (err, result) => {
    if (err) {
      console.error('Error inserting student:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    // retrieve the newly inserted student's ID
    const getStudentId = `SELECT student_id FROM students WHERE student_name = ?`;

    db.query(getStudentId, [user], (err, result) => {
      if (err) {
        console.error('Error fetching student ID:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      // Ensure student exists
      if (result.length === 0) {
        return res.status(404).json({ error: 'Student not found' });
      }

      
      // Insert the test score for the student
      const insertScore = `INSERT INTO test_scores (subject_name, score, student_id) VALUES (?, ?, ?)`;
      
      result.map(studentIdArr=>{
          const studentId = studentIdArr.student_id
          db.query(insertScore, [ subject, score, studentId,], (err, result) => {
          if (err) {
            console.error('Error inserting score:', err);
            return res.status(500).json({ error: 'Database error' });
          }
        });
        })
      
    });
  });
});

module.exports = router;

