'use strict'

const items = []
for (let i = 0; i < 20; i++) {
  items.push({
    category_id: Math.trunc(Math.random() * 5),
    type_id: Math.trunc(Math.random() * 5),
    brand_id: Math.trunc(Math.random() * 10),
    model_id: Math.trunc(Math.random() * 10),
    price: (Math.random() * 5000),
    created_at: new Date(),
    updated_at: new Date(),
  })
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Items', items, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {})
  },
}
