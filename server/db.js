const mysql = require('mysql')

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '123456',
    database: 'airbnb',
});

db.connect(err => {
    if (err) {
        return console.log("Connect has been cancel", err);
    }
    console.log("Data has been seccessfuly connected");
})

const SQL = (q) => {
    return new Promise((resolve, reject) => {
        db.query(q, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}


module.exports = SQL


