const express = require('express')
const handlebars = require('express-handlebars')
const { Server } = require('socket.io')

const products = []

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')

app.get('/new-product', (req, res) => {
  res.render('newProduct.handlebars')
})

app.get('/products', (req, res) => {
  console.log('acá si entra')
  res.render('products.handlebars', products)
})

app.post('/products', (req, res) => {
  console.log('pegando a api')
  console.log(req.body)

  res.json({ message: 'Producto creado con éxito' })
})

const httpServer = app.listen(3000, () => {
  console.log(3000)
})

const io = new Server(httpServer)

io.on('connection', socket => {
  console.log(socket.id)

  socket.on('newProduct', product => {
    products.push(product)
    console.log(products)

    socket.broadcast.emit('listProducts', product)
  })
})
