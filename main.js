var nextId = 1;
var input;
var submitBtn;

initApp();

function initApp() {
    input = document.querySelector('.input');
    submitBtn = document.querySelector('.submit-button');

    submitBtn.addEventListener('click', createTodoItem);

    apiGetTodoList().then(todos => {
        if (todos.length) {
            const lastIDTodoItem = todos[todos.length - 1].id;
            nextId = lastIDTodoItem + 1;
            renderTodoList(todos);
        }
    })
}

function createTodoItem(e) {
    e.preventDefault();
    let todoText = input.value;
    let isChecked = false;
    if (todoText) {
        apiCreateTodoItem({ "msg": todoText, "id": nextId, "isChecked": isChecked }).then(resp => {
            return resp.json();
        }).then(todo => {
            renderNewItem(todo);
            nextId++;
            input.value = '';
        });
    }
}

function deleteItem({ target }) {
    apiDeleteTodo(target.id).then(resp => {
        renderDeleteEffect(target);
    });
}

function checkedItem({ target }) {
    const parentBtn = target.parentElement;
    const completed = (!parentBtn.classList.contains("completed"));

    apiEditTodo(parentBtn.id, { "isChecked": completed }).then(resp => {
        renderCheckedEffect(parentBtn);
    });
}

