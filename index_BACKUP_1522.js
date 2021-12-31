const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json())
const port = process.env.PORT || 4000;
const mysql = require('mysql');
<<<<<<< HEAD
=======
const { json } = require('body-parser');
>>>>>>> 06baacaa5bcc0a3fd3f843415f7a8473a5a72c1a
const db = mysql.createPool({
    host: 'sql6.freemysqlhosting.net',
    user: 'sql6461077',
    password: 'kaxaNhCYlb',
    database: 'sql6461077'
})
app.post('/branches', (req, res) => {
    const { description, location, position, time, img } = req.body;
    const branchPost = "INSERT INTO branches (location, position, description, time, img) VALUES (?, ?, ?, ?)";
    db.query(branchPost, [description, location, position, time, img || ""], (err, result) => {
        res.json(err ? err : result);
    })
});
app.get('/branches', (req, res) => {
    const selectQuery = `SELECT * FROM branches`;
    db.query(selectQuery, (err, result) => {
        res.json(err ? err : result);
    })
});
app.get('/branches/:id', (req, res) => {
    const { id } = req.params;
    // console.log(id);
    const getBranch = 'SELECT * FROM branches WHERE id = ?';
    db.query(getBranch, id, (err, result) => {
        res.json(err ? err : result[0]);
        // console.log(err ? err : result[0]);
    })
});
app.put('/branches/:id', (req, res) => {
    const { id } = req.params;
    const { description, location, position, time, img } = req.body;
    const branchPut = "UPDATE branches SET description= ?, location= ?, position=?, time=?, img = ? WHERE id= ?"
    db.query(branchPut, [description, location, position, time, img, id || ""], (err, result) => {
        res.json(err ? err : result);
    })
});
app.get('/projects', (req, res) => {
    const projectQuery = 'SELECT * FROM projects';
    db.query(projectQuery, (err, result) => {
        res.json(err ? err : result);
    })
});
app.get('/students/:id', (req, res) => {
    const id = req.params.id;
    const selectQuery = `SELECT * FROM students WHERE sid = ?`;
    db.query(selectQuery, id, (err, result) => {
        res.json(err ? err : result[0]);
    })
});
app.get('/students', (req, res) => {
    const branch = req.query.branch;
    if (branch) {
        const query = 'SELECT * FROM students WHERE branch = ?';
        db.query(query, branch, (err, result) => {
            res.json(err ? err : result)
        })
    }
    else {
        const selectQuery = `SELECT * FROM students`;
        db.query(selectQuery, (err, result) => {
            console.log(err ? err : result);
            res.json(err ? err : result);
        })
    }
});
app.post('/students', (req, res) => {
    const data = req.body;
    const { firstName, lastName, classs, fatherFirstName, fatherLastName } = data;
    const insertQuery = `INSERT INTO 
students (firstName, lastName, class, fatherFirstName, fatherLastName, branch) 
VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(insertQuery, [firstName, lastName, classs, fatherFirstName, fatherLastName, branch], (err, result) => {
        res.json(err ? err : result);
    })
});
app.put('/students/:id', (req, res) => {
    const id = req.params.id;
    const { firstName, lastName, classs, fatherFirstName, fatherLastName } = req.body;
    const updateQuery = 'UPDATE students SET firstName = ?, lastName= ?, class=?, fatherFirstName= ?, fatherLastName, branch= ?  WHERE sid = ?';
    db.query(updateQuery, [firstName, lastName, classs, fatherFirstName, fatherLastName, branch, id], (err, result) => {
        res.json(err ? err : result);
    })
<<<<<<< HEAD

});
app.delete('/students/:id', (req, res) => {
    const id = req.params.id;
    const deleteQuery = `DELETE FROM students WHERE sid = ?`;
    db.query(deleteQuery, id, (err, result) => {
        res.json(err ? err : result);
    })
});
app.get('/teachers', (req, res) => {
    const selectQuery = `SELECT * FROM teachers`;
    db.query(selectQuery, (err, result) => {
        res.send(err ? err : result);
    })
});
app.get('/teachers/:phone', (req, res) => {
    const phone = req.params.phone;
    const selectQuery = `SELECT * FROM teachers WHERE phone = ?`;
    db.query(selectQuery, phone, (err, result) => {
        res.json(err ? err : result[0]);
    })
});
app.post('/teachers', (req, res) => {
    const data = req.body;
    const { phone, firstName, lastName, address, joindate, email } = data;
    // console.log(data);
    const insertQuery = `INSERT INTO teachers (phone, firstName,lastName, address, joindate,  email) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(insertQuery, [phone, firstName, lastName, address, joindate, email], (err, result) => {
        res.json(err ? err : result);
        // console.log(err);
    })
});
app.put('/teachers/:phn', (req, res) => {
    const Oldphone = req.params.phn;
    const { phone, firstName, lastName, address, joindate, email } = req.body;
    const updateQuery =
        `UPDATE teachers SET phone=?, lastName=?, firstName=?, email=?, address=?, joindate=? WHERE phone=?`;
    db.query(updateQuery, [phone, firstName, lastName, address, joindate, email, Oldphone], (err, result) => {
        res.json(err ? err : result);
    })
});
app.delete('/teachers/:phone', (req, res) => {
    const phone = req.params.phone;
    const deleteQuery = `DELETE FROM teachers WHERE phone = ?`;
    db.query(deleteQuery, phone, (err, result) => {
        res.json(err ? err : result);
    })
});
app.post('/attendance', (req, res) => {
    const data = req.body;
    const { students, phone, date } = data;
    const query = 'INSERT INTO attendance (date, phone, sid) VALUES (?, ?, ?)';
    students.forEach(student => {
        db.query(query, [date, phone, student], (err, result) => {
            // console.log(err ? err : result);
        })
    })
});
app.get('/attendance', (req, res) => {
    const { teacher, student, date } = req.query;
    const attendanceQ = `SELECT * FROM takeAttendance JOIN students ON takeAttendance.sid = students.sid JOIN teachers ON takeAttendance.phone = teachers.phone`
    db.query(attendanceQ, (err, result) => {
        res.json(err ? err : result);
    })
});
app.get('/events', (req, res) => {
    const eventGetQuery = "SELECT * FROM attend JOIN events ON attend.eventName = events.name JOIN guests ON attend.guestPhone = guests.phone"
    db.query(eventGetQuery, (err, result) => {
        res.send(err ? err : result);
    })
});
app.post('/events', (req, res) => {
    const { guest, eventName, date, cost, noOfAttendance } = req.body;
    const insertQ = `INSERT INTO attend (guestPhone, eventName, date, cost, noOfAttendance) VALUES (?, ?, ?, ?, ?)`;
    guest.map(guestPhone => {
        db.query(insertQ, [guestPhone, eventName, date, cost, noOfAttendance], (err, result) => {
            res.json(err ? err : result)
        })
    })
});
app.put('/admin', (req, res) => {
    const { email } = req.query;
    const v = "admin";
    console.log(email);
    const upQuery = 'UPDATE teachers SET role = ? WHERE phone = ?';
    db.query(upQuery, ['admin', email], (err, result) => {
        res.json(err ? err : result)
        console.log(err ? err : result);
    })
})
// ocod 
app.get('/donor', (req, res) => {
    const getAll = 'SELECT * FROM donor';
    db.query(getAll, (err, result) => {
        res.json(err ? err : result)
    })
})
app.get('/donor/:phone', (req, res) => {
    const { phone } = req.params;
    const getAll = 'SELECT * FROM donor dPhone=?';
    db.query(getAll, (err, result) => {
        res.json(err ? err : result)
    })
})

