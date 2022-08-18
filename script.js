// GLOBALS
var nextId = 1;

// SELECTORS
const input = document.querySelector('.input');
const submitBtn = document.querySelector('.submit-button');

submitBtn.addEventListener('click', createTodoItem);

// -----------------------------------  INITIALIZE AND CREATE TODOS -----------------------------------------
function initTodoList() {
    getTodos().then(todos => {
        if (todos.length > 0) {
            nextId = todos[todos.length - 1].id + 1;
            renderListTodo(todos);
        }
    })
}

function getTodos() {
    return fetch("http://localhost:3000/todos", {
        method: "GET",
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then(resp => resp.json())
}

function renderListTodo(todos) {
    document.getElementById("todos").innerHTML = ""
    todos.forEach(todo => {
        let todoHTML = /*html*/`
            <div class="itemDiv" id="${todo.id}">
                <li class="todo-item">${todo.msg}</li>
                <i class="fa fa-check completedButton" id ="${todo.id}"></i >
                <i class="fa fa-trash trashButton" id="${todo.id}"></i>
            </div >
            `
        let nodo = nodeHtml(todoHTML);
        document.getElementById("todos").appendChild(nodo);
        const completedButton = nodo.querySelector('.completedButton');
        const trashButton = nodo.querySelector('.trashButton');
        trashButton.addEventListener('click', deleteItem);
        completedButton.addEventListener('click', checkedItem);

    });
}

function nodeHtml(htmlString) {
    let div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

function createTodo(data) {
    return fetch("http://localhost:3000/todos", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });
}

function createTodoItem(e) {
    e.preventDefault();
    let todoText = input.value;
    let isChecked = false;
    if (todoText) {
        createTodo({ "msg": todoText, "id": nextId, "isChecked": isChecked }).then(resp => {
            nextId++;
            input.value = '';
        });
    }
}

initTodoList();

// -----------------------------------  DELETE -----------------------------------------
function deleteItem(e) {
    const item = e.target;
    deleteTodo(item.id).then(resp => {
        renderDeleteEffect(item);
    });
}

function deleteTodo(id) {
    return fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });
}

function renderDeleteEffect(item) {
    const parentBtn = item.parentElement;

    if (item.className.includes('trashButton') || item.matches('.fa-trash')) {
        parentBtn.classList.add('fallAnimation');
        setTimeout(() => { parentBtn.remove() }, 300);
    }
}

// -----------------------------------  CHECK -----------------------------------------
function checkedItem(e) {
    const item = e.target;
    const parentBtn = item.parentElement;

    // console.log(item, parentBtn, this);
    parentBtn.classList.toggle("completed");
    const completed = parentBtn.classList[1] === "completed" ? true : false;
    // console.log(completed);

    // editTodo(parentBtn.id, { "isChecked": completed }).then(resp => {
    console.log(parentBtn.id, completed, { "isChecked": completed });
    // });
}

function editTodo(id, data) {
    return fetch(`http://localhost:3000/todos/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then(resp => resp.json())
}
