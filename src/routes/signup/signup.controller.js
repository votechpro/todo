const { createUser } = require("../../models/users");
const { setDbSession } = require("../../models/sessions");

function httpGetSignup(req, res) {
    res.render("signup")
}

async function httpPostSignup(req, res) {
    try {
        
        const results = await createUser(req.body.firstname, req.body.lastname, req.body.username, req.body.password);

        

        const session_hash = await setDbSession(results[0].id)

        res.cookie("SESSION_HASH", session_hash);

        res.redirect("/");


    } catch (error) {
        res.render("signup", {
            data: req.body, error: {
                type: "error",
                messages: [error.message]
            }
        })

    }
    
}


module.exports = {
    httpGetSignup,
    httpPostSignup
}