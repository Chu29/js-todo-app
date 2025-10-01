'use strict'

const addBtn = document.getElementById('add-btn')
const todoInput = document.getElementById('todo-input')
const todoList = document.getElementById('todo-list')
const pagination = document.getElementById('pagination')

console.log(addBtn)

const todos = []

const showErrorMessage = (message) => {
  const errorMessage = document.querySelector('.error-message')
  errorMessage.textContent = message
  errorMessage.style.display = 'block'
  setTimeout(() => {
    errorMessage.style.display = 'none'
  }, 3000)
}
