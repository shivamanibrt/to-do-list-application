const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filter = document.querySelector('.filter-todo');

document.addEventListener("DOMContentLoaded", getTodos())

todoBtn.addEventListener("click", function addTodo(e) {
  e.preventDefault()
  if (!todoInput.value) {
    return
  }
  // create the todo div
  const todoDiv = document.createElement("div")
  todoDiv.classList.add("todo")

  // create li and append to todo div
  const newTodo = document.createElement("li")
  newTodo.classList.add("todo-item")
  newTodo.innerText = todoInput.value
  todoDiv.appendChild(newTodo)

  saveTodos(todoInput.value)

  // check btn
  const completeBtn = document.createElement("button")
  // completeBtn.innerText = "Done"
  completeBtn.innerHTML = "<i class='fa-solid fa-check'></i>"
  completeBtn.classList.add("complete-btn")
  todoDiv.appendChild(completeBtn)

  // delete btn
  const deleteBtn = document.createElement("button")
  // deleteBtn.innerText = "Delete"
  deleteBtn.innerHTML = "<i class='fa-solid fa-trash'></i>"
  deleteBtn.classList.add("delete-btn")
  todoDiv.appendChild(deleteBtn)

  // append todoDiv to todoList (main ul)
  todoList.appendChild(todoDiv)

  // empty input field after adding item to list
  todoInput.value = ""
})

todoList.addEventListener("click", function deleteCheck(e) {
  console.log(e.target)

  const item = e.target

  // DELETE
  console.log(item.classList)
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement
    todo.remove()
  }

  // CHECK
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement
    todo.classList.toggle("completed")
  }
})
filter.addEventListener('change', function filterTodo(e) {
  const todos = todoList.childNodes;
  console.log(todos);
  console.log(e.target.value)
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "completed":
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex'
        }
        else {
          todo.style.display = 'none';
        }
        break
      case 'incomplete':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex'
        }
        else {
          todo.style.display = 'none';
        }
        break
      default: todo.style.display = 'none'
    }
  })

})

function saveTodos(todo) {
  // Check if there is anything in storage
  //   if anything is there put in an array
  // push the new item in the array
  // save all to localStorage
  let todos
  if (localStorage.getItem("todos") === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem("todos"))
  }

  todos.push(todo)

  localStorage.setItem("todos", JSON.stringify(todos))
}

function getTodos() {
  let todos
  if (localStorage.getItem("todos") === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem("todos"))
  }

  todos.forEach(function (todo) {
    // create the todo div
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")

    // create li and append to todo div
    const newTodo = document.createElement("li")
    newTodo.classList.add("todo-item")
    newTodo.innerText = todo
    todoDiv.appendChild(newTodo)

    // check btn
    const completeBtn = document.createElement("button")
    // completeBtn.innerText = "Done"
    completeBtn.innerHTML = "<i class='fa-solid fa-check'></i>"
    completeBtn.classList.add("complete-btn")
    todoDiv.appendChild(completeBtn)

    // delete btn
    const deleteBtn = document.createElement("button")
    // deleteBtn.innerText = "Delete"
    deleteBtn.innerHTML = "<i class='fa-solid fa-trash'></i>"
    deleteBtn.classList.add("delete-btn")
    todoDiv.appendChild(deleteBtn)

    // append todoDiv to todoList (main ul)
    todoList.appendChild(todoDiv)
  })
}
