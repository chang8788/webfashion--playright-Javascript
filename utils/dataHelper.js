const { faker } = require('@faker-js/faker');

function generateRandomUser() {
  return {
    name: faker.person.fullName(),
    email: `testuser_${Date.now()}_${Math.floor(Math.random() * 1000)}@mailinator.com`,
    password: faker.internet.password(),
    day: '15',
    month: 'May',
    year: '1990',
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    company: faker.company.name(),
    address: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: 'United States',
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode(),
    mobile: faker.phone.number()
  };
}

module.exports = { generateRandomUser };
