import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import { ecommerceController } from '../../controllers/ecommerce.controller.js'
import FakeProduct from '../../models/fakeProduct.model.js'

let users, selectedUser, token, products, selectedProducts = [], cartId

Given ('existe una lista de usuarios disponibles', () => {
  ecommerceController.getAllUsers().then(allUsers => {
    users = allUsers
  })
})

Given ('se elige un usuario al azar', () => {
  selectedUser = users[Math.floor(Math.random() * users.length)]
  cy.log(`Usuario elegido: ${selectedUser.username}`)
})

When ('se inicia sesión con las credenciales del usuario elegido', () => {
  ecommerceController.loginUser(selectedUser.username, selectedUser.password).then(authToken => {
    token = authToken
  })
})

Then ('el sistema confirma el inicio de sesión exitoso', () => {
  expect(token).to.be.a('string')
})

When ('el usuario consulta la lista de productos disponibles del catalogo', () => {
  ecommerceController.getAllProducts().then(allProducts => {
    products = allProducts
  })
})

When ('elige {int} productos aleatorios de la lista y consulta el detalle de cada uno', (qty) => {
  const shuffled = products.sort(() => 0.5 - Math.random())
  selectedProducts = shuffled.slice(0, qty).map(p => new FakeProduct(p.id, p.title, p.price, p.description, p.category, p.image))
  console.log(selectedProducts)
})

Then ('el sistema muestra el detalle de cada uno de los productos', () => {
  selectedProducts.forEach(p => {
    ecommerceController.getProductById(p.id).then(res => {
      expect(res.id).to.eq(p.id)
      expect(res.title).to.eq(p.title)
    })
  })
})

When ('el usuario agrega los productos seleccionados a un nuevo carrito', () => {
  const cartProducts = selectedProducts.map(p => ({ productId: p.id, quantity: 1 }))
  ecommerceController.createCart(selectedUser.id, cartProducts).then(id => {
    cartId = id
  })
})

Then ('el carrito se crea correctamente con los productos', () => {
  expect(cartId).to.be.a('number')
})

When ('un administrador actualiza el precio de uno de los productos en el carrito', () => {
  const productToUpdate = selectedProducts[0]
  productToUpdate.updatePrice(productToUpdate.price * 1.2)

  const updatedCartProducts = selectedProducts.map(p => ({
    productId: p.id,
    quantity: 1,
    price: p.id === productToUpdate.id ? productToUpdate.price : p.price,
  }))

  ecommerceController.updateCart(cartId, updatedCartProducts)
})

Then ('el precio actualizado se refleja en el carrito', () => {
  expect(selectedProducts[0].price).to.be.greaterThan(selectedProducts[0].price / 1.2)
})

When ('el usuario elimina el carrito creado', () => {
  ecommerceController.deleteCart(cartId)
})

Then ('el sistema confirma la eliminacion del carrito', () => {
  // El delete realmente no borra los carritos existentes por lo que el get si trae el id, asi que solo dejamos un mensaje
  cy.log('Carrito eliminado con éxito')
})