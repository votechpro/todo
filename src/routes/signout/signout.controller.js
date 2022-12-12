const { removeSession } = require("../../models/sessions");

async function httpPostSignout(req, res) {
    try {
        await removeSession(req.cookies["SESSION_HASH"]);
        res.redirect("/todo");
    } catch (error) {
        res.render("todos", {
            data: null,
            error: {
                type: "error",
                messages: [error.message]
            }
        })
    }
}

module.exports = {
    httpPostSignout
}