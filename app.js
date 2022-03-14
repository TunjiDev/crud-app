const express = require("express");
const app = express();
const pool = require('./server');
const morgan = require('morgan');
const moment = require('moment');
// const dotenv = require("dotenv");
// dotenv.config({ path: './config.env' });

const port = process.env.PORT || 9292;

app.use(express.json());
// if (process.env.NODE_ENV === 'development') {
//     app.use(morgan('dev'));
// }

//GET ALL 
app.get('/', (req, res) => {
    try {
        res.status(200).json({
            status: 'success',
            message: 'Welcome to my postgreSQL CRUD app.'
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
            error
        });
    }
});

app.get('/person', async(req, res) => {
    try {
        const persons = await pool.query('SELECT * FROM person');
        console.log(moment(new Date()));
        
        res.status(200).json({
            status: 'success',
            results: persons.rows.length,
            persons: persons.rows
        });
    } catch (error) {
        console.error(error.message, error);
        res.status(400).json({
            status: 'fail',
            message: error.message,
            error
        });
    }
});

// GET ONE
app.get('/person/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const person = await pool.query(
            'SELECT * FROM person WHERE id = $1', 
            [id]
        );

        res.status(200).json({
            status: 'success',
            person: person.rows[0]
        });
    } catch (error) {
        console.error(error.message, error);
        res.status(400).json({
            status: 'fail',
            message: error.message,
            error
        });
    }
});


// CREATE ONE
app.post('/person', async(req, res) => {
    try {
        const { first_name, last_name, gender, date_of_birth, email } = req.body;

        const newPerson = await pool.query(
            'INSERT INTO person (first_name, last_name, gender, date_of_birth, email) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [first_name, last_name, gender, date_of_birth, email]
            );

        res.status(201).json({
            status: 'success',
            message: 'New person created!',
            newPerson: newPerson.rows[0]
        });
    } catch (error) {
        console.log(error.message, error);
        res.status(400).json({
            status: 'fail',
            message: error.message,
            error
        });
    }
});

// UPDATE
app.put('/person/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, gender, date_of_birth, email } = req.body;
        
        const person = await pool.query(
            'UPDATE person SET first_name = $1, last_name = $2, gender = $3, date_of_birth = $4, email = $5 WHERE id = $6 RETURNING *', 
            [first_name, last_name, gender, date_of_birth, email, id]
        );

        res.status(200).json({
            status: 'success',
            message: 'Person was updated!',
            person: person.rows[0]
        });

    } catch (error) {
        console.error(error.message, error);
        res.status(400).json({
            status: 'fail',
            message: error.message,
            error
        });
    }
});

// DELETE
app.delete('/person/:id', async(req, res) => {
    try {
        const { id } = req.params;
        await pool.query(
            'DELETE FROM person WHERE id = $1', 
            [id]
        );

        res.status(200).json({
            status: 'success',
            message: 'PERSON was deleted successfully!'
        });
    } catch (error) {
        console.error(error, error.message);
        res.status(400).json({
            status: 'fail',
            message: error.message,
            error
        });
    }
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});

app.all('*', (req, res) => {
    res.status(404).json({message: `Cannot find ${req.originalUrl} on this server!`});
});

// console.log(process.env.NODE_ENV);
module.exports = app; //For testing
