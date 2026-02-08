const BASE_URL = 'https://fakestoreapi.com/auth';

const request = ({ method, endpoint, body = null, failOnStatusCode = true }) => {
  return cy.request({
    method,
    url: `${BASE_URL}${endpoint}`,
    body,
    failOnStatusCode,
  });
};

export const login = (body, failOnStatusCode = true) => request({ method: 'POST', endpoint: '/login', body, failOnStatusCode });