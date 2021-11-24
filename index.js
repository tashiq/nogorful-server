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
    app.get('/teachers', (req, res) => {
        const selectQuery = `SELECT * FROM teachers`;
        db.query(selectQuery, (err, result) => {
            res.send(err ? err : result);
        })
    })
    app.get('/teachers/:id', (req, res) => {
        const id = req.params.id;
        const selectQuery = `SELECT * FROM teachers WHERE id = ?`;
        db.query(selectQuery, id, (err, result) => {
            res.send(err ? err : result[0]);
        })
    })
    app.post('/teachers', (req, res) => {
        const data = req.body;
        const { name, phone, email, joined, degree, institution, address, img, gender, branch } = data;
        console.log(data);
        const insertQuery = "INSERT INTO teachers ( name, phone, email, joined, degree, institution, address, img, gender, branch) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        db.query(insertQuery, [name, phone ? phone : '', email || '', joined, degree, institution, address || '', img || '', gender, branch], (err, result) => {
            res.json(err ? err : result);
            console.log(err);
        })
    })
    app.put('/teachers/:id', (req, res) => {
        const id = req.params.id;
        const { name, img, email, phone, joined, address, degree, institution, gender, branch } = req.body;
        const updateQuery = 'UPDATE teachers SET name = ?, img = ?, email = ?, phone = ?, joined = ?, address =?, degree =?,  institution = ?, gender = ?, branch=?  WHERE id = ?';
        db.query(updateQuery, [name, img, email, phone, joined, address, degree, institution, gender, branch, id], (err, result) => {
            res.json(err ? err : result);
        })
    })
    app.delete('/teachers/:id', (req, res) => {
        const id = req.params.id;
        const deleteQuery = `DELETE FROM teachers WHERE id = ?`;
        db.query(deleteQuery, id, (err, result) => {
            res.json(err ? err : result);
        })
    })
    app.get('/events', (req, res) => {
        const selectQuery = `SELECT * FROM events`;
        db.query(selectQuery, (err, result) => {
            res.send(err ? err : result);
        })
        res.json([]);
    });
    app.post('/events', (req, res) => {
        const { eventName, place, date, guests } = req.body;
        let eventId;
        // insert into events
        mysql.query('SELECT id FROM events WHERE name = ? AND place = ?', [eventName, place], (err, result) => {
            if (result[0].id) {
                eventId = result[0].id;
            }
            else {
                const insertEvent = 'INSERT INTO events (name, place) VALUES (?, ?)';
                mysql.query(insertEvent, [eventName, place], (err, result) => {
                    mysql.query('SELECT id FROM events WHERE name=? AND place =?', [eventName, place], (err, result) => {
                        eventId = result[0].id;
                    })

                })
            }
        })
        // insert into guests
        guests.array.forEach(guest => {
            // check whether it is still available
            const { gName, gPhone, gRole } = guest;
            let guestId;
            mysql.query('SELECT id FROM guests WHERE phone = ?', gPhone, (err, result) => {
                if (result[0].id) {
                    guestId = result[0].id;
                }
                else {
                    // insert if not available
                    const insertGuest = 'INSERT INTO guests (name, phone, role) VALUES (?, ?, ?)';
                    mysql.query(insertGuest, [gName, gPhone, gRole], (err, result) => {
                        mysql.query('SELECT id FROM guests WHERE phone = ?', gPhone, (err, result) => {
                            guestId = result[0].id;
                        })
                    })
                }
                const insertEventG = 'INSERT INTO event-guest (date, guestId, eventId) VALUES (?, ?, ?)';
                mysql.query(insertEventG, [eventDate, guestId, eventId], (err, result) => {
                    console.log(result);
                })
            })
        });

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