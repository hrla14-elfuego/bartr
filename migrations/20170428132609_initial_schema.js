exports.up = function (knex) {
  return knex.schema
    .createTable('Users', function (table) {
      table.increments('id').primary();
      table.string('email').unique().notNullable();
      table.string('name').notNullable();
      table.json('address').notNullable();
      table.integer('serviceId').unsigned().references('id').inTable('Services').notNullable();
    })
    .createTable('Services', function (table) {
      table.increments('id').primary();
      table.string('type').notNullable();
    })
    .createTable('Engagements', function (table) {
      table.increments('id').primary();
      table.integer('customerId').unsigned().references('id').inTable('Users').notNullable();
      table.integer('providerId').unsigned().references('id').inTable('Users').notNullable();
      table.boolean('complete').notNullable();
    })
    .createTable('Messages', function (table) {
      table.increments('id').primary();
      table.integer('engagementId').unsigned().references('id').inTable('Engagements').notNullable();
      table.integer('fromId').unsigned().references('id').inTable('Users').notNullable();
      table.integer('toId').unsigned().references('id').inTable('Users').notNullable();
      table.text('message').notNullable();
    })
    .createTable('Reviews', function (table) {
      table.increments('id').primary();
      table.integer('engagementId').unsigned().references('id').inTable('Engagements').notNullable();
      table.integer('userId').unsigned().references('id').inTable('Users').notNullable();
      table.integer('score').notNullable();
      table.text('review').notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('Users')
    .dropTableIfExists('Services')
    .dropTableIfExists('Engagements')
    .dropTableIfExists('Messages')
    .dropTableIfExists('Reviews');
};
