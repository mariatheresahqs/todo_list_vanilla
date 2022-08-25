let nextTodoItemId = 1;
let todoInput;
let submitBtn;

let api = new Api();

initApp();

function initApp() {
    todoInput = document.querySelector('.input');
    submitBtn = document.querySelector('.submit-button');

    submitBtn.addEventListener('click', createNewTodoItem);

    api.getTodoList().then(todoItemsList => {
        if (todoItemsList.length) {
            const lastTodoItemId = todoItemsList[todoItemsList.length - 1].id;
            nextTodoItemId = lastTodoItemId + 1;
            renderTodoList(todoItemsList);
        }
    })
}

function createNewTodoItem(e) {
    e.preventDefault();
    const todoItemText = todoInput.value;
    const newTodoItem = { "text": todoItemText, "id": nextTodoItemId, "isTodoItemDone": false };

    if (todoItemText) {
        api.createNewTodoItem(newTodoItem).then(resp => {
            return resp.json();
        }).then(todoItem => {
            renderNewItem(todoItem);
            nextTodoItemId++;
            todoInput.value = '';
        });
    }
}

function deleteTodoItem({ target }) {
    api.deleteTodoItem(target.id).then(() => {
        renderDeleteAnimation(target);
    });
}

function checkTodoItem({ target }) {
    const todoItemButtonParent = target.parentElement;
    const toggledTodoItemDone = (!todoItemButtonParent.classList.contains("completed"));

    api.editTodoItem(todoItemButtonParent.id, { "isTodoItemDone": toggledTodoItemDone }).then(() => {
        renderCheckedAnimation(todoItemButtonParent);
    });
}

