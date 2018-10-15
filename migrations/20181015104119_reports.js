exports.up = function (knex, Promise) {
  return knex.schema.createTable(`reports`, (table) => {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments() // id field, auto Primary Key
    table.string(`name`).notNullable()
    table.text(`content`)
    table.timestamp(`reported_at`).notNullable().defaultTo(knex.fn.now())
    table.string(`location`)
    table.integer(`cryptid_id`)
    table.foreign(`cryptid_id`).references(`cryptids.id`).onDelete(`CASCADE`)
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists(`cryptids`)
};