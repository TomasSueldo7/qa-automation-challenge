const BASE_URL = 'https://fakestoreapi.com';

const request = ({ method, endpoint, body = null, failOnStatusCode = true }) => {
  return cy.request({
    method,
    url: `${BASE_URL}${endpoint}`,
    body,
    failOnStatusCode,
  });
};

export const getAllUsers = (failOnStatusCode = true) => request({ method: 'GET', endpoint: '/users', failOnStatusCode });