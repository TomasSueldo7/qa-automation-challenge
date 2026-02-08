const BASE_URL = 'https://fakestoreapi.com'

const request = ({ method, endpoint, body = null, failOnStatusCode = true }) => {
  return cy.request({
    method,
    url: `${BASE_URL}${endpoint}`,
    body,
    failOnStatusCode,
  })
}

export const createCart = (body, failOnStatusCode = true) => request({ method: 'POST', endpoint: '/carts', body, failOnStatusCode })
export const updateCart = (id, body, failOnStatusCode = true) => request({ method: 'PUT', endpoint: `/carts/${id}`, body, failOnStatusCode })
export const deleteCart = (id, failOnStatusCode = true) => request({ method: 'DELETE', endpoint: `/carts/${id}`, failOnStatusCode })