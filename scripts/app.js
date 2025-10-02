'use strict'
let lists = document.getElementsByTagName('LI')
const addBtn = document.getElementById('add-btn')
const listItem = document.querySelector('ul')

// create a close button and append to each list item
for (let i = 0; i < lists.length; i++) {
  const span = document.createElement('span')
  const closeBtn = document.createTextNode('\u00D7')
  span.className = 'close'
  span.appendChild(closeBtn)
  lists[i].appendChild(span)

  // Create and append the Edit Button
  const editSpan = document.createElement('span')
  const editBtn = document.createTextNode('\u270F')
  editSpan.className = 'edit'
  editSpan.appendChild(editBtn)
  lists[i].appendChild(editSpan)
}

const showErrorMessage = (message) => {
  const errorMessage = document.querySelector('.error-message')
  errorMessage.textContent = message
  errorMessage.style.display = 'block'
  setTimeout(() => {
    errorMessage.style.display = 'none'
  }, 3000)
}

// click on a close button to hide the current list item
const close = document.getElementsByClassName('close')
for (let i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    const div = this.parentElement
    div.style.display = 'none'
  }
}

// add a 'checked' symbol when clicking on a list item
listItem.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    event.target.classList.toggle('checked')
  }
})

// create new list item onclick 'Add' button
const newListItem = () => {
  const li = document.createElement('li')
  const inputValue = document.getElementById('todo-input').value.trim()
  const listContent = document.createTextNode(inputValue)
  li.appendChild(listContent)
  if (inputValue === '') {
    showErrorMessage('You must write something!')
  } else {
    document.getElementById('tasks').appendChild(li)
  }
  document.getElementById('todo-input').value = ''

  const span = document.createElement('SPAN')
  const text = document.createTextNode('\u00D7')
  span.className = 'close'
  span.appendChild(text)
  li.appendChild(span)

  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      const div = this.parentElement
      div.remove()
    }
  }
}

addBtn.addEventListener('click', newListItem)
