'use strict'

const stores = []
for (let i = 0; i < 5; i++) {
  stores.push({
    title: `Store #${i}`,
    created_at: new Date(),
    updated_at: new Date(),
  })
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Stores', stores, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Stores', null, {})
  },
}
