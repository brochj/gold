const date = new Date();

const files = [
  {
    id: 1,
    name: '1.jpg',
    path: '1.jpg',
    created_at: date,
    updated_at: date,
  },
  {
    id: 2,
    name: '2.jpg',
    path: '2.jpg',
    created_at: date,
    updated_at: date,
  },
  {
    id: 3,
    name: '3.jpg',
    path: '3.jpg',
    created_at: date,
    updated_at: date,
  },
  {
    id: 4,
    name: '4.jpg',
    path: '4.jpg',
    created_at: date,
    updated_at: date,
  },
  {
    id: 5,
    name: '5.jpg',
    path: '5.jpg',
    created_at: date,
    updated_at: date,
  },
  {
    id: 6,
    name: '6.jpg',
    path: '6.jpg',
    created_at: date,
    updated_at: date,
  },
  {
    id: 7,
    name: '1.png',
    path: '1.png',
    created_at: date,
    updated_at: date,
  },
  {
    id: 8,
    name: '2.png',
    path: '2.png',
    created_at: date,
    updated_at: date,
  },
  {
    id: 9,
    name: '3.png',
    path: '3.png',
    created_at: date,
    updated_at: date,
  },
  {
    id: 10,
    name: '4.png',
    path: '4.png',
    created_at: date,
    updated_at: date,
  },
  {
    id: 11,
    name: '5.png',
    path: '5.png',
    created_at: date,
    updated_at: date,
  },
  {
    id: 12,
    name: '6.png',
    path: '6.png',
    created_at: date,
    updated_at: date,
  },
];
module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('recipe_file', files, {});
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "recipe_file_id_seq" RESTART WITH ${files.length + 1}`
    );
  },
  down: queryInterface => queryInterface.bulkDelete('recipe_file', null, {}),
};
