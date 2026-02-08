import * as authApi from '../../apis/auth.api.js'
import * as productsApi from '../../apis/products.api.js'
import * as cartsApi from '../../apis/carts.api.js'
import * as usersApi from '../../apis/users.api.js'

export const ecommerceController = {
  getAllUsers: () => usersApi.getAllUsers().then(res => {
    expect(res.status).to.eq(200)
    expect(res.body).to.be.an('array').that.is.not.empty
    return res.body
  }),

  loginUser: (username, password) => authApi.login({ username, password }).then(res => {
    expect(res.status).to.eq(201)
    expect(res.body).to.have.property('token')
    return res.body.token
  }),

  getAllProducts: () => productsApi.getAllProducts().then(res => {
    expect(res.status).to.eq(200)
    expect(res.body).to.be.an('array').that.has.lengthOf(20)
    return res.body
  }),

  getProductById: (id) => productsApi.getProductById(id).then(res => {
    expect(res.status).to.eq(200)
    expect(res.body).to.have.property('id', id)
    return res.body
  }),

  createCart: (userId, products) => cartsApi.createCart({ userId, date: new Date().toISOString(), products }).then(res => {
    expect(res.status).to.eq(201)
    expect(res.body).to.have.property('id')
    return res.body.id
  }),

  updateCart: (cartId, products) => cartsApi.updateCart(cartId, { products }).then(res => {
    expect(res.status).to.eq(200)
    return res.body
  }),

  deleteCart: (cartId) => cartsApi.deleteCart(cartId).then(res => {
    expect(res.status).to.eq(200)
    return res.body
  }),
}