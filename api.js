class Api {

    constructor() {
        this.url = "http://localhost:3000/todos/";
    }

    createNewTodoItem(data) {
        return fetch(this.url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
    }

    getTodoList() {
        return fetch(this.url, {
            method: "GET",
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }).then(resp => resp.json())
    }

    editTodoItem(id, data) {
        return fetch(`${this.url}${id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }).then(resp => resp.json())
    }

    deleteTodoItem(id) {
        return fetch(`${this.url}${id}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
    }

}