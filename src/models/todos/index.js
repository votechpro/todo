const { query } = require("../../db");

async function createTodo(todo, user_id) {
    try {
        if (todo.title == "" || todo.description == "" || todo.due_date == "") {
            throw Error("Title, Description and Due Date should not be empty");
        }

        if (todo.assigned_to == "") {
            todo.assigned_to = user_id;
        }

        await query("INSERT INTO todos(title, description, due_date, assigned_to, owner) VALUES($1,$2,$3,$4,$5)", [todo.title, todo.description, new Date(todo.due_date), todo.assigned_to == "" ? null : todo.assigned_to, user_id]);
    } catch (error) {
        throw error
    }
}

async function getUserTodos(user_id) {
    try {
        const result = await query(`SELECT t.id AS "id",title,description,TO_CHAR(due_date, 'dd-mm-yyyy') AS "due_date",(SELECT CONCAT(x.firstname,' ',x.lastname,CASE WHEN x.id=u.id THEN ' (Me)' ELSE '' END) AS "assigned_to" from users x JOIN todos y ON x.id = y.assigned_to WHERE y.owner = u.id and t.assigned_to = x.id and y.id = t.id),completed FROM todos t JOIN users u ON t.owner = u.id WHERE t.owner = $1 OR t.assigned_to = $1 ORDER BY t.id ASC;`, [user_id]);

        return result.rows;
    } catch (error) {
        throw error;
    }
}

async function getTodoAssignedPerson(user_id) {
    try {
        const result = await query(`SELECT DISTINCT CONCAT(firstname,' ',lastname) AS "name",u.id AS "id" FROM users u JOIN todos t ON u.id=t.assigned_to WHERE t.owner = $1`, [user_id]);

        return result.rows;
    } catch (error) {
        throw error;
    }
}

async function modifyTodoState(id) {
    try {
        await query("UPDATE todos SET completed = NOT completed WHERE id = $1", [id]);
    } catch (error) {
        throw error
    }
}

module.exports = {
    createTodo,
    getUserTodos,
    getTodoAssignedPerson,
    modifyTodoState
}