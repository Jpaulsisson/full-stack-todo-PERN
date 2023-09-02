const express = require('express');
const app = express();
const cors = require("cors");
const port = 4000;
const pool = require('./db').pool;


//middleware
app.use(cors());
app.use(express.json()); // <-- req.body

// ROUTES //

// Create todo //
app.post('/todos', async (req, res) => {
  try {
    const { content, completed } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todos (content, completed) VALUES ($1, $2) RETURNING *", [content, completed]);
    res.json(newTodo);
  }
  catch(err) {
    console.error(err.message);
  }
})

// Get all todos //
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todos');
    res.json(allTodos.rows);
  } 
  catch (err) {
    console.error(err.message);
  }
})

// Get one todo //
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const allTodos = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);
    res.json(allTodos.rows);
  } 
  catch (err) {
    console.error(err.message);
  }
})

// Edit a todo by ID //
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todos SET description = $1 WHERE id = $2", [description, id]);

    res.json('todo updated')
  } 
  catch (err) {
    console.error(err.message);
  }
})


// Delete a todo by ID //
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const toBeDeleted = pool.query("DELETE FROM todos WHERE id = $1", [id]);
  } 
  catch (err) {
    console.error(err.message);  
  }
})

app.listen(port, () => {
  console.log(`server is up and running on port: ${port}`)
});