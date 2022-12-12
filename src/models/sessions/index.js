const { query } = require("../../db");
const { v4: uuid4 } = require("uuid");

async function getDbSession(session_id) {
    try {
        const result = await query("SELECT * FROM sessions WHERE hash_id = $1", [session_id]);

        return result.rows
    } catch (error) {
        throw error;
    }
}

async function removeSession(session_id){
    try {
        await query("DELETE FROM sessions WHERE hash_id = $1", [session_id]);

    } catch (error) {
        throw error;
    }
}

async function setDbSession(user_id) {
    try {
        const uid = uuid4();
        await query("INSERT INTO sessions(owner,hash_id) VALUES($1,$2)", [user_id, uid]);

        return uid;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getDbSession,
    setDbSession,
    removeSession
}