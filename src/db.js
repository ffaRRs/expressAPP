require("dotenv").config();

const { Client } = require("pg");

const client = new Client({
    user: "postgres",
    password: "ffarr15051990",
    host: "localhost",
    port: 5432,
    database: "express_db",
});

client.connect(err => {
    if (err) {
      console.error('connection error', err.stack);
    } else {
      console.log('connected');
    }
});


module.exports = client;