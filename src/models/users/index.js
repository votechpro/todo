const { query } = require("../../db");
const User = require("./User");
const bcrypt = require("bcrypt");

async function getUsers() {
    try {
        const result = await query("SELECT id,CONCAT(firstname,' ',lastname) AS name,username FROM users");

        return result.rows.map((rw) => new User(rw.id, rw.name, rw.username));
    } catch (error) {
        throw error
    }
}

async function getUserByUsername(username) {
    try {
        const result = await query("SELECT * FROM users WHERE username=$1", [username]);

        return result.rows.map((rw) => new User(rw.id, rw.name, rw.username, rw.password));
    } catch (error) {
        throw error
    }
}

async function getUserById(id) {
    try {
        const result = await query("SELECT * FROM users WHERE id=$1", [id]);

        return result.rows.map((rw) => new User(rw.id, rw.firstname + " " + rw.lastname, rw.username));
    } catch (error) {
        throw error
    }
}

async function createUser(firstname, lastname, username, password) {
    try {
        const searchedUsers = await getUserByUsername(username);
        const saltRounds = 10;

        if (searchedUsers.length == 0) {
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(password, salt);

            

            const result = await query("INSERT INTO users(firstname, lastname, username, password) VALUES($1,$2,$3,$4) RETURNING *", [firstname, lastname, username, hash]);

            return result.rows;
        } else {
            throw Error("User Already Exists");
        }

    } catch (error) {
        throw error
    }
}

async function checkUserExists(username, password) {
    try {
        const users = await getUserByUsername(username);

        if (users.length === 0) throw Error("This User Doesn't Exist");

        const isPasswordCorrect = await bcrypt.compare(password, users[0].password);

        if (!isPasswordCorrect) throw Error("Password is not Correct");

        return users[0];
    } catch (error) {
        throw error;
    }
}


module.exports = {
    getUsers,
    createUser,
    getUserById,
    checkUserExists
}
