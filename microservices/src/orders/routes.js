const config = require("./config.json");
const mysql = require("mysql");

// const createTcpPool = async config => {
//     const dbConfig = {
//       host: config.rds_host, // e.g. '127.0.0.1'
//       port: '3306', // e.g. '3306'
//       user: config.rds_user, // e.g. 'my-db-user'
//       password: config.rds_password, // e.g. 'my-db-password'
//       database: 'store',
//     };
//     // Establish a connection to the database.
//     return mysql.createPool(dbConfig);
//   };

const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db,
});
connection.connect();

async function all_orders(req, res) {
    connection.query(
        `SELECT id, date, cost, item
        FROM orders`,
        function (error, results, fields) {
            if (error) {
                console.log(error);
                res.json({ error: error });
            } else if (results) {
                res.json({ results: results });
            }
        }
    );
}

async function order(req, res) {
    const id = req.query.id
    connection.query(
        `SELECT id, date, cost, item
        FROM orders
        WHERE id = '${id}'
        `,
        function (error, results, fields) {
            if (error) {
                console.log(error);
                res.json({ error: error });
            } else if (results) {
                res.json({ results: results });
            }
        }
    );
}

module.exports = {
    all_orders,
    order
};
