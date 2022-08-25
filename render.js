function renderTodoList(todoList) {
    document.getElementById("todoList").innerHTML = ""
    todoList.forEach(renderNewItem);
}

function renderNewItem(todoItem) {
    const newTodoItemHTML = `
    <div class="todo-item-Div" id="${todoItem.id}">
        <li class="todo-item-li">${todoItem.text}</li>
        <i class="fa fa-check completedButton" id ="${todoItem.id}"></i >
        <i class="fa fa-trash trashButton" id="${todoItem.id}"></i>
    </div >
    `
    const newTodoItem = document.createElement('div');
    newTodoItem.innerHTML = newTodoItemHTML;

    const trashButton = newTodoItem.querySelector('.trashButton');
    trashButton.addEventListener('click', deleteTodoItem);

    const completedButton = newTodoItem.querySelector('.completedButton');
    completedButton.addEventListener('click', checkTodoItem);

    document.getElementById("todoList").appendChild(newTodoItem);
}

function renderDeleteAnimation(todoItem) {
    const todoItemButtonParent = todoItem.parentElement;

    todoItemButtonParent.classList.add('fallAnimation');
    setTimeout(() => { todoItemButtonParent.remove() }, 300);
}

function renderCheckedAnimation(todoItem) {
    todoItem.classList.toggle("completed");
}
