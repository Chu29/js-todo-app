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
