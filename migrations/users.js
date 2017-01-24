
'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('users', (table) => {
        table.increments().primary();
        table.string('name');
        table.boolean('hasAcknowledge');
        table.decimal('averageTransactionAmount', 14, 2);
        table.string('guid', 16).unique();
        table.timestamps('created_at');
    })
    .createTable('addresses', (table) => {
            table.increments().primary();
            table.string('user_id').references('guid').inTable('users');
            
            table.string('street');
            table.string('city');
            table.string('state');
            table.string('postalCode');
    })
};

exports.down = (knex, Promise) => {
    
    return knex.schema.dropTableIfExists('users')
        .dropTableIfExists('addresses');
};