const { checkUserExists } = require("../../models/users");
const { setDbSession } = require("../../models/sessions");

function httpGetHome(req, res) {
    res.render("login")
}

async function httpPostHome(req, res) {
    try {
        const { username, password } = req.body;

        const user = await checkUserExists(username, password);

        const session_hash = await setDbSession(user.id);

        res.cookie("SESSION_HASH", session_hash);

        res.redirect('/todo');

    } catch (error) {
        res.render("login", {
            data: req.body,
            error: {
                type: "error",
                messages: [error.message]
            }
        })
    }
}

module.exports = {
    httpGetHome,
    httpPostHome
}