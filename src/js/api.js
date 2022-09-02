class Api {

    constructor() {
        this.url = "http://localhost:3000/todos/";
        this.headers = { "Content-type": "application/json; charset=UTF-8" };
    }

    createTodoItem(data) {
        return fetch(this.url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: this.headers
        })
    }

    getTodoList() {
        return fetch(this.url, {
            method: "GET",
            headers: this.headers
        })
    }

    editTodoItem(id, data) {
        return fetch(`${this.url}${id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: this.headers
        })
    }

    deleteTodoItem(id) {
        return fetch(`${this.url}${id}`, {
            method: "DELETE",
            headers: this.headers
        });
    }

}