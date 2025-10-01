'use strict'

const addBtn = document.getElementById('add-btn')
const todoInput = document.getElementById('todo-input')
const todoList = document.getElementById('todo-list')
const pagination = document.getElementById('pagination')

const todos = [] // stores the tasks
const itemsPerPage = 5
let currentPage = 1

const showErrorMessage = (message) => {
  const errorMessage = document.querySelector('.error-message')
  errorMessage.textContent = message
  errorMessage.style.display = 'block'
  setTimeout(() => {
    errorMessage.style.display = 'none'
  }, 3000)
}

const renderPagination = () => {}

const editTask = (index, li, taskText) => {
  const input = document.createElement('input')
  input.type = 'text'
  input.value = todos[index]
  input.className = 'todo-text'

  // create save btn
  const saveBtn = document.createElement('button')
  const deleteBtn = document.createElement('button')
  saveBtn.className = 'save-btn'
  saveBtn.textContent = 'save'
  deleteBtn.className = 'delete-btn'
  deleteBtn.textContent = 'delete'

  // replace the task text and edit with the current input

  li.innerHTML = ''
  li.appendChild(input)
  li.appendChild(saveBtn)
  li.appendChild(deleteBtn)

  saveBtn.addEventListener('click', () => {
    const updatedTask = input.value.trim()
    if (updatedTask !== '') {
      todos[index] = updatedTask
      todoRender()
    } else {
      showErrorMessage('Task cannot be empty.')
    }
  })
}

const deleteTask = (index) => {
  if ((currentPage - 1) * itemsPerPage >= todos.length) {
    currentPage = Math.max(currentPage - 1, 1)
  }
  todos.splice(index, 1)
  todoRender()
  renderPagination()
}

const todoRender = () => {
  todoList.innerHTML = ''

  // get task for current page
  const start = (currentPage - 1) * itemsPerPage
  const end = start + itemsPerPage
  const currentTodos = todos.slice(start, end)

  // render tasks
  currentTodos.forEach((task, index) => {
    const li = document.createElement('li')
    li.className = 'todo-item'

    // task content
    const taskText = document.createElement('span')
    taskText.className = 'todo-text'
    taskText.textContent = task

    // edit btn
    const editBtn = document.createElement('button')
    editBtn.className = 'edit-btn'
    editBtn.textContent = 'Edit'
    editBtn.addEventListener('click', () => {
      editTask(start + index, li, taskText)
    })

    // delete btn
    const deleteBtn = document.createElement('button')
    deleteBtn.className = 'delete-btn'
    deleteBtn.textContent = 'Delete'
    deleteBtn.addEventListener('click', () => {
      deleteTask(start + index)
    })

    li.appendChild(taskText)
    li.appendChild(editBtn)
    li.appendChild(deleteBtn)
    todoList.appendChild(li)
  })
}

// event listener
addBtn.addEventListener('click', () => {
  const task = todoInput.value.trim()
  if (task === '') {
    showErrorMessage('Please enter a task.')
    return
  }

  todos.unshift(task) // add task to the todos array
  todoInput.value = ''
  currentPage = 1
  todoRender()
})
