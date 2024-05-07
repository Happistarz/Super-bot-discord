const mysql = require('mysql');
const config = require(global.ROOT+'config.json');

// const connection = mysql.createConnection({
//     host: 'poupli.net',
//     user: 'superusr',
//     password: 'sprpass',
//     database: 'superbot'
// })

// connection.connect((err) => {
//     if (err) {
//         console.log('Error connecting to database');
//         return;
//     }
//     console.log('Connected to database');
// })

module.exports = {
    connect() {
        const connection = mysql.createConnection({
            host: config.DB_HOST,
            user: config.DB_USER,
            password: config.DB_PASS,
            database: config.DB_NAME
        })
        connection.connect((err) => {
            if (err) {
                console.log('Error connecting to database');
                return;
            }
            console.log('Connected to database');
        })
        return connection;
    },
    close(connection) {
        connection.end((err) => {
            if (err) {
                console.log('Error closing database connection');
                return;
            }
            console.log('Connection closed');
        })
    },
    // CRUD
    create(connection, table, data) {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if (err) {
                console.log('Error creating data');
                return;
            }
            console.log('Data created');
        })
    },
    read(connection, table, id) {
        connection.query(`SELECT * FROM ${table} WHERE id = ?`, id, (err, result) => {
            if (err) {
                console.log('Error reading data');
                return;
            }
            console.log('Data read');
        })
    },
    update(connection, table, id, data) {
        connection.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, id], (err, result) => {
            if (err) {
                console.log('Error updating data');
                return;
            }
            console.log('Data updated');
        })
    },
    delete(connection, table, id) {
        connection.query(`DELETE FROM ${table} WHERE id = ?`, id, (err, result) => {
            if (err) {
                console.log('Error deleting data');
                return;
            }
            console.log('Data deleted');
        })
    }
}
