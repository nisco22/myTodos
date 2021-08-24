// Targeting Html Elements (Using Selectors)
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const todoFilter = document.querySelector('.todo-filter');


//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodos);
todoList.addEventListener('click', deleteCheck);
todoFilter.addEventListener('click', selectTodos);


//Functions
function addTodos(e){
    e.preventDefault();
    //Creating TODO Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo-div');

    //Creating TODO li
    const todoItem = document.createElement('li');
    todoItem.innerText = todoInput.value;
    todoItem.classList.add('todo-item');
    todoDiv.appendChild(todoItem);


    //Creating TODO check/complete
    const todoComplete = document.createElement('button');
    todoComplete.innerHTML = '<i class="fas fa-check"></i>';
    todoComplete.classList.add('todo-complete');
    todoDiv.appendChild(todoComplete);

    //Creating TODO trash
    const todoTrash = document.createElement('button');
    todoTrash.classList.add('todo-trash');
    todoTrash.innerHTML = "<i class='fas fa-trash'></i>";
    todoDiv.appendChild(todoTrash);

    //Appending TODO div to document
    todoList.appendChild(todoDiv);

    //Clearing Search text
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    //Delete todo-div
    if(item.classList[0] === 'todo-trash'){
        const todo = item.parentElement;
        //Add animation
        todo.classList.add('fall')
        todo.addEventListener('transitionend', ()=>{
            todo.remove();
        })
    }

    //Check completed task
    if(item.classList[0] === "todo-complete"){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function selectTodos(e){
    const todos = todoList.childNodes;

    todos.forEach(todo=>{
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;

            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

//Saving to Local Storage
function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  
  function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
      //Create todo div
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      //Create list
      const newTodo = document.createElement("li");
      newTodo.innerText = todo;
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);
      todoInput.value = "";
      //Create Completed Button
      const completedButton = document.createElement("button");
      completedButton.innerHTML = `<i class="fas fa-check"></i>`;
      completedButton.classList.add("complete-btn");
      todoDiv.appendChild(completedButton);
      //Create trash button
      const trashButton = document.createElement("button");
      trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
      trashButton.classList.add("trash-btn");
      todoDiv.appendChild(trashButton);
      //attach final Todo
      todoList.appendChild(todoDiv);
    });
  }
