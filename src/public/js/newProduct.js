const socket = io()

const newProductForm = document.getElementById('newProduct')

newProductForm.addEventListener('submit', e => {
  e.preventDefault()

  const data = new FormData(newProductForm)
  const obj = {}

  data.forEach((value, key) => (obj[key] = value))

  // socket.emit('newProduct', obj)

  console.log('cliente')
  fetch('/products', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(obj),
  })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.log(error))
})
