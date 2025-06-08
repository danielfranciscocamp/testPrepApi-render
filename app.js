const express = require('express');
const app = express();
const PORT = 3000;

const cors = require('cors');

app.use(express.json());

app.use(cors())

// Route modules
const testsRoute = require('./testsRoute');
const createUserRouter = require('./createUserRoute');
const loginRoute = require('./loginRoute');
const addQuestionRouter = require('./addQuestionRoute');
const updateQuestionRouter = require('./updateQuestionRoute');
const deleteQuestionRouter = require('./deleteQuestionRoute');
const studentScoresRouter = require('./studentScoresRoute');
const getStudentScores = require('./getStudentScores')

// Mount routes
app.use('/tests', testsRoute);
app.use('/users', createUserRouter); // POST /users
app.use('/login', loginRoute);      // POST /login
app.use('/questions', addQuestionRouter);         // POST /questions
app.use('/questions', updateQuestionRouter);      // PUT /questions/:id
app.use('/questions', deleteQuestionRouter);      // DELETE /questions/:id
app.use('/studentScores', studentScoresRouter);  // POST /student scores
app.use('/studentScores', getStudentScores); // GET /student scores

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
