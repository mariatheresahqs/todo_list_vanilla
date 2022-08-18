// GLOBALS
var nextId = 1;

// SELECTORS
const input = document.querySelector('.input');
const submitBtn = document.querySelector('.submit-button');

submitBtn.addEventListener('click', createTodoItem);

// -----------------------------------  INITIALIZE AND CREATE TODOS -----------------------------------------
initTodoList();

function initTodoList() {
    getTodos().then(todos => {
        const lastTodo = todos[todos.length - 1].id;
        if (todos.length) {
            nextId = lastTodo + 1;
            renderListTodo(todos);
        }
    })
}

function createDiv(newItemString) {
    let div = document.createElement('div');
    div.innerHTML = newItemString.trim();
    return div.firstChild;
}

function createTodoItem(e) {
    e.preventDefault();
    let todoText = input.value;
    let isChecked = false;
    if (todoText) {
        createTodo({ "msg": todoText, "id": nextId, "isChecked": isChecked }).then(resp => {
            return resp.json();
        }).then(todo => {
            renderNewItem(todo);
            nextId++;
            input.value = '';
        });
    }
}

// -----------------------------------  DELETE -----------------------------------------
function deleteItem(e) {
    const item = e.target;
    deleteTodo(item.id).then(resp => {
        renderDeleteEffect(item);
    });
}

// -----------------------------------  CHECK -----------------------------------------
function checkedItem(e) {
    const item = e.target;
    const parentBtn = item.parentElement;

    const completed = (!parentBtn.classList.contains("completed"));

    editTodo(parentBtn.id, { "isChecked": completed }).then(resp => {
        parentBtn.classList.toggle("completed");
    });
}

