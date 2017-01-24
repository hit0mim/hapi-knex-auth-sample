'use strict';

exports.up = (knex) => {
    return knex.schema
        .createTable('users', function(table) {
        table.increments('id').primary();
        table.string('Name');
        table.boolean('HasAckowledge');
        table.string('AverageTransactionAmount');
    });
};
exports.down = function(knex) {
  return knex.schema
    .dropTable('contacts');
};