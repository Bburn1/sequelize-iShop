'use strict'

const types = []
for (let i = 0; i < 5; i++) {
  types.push({
    title: `Type #${i}`,
    created_at: new Date(),
    updated_at: new Date(),
  })
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Types', types, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Types', null, {})
  },
}
