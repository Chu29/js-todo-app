'use strict'

const addTodoBtn = document.getElementById('add-btn')

// function to create a new todo item
const createTodo = () => {
  const newTodo = document.getElementById('new-todo').value
  if (newTodo.trim() === '') return

  const li = document.createElement('li')
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      li.style.textDecoration = 'line-through'
    } else {
      li.style.textDecoration = 'none'
    }
    saveTodos()
  })

  li.appendChild(checkbox)
  li.appendChild(document.createTextNode(newTodo))

  document.getElementById('todo-list').appendChild(li)
  document.getElementById('new-todo').value = ''

  saveTodos()
}

// loads todos saved in local storage
document.addEventListener('DOMContentLoaded', loadTodos)
addTodoBtn.addEventListener('click', createTodo)
