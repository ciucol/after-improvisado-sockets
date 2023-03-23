const socket = io()

const productItem = document.getElementById('product')
const priceItem = document.getElementById('price')

socket.on('listProducts', product => {
  console.log(product)

  productItem.innerHTML = product.title
  priceItem.innerHTML = product.price
})