app.get('/child', (req, res) => {
    const getAll = 'SELECT * FROM child';
    db.query(getAll, (err, result) => {
        res.json(err ? err : result)
    })
})
app.get('/ocod', (req, res) => {
    const getAll = 'SELECT * FROM child JOIN donor ON donor.phone = child.dPhone';
    db.query(getAll, (err, result) => {
        res.json(err ? err : result)
    })
})
app.get('/', (req, res) => {
    res.send('working')
})
=======

});
app.delete('/students/:id', (req, res) => {
    const id = req.params.id;
    const deleteQuery = `DELETE FROM students WHERE sid = ?`;
    db.query(deleteQuery, id, (err, result) => {
        res.json(err ? err : result);
    })
});
app.get('/teachers', (req, res) => {
    const selectQuery = `SELECT * FROM teachers`;
    db.query(selectQuery, (err, result) => {
        res.send(err ? err : result);
    })
});
app.get('/teachers/:phone', (req, res) => {
    const phone = req.params.phone;
    const selectQuery = `SELECT * FROM teachers WHERE phone = ?`;
    db.query(selectQuery, phone, (err, result) => {
        res.json(err ? err : result[0]);
    })
});
app.post('/teachers', (req, res) => {
    const data = req.body;
    const { phone, firstName, lastName, address, joindate, email } = data;
    // console.log(data);
    const insertQuery = `INSERT INTO teachers (phone, firstName,lastName, address, joindate,  email) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(insertQuery, [phone, firstName, lastName, address, joindate, email], (err, result) => {
        res.json(err ? err : result);
        // console.log(err);
    })
});
app.put('/teachers/:phn', (req, res) => {
    const Oldphone = req.params.phn;
    const { phone, firstName, lastName, address, joindate, email } = req.body;
    const updateQuery =
        `UPDATE teachers SET phone=?, lastName=?, firstName=?, email=?, address=?, joindate=? WHERE phone=?`;
    db.query(updateQuery, [phone, firstName, lastName, address, joindate, email, Oldphone], (err, result) => {
        res.json(err ? err : result);
    })
});
app.delete('/teachers/:phone', (req, res) => {
    const phone = req.params.phone;
    const deleteQuery = `DELETE FROM teachers WHERE phone = ?`;
    db.query(deleteQuery, phone, (err, result) => {
        res.json(err ? err : result);
    })
});
app.post('/attendance', (req, res) => {
    const data = req.body;
    const { students, phone, date } = data;
    const query = 'INSERT INTO attendance (date, phone, sid) VALUES (?, ?, ?)';
    students.forEach(student => {
        db.query(query, [date, phone, student], (err, result) => {
            // console.log(err ? err : result);
        })
    })
});
app.get('/attendance', (req, res) => {
    const { teacher, student, date } = req.query;
    const attendanceQ = `SELECT * FROM takeAttendance JOIN students ON takeAttendance.sid = students.sid JOIN teachers ON takeAttendance.phone = teachers.phone`
    db.query(attendanceQ, (err, result) => {
        res.json(err ? err : result);
    })
});
app.get('/events', (req, res) => {
    const eventGetQuery = "SELECT * FROM attend JOIN events ON attend.eventName = events.name JOIN guest ON attend.guestPhone = guest.phone"
    db.query(eventGetQuery, (err, result) => {
        res.send(err ? err : result);
    })
});
//     app.post('/events', (req, res) => {
//         const { event, guests } = req.body;
//         const { eventName, place, date } = event;
//         // console.log(req.body);
//         // console.log(date);
//         let eventId;
//         // insert into events
//         db.query('SELECT id FROM events WHERE name = ? AND place = ?', [eventName, place], (err, result) => {
//             // console.log(result[0]);
//             if (result[0]) {
//                 eventId = result[0].id;
//             }
//             else {
//                 const insertEvent = 'INSERT INTO events (name, place) VALUES (?, ?)';
//                 db.query(insertEvent, [eventName, place], (err, result) => {
//                     db.query('SELECT id FROM events WHERE name=? AND place =?', [eventName, place], (err, result) => {
//                         eventId = result[0].id;
//                     })

//                 })
//             }
//         })
//         // insert into guests
//         guests?.forEach(guest => {
//             // check whether it is still available
//             const { gName, gPhone, gRole } = guest;
//             let guestId;
//             db.query('SELECT id FROM guests WHERE phone = ?', gPhone, (err, result) => {
//                 // console.log(result);
//                 if (result[0]) {

//                     guestId = result[0].id;
//                 }
//                 else {
//                     // insert if not available
//                     const insertGuest = 'INSERT INTO guests (name, phone, role) VALUES (?, ?, ?)';
//                     db.query(insertGuest, [gName, gPhone, gRole], (err, result) => {
//                         db.query('SELECT id FROM guests WHERE phone = ?', gPhone, (err, result) => {
//                             guestId = result[0].id;
//                         })
//                     })
//                 }
//                 // console.log(guestId);
//                 const insertEventG = 'INSERT INTO eventguest (date, guestId, eventId) VALUES (?, ?, ?)';
//                 db.query(insertEventG, [date, guestId, eventId], (err, result) => {
//                     // console.log(err ? err : result);
//                 })
//             })
//         });

//     });



app.post('/newuser', (req, res) => {
    const data = req.body;
    const { FirstName, LastName, Phone, Email, Adress, Education } = data;
    const insertUser = "INSERT INTO user (firstName, lastName, email, phone, address, education) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(insertUser, [FirstName, LastName, Email, Phone, Adress, Education], (err, result) => {
        res.send(err ? err : result);
    })
});
//     app.get('/user/:email', (req, res) => {
//         const { email } = req.params;
//         const getUser = "SELECT * FROM user WHERE email = ?";
//         db.query(getUser, email, (err, result) => {
//             res.json(err ? err : result);
//             // console.log(err ? err : result);
//         })
//     });
//     app.put('/admin', (req, res) => {
//         const { email } = req.query;
//         const v = "admin";
//         console.log(email);
//         const upQuery = 'UPDATE user SET role = ? WHERE email = ?';
//         db.query(upQuery, ['admin', email], (err, result) => {
//             res.json(err ? err : result)
//             console.log(err ? err : result);
//         })
//     })
// finally {

// }

>>>>>>> 06baacaa5bcc0a3fd3f843415f7a8473a5a72c1a
app.listen(port, () => {
    console.log(port);
})