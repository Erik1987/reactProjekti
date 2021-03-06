const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db");
const jwt = require('jsonwebtoken');
const { expressjwt: exjwt } = require("express-jwt");
const Helper = require('./helper.js')
const User = require('./User.js')
const PORT = process.env.PORT || 5000;
const path = require('path')
// middleware
app.use(cors());
app.use(express.json()); 

if(process.env.NODE_ENV === "production") {
    // client/build
    app.use(express.static(path.join(__dirname, "build")))
}

const JWTSECRET = 'mango on hyvaa';
const jwtMW = exjwt({
    secret: JWTSECRET,
    algorithms: ["HS256"],
});

const user = 
    {
        id: 1,
        email: 'test@home.fi',
        password: 'abc123'
    };
 
// LOGIN ROUTE
app.post('/login', User.login);
  

app.post("/todos", jwtMW, async(req, res) => {
    try {
        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", 
        [description]
        );

        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})
app.get("/todos", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message)
        
    }
});
app.get("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0])
    } catch (err) {
        console.error(err.message);
    }
});

app.put("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.json("Todo was updated!")
    } catch (err) {
        console.error(err.message);
    }
});
app.delete("/todos/:id", jwtMW, async(req, res) => {
    try {
        const {id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Todo was deleted!");
    } catch (err) {
        console.error(err.message);
    }
})

app.post('/signup', User.create);

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });

app.listen(PORT, () => {

    console.log(`Server has started in port ${PORT}`);
});