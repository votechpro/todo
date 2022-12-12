const { Pool } = require("pg");

const path = require("path")

const env = require("dotenv")
env.config({
    path: path.join(__dirname, "..", ".env")
})


const pool = new Pool()

module.exports = {
    query: (text, params) => pool.query(text, params)
}