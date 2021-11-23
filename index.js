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

    app.get('/students', (req, res) => {
        const selectQuery = `SELECT * FROM students`;
        db.query(selectQuery, (err, result) => {
            res.json(err ? err : result);
        })
    })
    app.get('/students/:id', (req, res) => {
        const id = req.params.id;
        const selectQuery = `SELECT * FROM students WHERE id = ?`;
        // console.log(id);
        db.query(selectQuery, id, (err, result) => {
            res.json(err ? err : result[0]);
        })
    })
    app.post('/students', (req, res) => {
        const data = req.body;
        const { name, father, mother, addmission, cls, school, address, img, parentsOccupation, gender, branch } = data;
        const insertQuery = `INSERT INTO students (name, img, father, mother, addmission, address, cls, parentsOccupation, school, gender, branch) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query(insertQuery, [name, img ? img : '', father, mother, addmission, address, cls, parentsOccupation, school, gender, branch], (err, result) => {
            res.json(err ? err : result);
        })

    })
    app.put('/students/:id', (req, res) => {
        const id = req.params.id;
        const { name, img, father, mother, addmission, address, cls, parentsOccupation, school, gender, branch } = req.body;
        const updateQuery = 'UPDATE students SET name = ?, img = ?, father = ?, mother = ?, addmission = ?, address =?, cls =?, parentsOccupation = ?, school = ?, gender = ?, branch=?  WHERE id = ?';
        db.query(updateQuery, [name, img, father, mother, addmission, address, cls, parentsOccupation, school, gender, branch, id], (err, result) => {
            res.json(err ? err : result);
        })

    })
    app.delete('/students/:id', (req, res) => {
        const id = req.params.id;
        const deleteQuery = `DELETE FROM students WHERE id = ?`;
        db.query(deleteQuery, id, (err, result) => {
            res.json(err ? err : result);
        })
    })

    app.get('/events', (req, res) => {
        // const selectQuery = `SELECT * FROM events`;
        // db.query(selectQuery, (err, result) => {
        //     res.send(err ? err : result);
        // })
        res.json([]);
    });
    app.get('/teachers', (req, res) => {
        const selectQuery = `SELECT * FROM teachers`;
        db.query(selectQuery, (err, result) => {
            res.json(err ? err : result);
        })
    })
    app.get('/branches', (req, res) => {
        const selectQuery = `SELECT * FROM branches`;
        db.query(selectQuery, (err, result) => {
            res.json(err ? err : result);
        })
    })
    app.get('/info', (req, res) => {
        res.json([])
    })
    app.post('/admin', (req, res) => {
        res.json([])
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