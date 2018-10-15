exports.up = function (knex, Promise) {
  return knex.schema.createTable(`cryptids`, (table) => {
    table.increments() // id field, auto Primary Key
    table.string(`name`).notNullable()
    table.text(`bio`)
    table.string(`photo`)
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists(`cryptids`)
};