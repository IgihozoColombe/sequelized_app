'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.bulkInsert(
    'Users',
    [
      {
        id:1,
        name: 'Colombe',
        email: 'colombe@gmail.com',
        password: 'colombe',
        age: 25,
        address: "Kigali",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:2,
        name: 'Igihozo',
        email: 'igihozo@gmail.com',
        password: 'marie',
        age: 25,
        address: "Muhanga",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]
  )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
