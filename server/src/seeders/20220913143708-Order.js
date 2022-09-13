'use strict'

const orders = []
for (let i = 0; i < 5; i++) {
  orders.push({
    code: `100.${i}`,
    date: new Date(),
    customer_id: Math.trunc(Math.random() * 10),
    paid: i % 2 == 0 ? true : false,
    created_at: new Date(),
    updated_at: new Date(),
  })
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Orders', orders, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {})
  },
}
