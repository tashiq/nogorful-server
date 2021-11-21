const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json())
const port = process.env.PORT || 4000;
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
const mysql = require('mysql')
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nogorful'
})
try {

    app.get('/events', (req, res) => {
        const selectQuery = `SELECT * FROM events`;
        db.query(selectQuery, (err, result) => {
            res.send(err ? err : result);
        })
    });
    app.get('/students', (req, res) => {
        const selectQuery = `SELECT * FROM students`;
        db.query(selectQuery, (err, result) => {
            res.send(err ? err : result);
        })
    })
    app.post('/students', (req, res) => {
        const data = req.body;
        console.log(data);
        // const insertQuery = `INSERT INTO students (name, img, father, mother, addmission, address, class, parentsOccupation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        // db.query(insertQuery, [...data], (err, result) => {
        //     res.json(err ? err : result);
        // })
    })
    app.put('/students/:id', (req, res) => {
        const id = req.params.id;
        const updateQuery = `
        UPDATE students 
        SET ()
        `
    })
    app.get('/teachers', (req, res) => {
        const selectQuery = `SELECT * FROM teachers`;
        db.query(selectQuery, (err, result) => {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                res.send(result);
            }
        })
    })
    app.get('/branches', (req, res) => {
        const selectQuery = `SELECT * FROM branches`;
        db.query(selectQuery, (err, result) => {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                res.send(result);
            }
        })
    })
    app.get('/info', (req, res) => {
        res.send()
    })
    app.post('/admin', (req, res) => {
        res.send()
    });
}
finally {

}
app.get('/', (req, res) => {
    res.send('working');
})

app.listen(port, () => {
    console.log(port);
})