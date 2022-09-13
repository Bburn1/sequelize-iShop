'use strict'

const customers = []
for (let i = 0; i < 10; i++) {
  customers.push({
    name: `Customer #${i}`,
    email: `customer${i}@gmail.com`,
    created_at: new Date(),
    updated_at: new Date(),
  })
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Customers', customers, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Customers', null, {})
  },
}
