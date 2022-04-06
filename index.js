const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json())
const port = process.env.PORT || 4000;
const mysql = require('mysql');
// const db = mysql.createPool({
//     host: 'sql6.freemysqlhosting.net',
//     user: 'sql6461077',
//     password: 'kaxaNhCYlb',
//     database: 'sql6461077'
// });
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sql6461077'
})
app.post('/branches', (req, res) => {
    const { description, location, position, time, img } = req.body;
    const branchPost = "INSERT INTO branches (location, position, description, time, img) VALUES (?, ?, ?, ?)";
    db.query(branchPost, [description, location, position, time, img || ""], (err, result) => {
        res.json(err ? err : result);
    })
});
//crud -> create(insert), update, delete
app.get('/branches', (req, res) => {
    const selectQuery = `SELECT * FROM branches`;
    db.query(selectQuery, (err, result) => {
        res.json(err ? err : result);
    })
});
app.get('/branches/:id', (req, res) => {
    const { id } = req.params;
    // //console.log(id);
    const getBranch = 'SELECT * FROM branches WHERE id = ?';
    db.query(getBranch, id, (err, result) => {
        res.json(err ? err : result[0]);
        // //console.log(err ? err : result[0]);
    })
});
app.put('/branches/:id', (req, res) => {
    const { id } = req.params;
    //console.log(req.body);
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
    const name = req.query.key;

    if (branch) {
        const query = 'SELECT * FROM students WHERE branch = ?';
        db.query(query, branch, (err, result) => {
            res.json(err ? err : result)
        })
    }
    else if (name) {
        const query = `
        select * 
        from students 
        where firstname like ? or lastName like ? order by firstName, lastName`;
        db.query(query, ['%' + name + '%', '%' + name + '%'], (err, result) => {
            res.json(err ? err : result);
            console.log(err ? err : result);
        })
    }
    else {
        const selectQuery = `SELECT * FROM students`;
        db.query(selectQuery, (err, result) => {
            //console.log(err ? err : result);
            res.json(err ? err : result);
        })
    }
});

