
const express = require('express');
const pool = require('./database');
const cors = require('cors')

const port = process.env.PORT || 3000;
const app = express();


app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});


app.get('/api/courses', async(req, res) => {
    try {
        console.log("A GET all request has arrived");
        const course = await pool.query(
            "SELECT * FROM courses"
        );
        res.json(course.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/api/courses/:id', async(req, res) => {
    try {
        console.log("A GET request for a specific course has arrived");
        const { id } = req.params;
        const course = await pool.query("SELECT * FROM courses WHERE id = $1", [id]);
        if (course.rows.length === 0) {
            return res.status(404).send('Course not found');
        }
        res.json(course.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

app.put('/api/courses/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { studentsnumbers, groupsnumbers, description } = req.body;
        const updateCourse = await pool.query(
            "UPDATE courses SET studentsnumbers = $1, groupsnumbers = $2, description = $3 WHERE id = $4",
            [studentsnumbers, groupsnumbers, description, id]
        );
        res.json('Course was updated successfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

