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

// function to save todos to local storage
const saveTodos = () => {
  const todos = []
  document.querySelectorAll('#todo-list li').forEach((li) => {
    const todoText = li.childNodes[1].nodeValue
    const isChecked = li.childNodes[0].checked
    todos.push({ text: todoText, checked: isChecked })
  })
  localStorage.setItem('todos', JSON.stringify(todos))
}

// function to load todos from local storage
const loadTodos = () => {
  // parse todos stored in local storage into a js object
  const todos = JSON.parse(localStorage.getItem('todos'))
  if (todos) {
    todos.forEach((todo) => {
      const li = document.createElement('li')
      const checkbox = document.createElement('input')
      checkbox.type = 'checkbox'
      checkbox.checked = todo.checked
      checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
          li.style.textDecoration = 'line-through'
        } else {
          li.style.textDecoration = 'none'
        }
        saveTodos()
      })

      li.appendChild(checkbox)
      li.appendChild(document.createTextNode(todo.text))

      document.getElementById('todo-list').appendChild(li)

      if (todo.checked) {
        li.style.textDecoration = 'line-through'
      }
    })
  }
}

// loads todos saved in local storage
document.addEventListener('DOMContentLoaded', loadTodos)
addTodoBtn.addEventListener('click', createTodo)
