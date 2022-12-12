const { getDbSession } = require("../models/sessions");

async function checkAuthorizedCookie(req, res, next) {
    if (Object.keys(req.cookies).includes("SESSION_HASH")) {
        const session_result = await getDbSession(req.cookies["SESSION_HASH"]);

        if (session_result.length > 0 && !session_result[0].expired) {
            
            if (/^\/todo(?:[\/][1-9]\d*)?$/.test(req.url) || req.url === "/signout") {
                req.u_id = session_result[0].owner

                next()
            } else {
                res.redirect("/todo");
            }
        } else {
            res.clearCookie("SESSION_HASH");
            res.redirect("/");
        }

    } else {
        if (req.url === "/" || req.url === "/signup") {
            next();
        } else {
            res.redirect("/");
        }
    }
}

module.exports = {
    checkAuthorizedCookie
}