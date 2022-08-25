function apiCreateNewTodoItem(data) {
    return fetch("http://localhost:3000/todos", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });
}

function apiGetTodoList() {
    return fetch("http://localhost:3000/todos", {
        method: "GET",
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then(resp => resp.json())
}

function apiEditTodoItem(id, data) {
    return fetch(`http://localhost:3000/todos/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then(resp => resp.json())
}

function apiDeleteTodoItem(id) {
    return fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });
}