function renderTodoList(todos) {
    document.getElementById("todos").innerHTML = ""
    todos.forEach(renderNewItem);
}

function renderNewItem(todo) {
    let todoHTML = /*html*/`
    <div class="itemDiv" id="${todo.id}">
        <li class="todo-item">${todo.msg}</li>
        <i class="fa fa-check completedButton" id ="${todo.id}"></i >
        <i class="fa fa-trash trashButton" id="${todo.id}"></i>
    </div >
    `
    let newItem = document.createElement('div');
    newItem.innerHTML = todoHTML;

    document.getElementById("todos").appendChild(newItem);

    const trashButton = newItem.querySelector('.trashButton');
    trashButton.addEventListener('click', deleteItem);
    const completedButton = newItem.querySelector('.completedButton');
    completedButton.addEventListener('click', checkedItem);
}

function renderDeleteEffect(item) {
    const parentBtn = item.parentElement;

    if (item.className.includes('trashButton') || item.matches('.fa-trash')) {
        parentBtn.classList.add('fallAnimation');
        setTimeout(() => { parentBtn.remove() }, 300);
    }
}

function renderCheckedEffect(item) {
    item.classList.toggle("completed");
}