app.post('/students', (req, res) => {
    const data = req.body;
    const { firstName, lastName, classs, fatherFirstName, fatherLastName, branch } = data;
    const insertQuery = `INSERT INTO 
    students (firstName, lastName, class, fatherFirstName, fatherLastName, branch) 
    VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(insertQuery, [firstName, lastName, classs, fatherFirstName, fatherLastName, branch], (err, result) => {
        res.json(err ? err : result);
        //console.log(err ? err : result);
    })
});
app.put('/students/:id', (req, res) => {
    const id = req.params.id;
    const { firstName, lastName, branch, fatherFirstName, fatherLastName } = req.body;
    const updateQuery = 'UPDATE students SET firstName = ?, lastName= ?, class=?, fatherFirstName= ?, fatherLastName = ?, branch= ?  WHERE sid = ?';
    console.log(req.body);
    db.query(updateQuery, [firstName, lastName, req.body.class, fatherFirstName, fatherLastName, branch, id], (err, result) => {
        console.log(err ? err : result);
        res.json(err ? err : result);
    })


});
app.delete('/students/:id', (req, res) => {
    const id = req.params.id;
    const deleteQuery = `DELETE FROM students WHERE sid = ?`;
    db.query(deleteQuery, id, (err, result) => {
        res.json(err ? err : result);
    })
});

app.get('/teachers', (req, res) => {
    const { email } = req.query;
    const name = req.query.key;
    if (email) {
        const selectQuery = `SELECT * FROM user where email = ?`;
        db.query(selectQuery, email, (err, result) => {
            res.send(err ? err : result);
        })
    }
    else if (name) {
        const query = `
        select * 
        from teachers 
        where firstname like ? or lastName like ? order by firstName, lastName`;
        db.query(query, ['%' + name + '%', '%' + name + '%'], (err, result) => {
            res.json(err ? err : result);
            console.log(err ? err : result);
        })
    }
    else {
        const selectQuery = `SELECT * FROM teachers`;
        db.query(selectQuery, (err, result) => {
            res.send(err ? err : result);
        })
    }
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
    // //console.log(JSON.stringify(data));
    const { phone, firstName, lastName, address, joindate, email } = data;
    console.log(data);
    const insertQuery = `INSERT INTO teachers (phone, firstName,lastName, address, joindate,  email) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(insertQuery, [phone, firstName, lastName, address, joindate, email], (err, result) => {
        res.json(err ? err : result);
        // //console.log(err);
    })
});
app.put('/teachers/:phn', (req, res) => {
    const Oldphone = req.params.phn;
    const { phone, firstName, lastName, address, joindate, email } = req.body;
    const updateQuery =
        `UPDATE teachers SET phone=?, lastName=?, firstName=?, email=?, address=?, joindate=? WHERE phone=?`;
    db.query(updateQuery, [phone, lastName, firstName, email, address, joindate, Oldphone], (err, result) => {
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
    //console.log(data);
    const query = 'INSERT INTO takeAttendance (date, phone, sid) VALUES (?, ?, ?)';
    students.forEach(student => {
        db.query(query, [date, phone, student], (err, result) => {
            //console.log(err ? err : result);
        })
    })
});
app.get('/attendance', (req, res) => {
    const { teacher, student, date } = req.query;
    const attendanceQ = `SELECT  students.sid, students.firstName "sfn", students.lastName 'sln',students.branch 'branch', teachers.firstName 'tfn', teachers.lastName 'tln', teachers.email 'te', takeattendance.date FROM takeAttendance JOIN students ON takeAttendance.sid = students.sid JOIN teachers ON takeAttendance.phone = teachers.phone
`
    db.query(attendanceQ, (err, result) => {
        res.json(err ? err : result);
    })
});
app.get('/events', (req, res) => {
    const eventGetQuery = "SELECT * FROM attend JOIN events ON attend.eventName = events.name JOIN guests ON attend.guestPhone = guests.phone"
    db.query(eventGetQuery, (err, result) => {
        res.send(err ? err : result);
        //console.log(err ? err : result);
    })
});
app.post('/events', (req, res) => {
    const { guests, eventData } = req.body;
    const { eventName, date, cost, noOfAttendance } = eventData;
    //console.log(guests);
    const insertQ = `INSERT INTO attend (guestPhone, eventName, date, cost, noOfAttendance) VALUES (?, ?, ?, ?, ?)`;
    guests.map(guest => {
        db.query(insertQ, [guest, eventName, date, cost, noOfAttendance], (err, result) => {
            res.json(err ? err : result)
            //console.log(err ? err : result);
        })
    })
});
app.post('/guests', (req, res) => {
    const data = req.body;
    const { phone, firstName, lastName, role } = data;
    const ins = `INSERT INTO guests(phone, firstName, lastName, role) VALUES (?, ?, ?, ?)`
    db.query(ins, [phone, firstName, lastName, role], (err, result) => {
        res.json(err ? err : result);
    })
})
app.post('/event', (req, res) => {
    const { eventName, description } = req.body
    const insertQ = `INSERT INTO events (name, description) VALUES (?, ?)`;
    db.query(insertQ, [eventName, description], (err, result) => {
        res.json(err ? err : result)
        //console.log(err ? err : result);
    })
})
app.get('/event/:name', (req, res) => {
    const { name } = req.params;
    const insertQ = `SELECT * FROM events WHERE name=? `;
    db.query(insertQ, name, (err, result) => {
        res.json(err ? err : result)
        //console.log(err ? err : result);
    })
})
app.delete('/event/:name', (req, res) => {
    const { name } = req.params;
    const insertQ = `DELETE FROM events WHERE name=? `;
    db.query(insertQ, name, (err, result) => {
        res.json(err ? err : result)
        //console.log(err ? err : result);
    })
})
app.post('/newuser', (req, res) => {
    const { firstName, lastName, email } = req.body;
    const q = `insert into user (firstName, lastName, email) values (?, ?, ?)`
    db.query(q, [firstName, lastName, email], (err, result) => {
        res.json(err ? err : result);
        //console.log(err);
    })
})
app.get('/user/:email', (req, res) => {
    const { email } = req.params;
    const q = `select * from user where email = ?`
    db.query(q, [email], (err, result) => {
        res.json(err ? err : result);
    })
})
app.put('/event/:eName', (req, res) => {
    const { eName } = req.params;
    const { name, description } = req.body;
    const insertQ = `UPDATE events SET name=?, description=? WHERE name=? `;
    db.query(insertQ, [name, description, eName], (err, result) => {
        res.json(err ? err : result)
        //console.log(err ? err : result);
    })
})
app.get('/event', (req, res) => {
    const insertQ = `SELECT * FROM events`;
    db.query(insertQ, (err, result) => {
        res.json(err ? err : result)
        //console.log(err ? err : result);
    })
})
app.get('/guests', (req, res) => {
    const name = req.query.key;
    if (name) {
        const query = `
        select * 
        from guests 
        where firstname like ? or lastName like ? order by firstName, lastName`;
        db.query(query, ['%' + name + '%', '%' + name + '%'], (err, result) => {
            res.json(err ? err : result);
            console.log(err ? err : result);
        })
    }
    else {
        const insertQ = `SELECT * FROM guests`;
        db.query(insertQ, (err, result) => {
            res.json(err ? err : result)
            //console.log(err ? err : result);
        })
    }
})
app.delete('/guests/:phone', (req, res) => {
    const { phone } = req.params;
    const insertQ = `DELETE FROM guests WHERE phone=?`;
    db.query(insertQ, phone, (err, result) => {
        res.json(err ? err : result)
        //console.log(err ? err : result);
    })
})
app.get('/child', (req, res) => {

    const insertQ = `SELECT * FROM child`;
    db.query(insertQ, (err, result) => {
        res.json(err ? err : result)
        //console.log(err ? err : result);
    })
})
app.put('/admin', (req, res) => {
    const { email } = req.query;
    const v = "admin";
    const upQuery = 'UPDATE user SET role = ? WHERE email = ?';
    db.query(upQuery, ['admin', email], (err, result) => {
        res.json(err ? err : result)
        //console.log(err ? err : result);
    })
})
// ocod 
app.get('/donor', (req, res) => {
    const name = req.query.key;
    if (name) {
        const query = `
        select * 
        from donor 
        where firstname like ? or lastName like ? order by firstName, lastName`;
        db.query(query, ['%' + name + '%', '%' + name + '%'], (err, result) => {
            res.json(err ? err : result);
            console.log(err ? err : result);
        })
    }
    else {
        const getAll = 'SELECT * FROM donor';
        db.query(getAll, (err, result) => {
            res.json(err ? err : result)
        })
    }
})
app.delete('/child/:id', (req, res) => {
    const { id } = req.params;
    const getAll = 'DELETE FROM child WHERE id=?';
    db.query(getAll, id, (err, result) => {
        res.json(err ? err : result)
    })
})
app.get('/child/:id', (req, res) => {
    const { id } = req.params;
    const getAll = 'SELECT * FROM child WHERE id=?';
    db.query(getAll, id, (err, result) => {
        res.json(err ? err : result)
    })
})
app.put('/child/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, parentsPhone, fatherFirstName, fatherLastName, address } = req.body;
    //console.log(req.body);
    const getAll = 'UPDATE child SET firstName = ?, lastName = ?, parentsPhone = ?, fatherFirstName = ?, fatherLastName = ?, address = ?  WHERE id=?';
    db.query(getAll, [firstName, lastName, parentsPhone, fatherFirstName, fatherLastName, address, id], (err, result) => {
        res.json(err ? err : result)
        //console.log(err ? err : result);
    })
})
app.put('/guest/:phn', (req, res) => {
    const { phn } = req.params;
    const { firstName, lastName, phone, role } = req.body;
    const getAll = 'UPDATE guests SET firstName = ?, lastName = ?, phone = ?, role=?  WHERE phone=?';
    db.query(getAll, [firstName, lastName, phone, role, phn], (err, result) => {
        res.json(err ? err : result)
        //console.log(err ? err : result);
    })
})
app.put('/donor/:phn', (req, res) => {
    const { phn } = req.params;
    const { firstName, lastName, phone, salary } = req.body;
    //console.log(req.body);
    const getAll = 'UPDATE donor SET firstName = ?, lastName = ?, phone = ?, salary = ?  WHERE phone=?';
    db.query(getAll, [firstName, lastName, phone, salary, phn], (err, result) => {
        res.json(err ? err : result)
        //console.log(err ? err : result);
    })
})
app.get('/guests/:phone', (req, res) => {
    const { phone } = req.params;
    const getAll = 'SELECT * FROM donor WHERE phone=?';
    db.query(getAll, phone, (err, result) => {
        res.json(err ? err : result)
    })
})
app.post('/donor', (req, res) => {
    const data = req.body;
    const { firstName, lastName, phone, salary } = data
    const check = 'select * from donor where phone = ?'
    let resu = null;
    db.query(check, phone, (err, result) => {
        if (!result?.length) {
            const inDonor = 'INSERT  INTO  donor (firstName, lastName , phone , salary)VALUES (?, ?, ?, ?)';
            db.query(inDonor, [firstName, lastName, phone, salary], (err2, result2) => {
                res.json(err2 ? err2 : result2)
                //console.log(err ? err2 : result2);
            })
        }
    })
})
app.post('/child', (req, res) => {
    const data = req.body;
    const { firstName, lastName, parentsPhone, fatherFirstName, fatherLastName, address, dPhone } = data;
    const inChild = 'INSERT  INTO  child ( firstName, lastName , parentsPhone ,fatherFirstName, fatherLastName, address, dPhone)VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(inChild, [firstName, lastName, parentsPhone, fatherFirstName, fatherLastName, address, dPhone], (err, result) => {
        res.json(err ? err : result)
        //console.log(err ? err : result);
    })
})
app.delete('/donor/:phone', (req, res) => {
    const { phone } = req.params;
    const getAll = 'DELETE FROM donor WHERE phone=?';
    db.query(getAll, phone, (err, result) => {
        res.json(err ? err : result)
        //console.log(err);
    })
})
app.get('/donor/:phone', (req, res) => {
    const { phone } = req.params;
    const getAll = 'SELECT * FROM donor WHERE phone=?';
    db.query(getAll, phone, (err, result) => {
        res.json(err ? err : result)
    })
})
app.get('/guest/:phone', (req, res) => {
    const { phone } = req.params;
    const getAll = 'SELECT * FROM guests WHERE phone=?';
    db.query(getAll, phone, (err, result) => {
        res.json(err ? err : result)
    })
})
app.get('/ocod', (req, res) => {
    const name = req.query.key;
    if (name) {
        console.log(name);
        const query = `
        SELECT id, child.firstName,child.lastName, fatherFirstName, fatherLastName, parentsPhone, address, donor.firstName dfn, donor.lastName dln FROM child JOIN donor ON donor.phone = child.dPhone where child.firstname like ? or child.lastName like ? order by firstName, lastName`;
        db.query(query, ['%' + name + '%', '%' + name + '%'], (err, result) => {
            res.json(err ? err : result);
            console.log(err ? err : result);
        })
    }
    else {
        const getAll = 'SELECT id, child.firstName,child.lastName, fatherFirstName, fatherLastName, parentsPhone, address, donor.firstName dfn, donor.lastName dln FROM child JOIN donor ON donor.phone = child.dPhone';
        db.query(getAll, (err, result) => {
            res.json(err ? err : result)
        })
    }
})
app.get('/', (req, res) => {
    res.send('working')
})
app.listen(port, () => {
    //console.log(port);
})