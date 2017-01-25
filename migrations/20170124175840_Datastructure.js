'use strict';

exports.up = (knex, Promise) => {

    return knex
        .schema
        .createTable('users', (table) => {
            table.increments().primary();
            table.string('name').notNullable().unique();
            table.boolean('hasAcknowledge').notNullable().default(false);
            table.decimal('averageTransactionAmount', 14, 2).notNullable();
            table.string('uuid', 50).notNullable().unique();
            table.timestamp('created_at').notNullable();
        })
        .createTable('addresses', (table) => {
            table.increments().primary();
            table.string('user_id').references('uuid').inTable('users');

            table.string('type').notNullable();
            table.string('street').notNullable();
            table.string('city').notNullable();
            table.string('state').notNullable();
            table.string('postalCode').notNullable();
            table.timestamp('created_at').notNullable();
        });
};

exports.down = (knex, Promise) => {
    
    return knex
        .schema
        .dropTableIfExists('users')
        .dropTableIfExists('addresses');
};