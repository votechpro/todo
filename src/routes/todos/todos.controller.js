const { getUserTodos, getTodoAssignedPerson, createTodo, modifyTodoState } = require("../../models/todos");
const { getUserById } = require("../../models/users");

async function httpGetTodos(req, res) {
    try {

        const user = await getUserById(req.u_id);
        const todos = await getUserTodos(req.u_id);
        const staff = getTodoAssignedPerson(req.u_id);

        res.render("todos", {
            data: {
                todos,
                staff,
                user
            },
            error: null
        });

    } catch (error) {
        res.render("todos", {
            data: null,
            error: {
                type: "error",
                messages: [error.message]
            }
        });
    }
}

async function httpPostTodo(req, res) {
    try {
        await createTodo(req.body, req.u_id);

        res.redirect("/todo")
    } catch (error) {
        res.render("todos", {
            data: null,
            error: {
                type: "error",
                messages: [error.message]
            }
        });
    }
}

async function httpModifyTodo(req, res) {
    try {
        await modifyTodoState(req.params.id);
        res.redirect("/todo")
    } catch (error) {
        res.render("todos", {
            data: null,
            error: {
                type: "error",
                messages: [error.message]
            }
        });
    }
}

module.exports = {
    httpGetTodos,
    httpPostTodo,
    httpModifyTodo
}