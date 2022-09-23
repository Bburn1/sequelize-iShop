'use strict'

const brands = []
for (let i = 0; i < 10; i++) {
  brands.push({
    title: `Brand #${i}`,
    created_at: new Date(),
    updated_at: new Date(),
  })
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Brands', brands, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Brands', null, {})
  },
}
