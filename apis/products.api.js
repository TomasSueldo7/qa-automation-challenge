const BASE_URL = 'https://fakestoreapi.com';

const request = ({ method, endpoint, body = null, failOnStatusCode = true }) => {
  return cy.request({
    method,
    url: `${BASE_URL}${endpoint}`,
    body,
    failOnStatusCode,
  });
};

export const getAllProducts = (failOnStatusCode = true) =>
  request({ method: 'GET', endpoint: '/products', failOnStatusCode })

export const getProductById = (id, failOnStatusCode = true) =>
  request({ method: 'GET', endpoint: `/products/${id}`, failOnStatusCode })