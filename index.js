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
            // console.log(err ? err : result);
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
        // console.log(data);
        const insertQuery = "INSERT INTO teachers ( name, phone, email, joined, degree, institution, address, img, gender, branch) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        db.query(insertQuery, [name, phone ? phone : '', email || '', joined, degree, institution, address || '', img || '', gender, branch], (err, result) => {
            res.json(err ? err : result);
            // console.log(err);
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
        const eventGetQuery = "SELECT * FROM events, guests, eventguest WHERE eventguest.guestId = guests.id and eventguest.eventId = events.id"
        db.query(eventGetQuery, (err, result) => {
            res.send(err ? err : result);
        })
    });
    app.post('/events', (req, res) => {
        const { event, guests } = req.body;
        const { eventName, place, date } = event;
        // console.log(req.body);
        // console.log(date);
        let eventId;
        // insert into events
        db.query('SELECT id FROM events WHERE name = ? AND place = ?', [eventName, place], (err, result) => {
            // console.log(result[0]);
            if (result[0]) {
                eventId = result[0].id;
            }
            else {
                const insertEvent = 'INSERT INTO events (name, place) VALUES (?, ?)';
                db.query(insertEvent, [eventName, place], (err, result) => {
                    db.query('SELECT id FROM events WHERE name=? AND place =?', [eventName, place], (err, result) => {
                        eventId = result[0].id;
                    })

                })
            }
        })
        // insert into guests
        guests?.forEach(guest => {
            // check whether it is still available
            const { gName, gPhone, gRole } = guest;
            let guestId;
            db.query('SELECT id FROM guests WHERE phone = ?', gPhone, (err, result) => {
                // console.log(result);
                if (result[0]) {

                    guestId = result[0].id;
                }
                else {
                    // insert if not available
                    const insertGuest = 'INSERT INTO guests (name, phone, role) VALUES (?, ?, ?)';
                    db.query(insertGuest, [gName, gPhone, gRole], (err, result) => {
                        db.query('SELECT id FROM guests WHERE phone = ?', gPhone, (err, result) => {
                            guestId = result[0].id;
                        })
                    })
                }
                // console.log(guestId);
                const insertEventG = 'INSERT INTO eventguest (date, guestId, eventId) VALUES (?, ?, ?)';
                db.query(insertEventG, [date, guestId, eventId], (err, result) => {
                    // console.log(err ? err : result);
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
    app.post('/branches', (req, res) => {
        const { description, location, position, time } = req.body;
        const branchPost = "INSERT INTO branches (location, position, description, time) VALUES (?, ?, ?, ?)";
        db.query(branchPost, [description, location, position, time], (err, result) => {
            res.json(err ? err : result);
        })
    })
    app.get('/branches/:id', (req, res) => {
        const { id } = req.params;
        const getBranch = 'SELECT * FROM branches WHERE id = ?';
        db.query(getBranch, id, (err, result) => {
            res.json(err ? err : result);
        })
    })
    app.put('/branches/:id', (req, res) => {
        const { id } = req.params;
        const { description, location, position, time } = req.body;
        const branchPut = "UPDATE branches SET description= ?, location= ?, position=?, time=?"
        db.query(branchPut, [description, location, position, time], (err, result) => {
            res.json(err ? err : result);
        })
    })
    // war begin

    app.post('/admin', (req, res) => {
        res.json([])
    });
}
finally {

}
app.get('/', (req, res) => {
    const testQuery = `SELECT eventId, guestId FROM eventGuest`;
    db.query(testQuery, (err, result) => {
        res.send(err ? err : result)
    })
    // res.send('working');
})

app.listen(port, () => {
    console.log(port);
})