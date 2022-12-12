const express = require("express");

const path = require("path");

const cookieParser = require("cookie-parser");

const { checkAuthorizedCookie } = require("./middleware/auth");

const app = express();

const HomeRoute = require("./routes/home/home.route");

const TodoRoute = require("./routes/todos/todos.route");

const SignupRoute = require("./routes/signup/signup.route");

const SignoutRoute = require("./routes/signout/signout.route");


app.set("view engine", "pug");

app.set("views", path.join(__dirname, "views"));

app.use(cookieParser());

app.use(checkAuthorizedCookie)

app.use(express.json());

app.use("/signout", SignoutRoute);

app.use("/signup", SignupRoute);

app.use("/todo", TodoRoute);

// app.get("/",(req,res)=>{
//     req.params 
//     res.clearCookie
//     // res.redirect("/")
// })

app.use(HomeRoute);

module.exports = app;