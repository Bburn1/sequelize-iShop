'use strict'

const items = []
for (let i = 0; i <30; i++) {
  items.push({
    category_id: Math.trunc((Math.random() * 4)+1),
    type_id: Math.trunc((Math.random() * 4)+1),
    brand_id: Math.trunc((Math.random() * 9)+1),
    model_id: Math.trunc((Math.random() * 9)+1),
    store_id: Math.trunc((Math.random() * 4)+1),
    price: Math.random() * 5000,
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
