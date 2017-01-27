'use strict';

exports.up = (knex, Promise) => {

    return knex
        .schema
        .createTable('users', (table) => {
            table.increments().primary();
            table.string('username').notNullable().unique();
            table.string('password');
            table.timestamp('created_at').notNullable();
        })
        .createTable('customers', (table) => {
            table.increments().primary();
            table.string('created_by').references('username').inTable('users');

            table.string('name').notNullable().unique();
            table.boolean('hasAcknowledge').notNullable().default(false);
            table.decimal('averageTransactionAmount', 14, 2).notNullable();
            table.string('uuid', 50).notNullable().unique();
            table.timestamp('created_at').notNullable();
        })
        .createTable('addresses', (table) => {
            table.increments().primary();
            table.string('customer_id').references('uuid').inTable('customers');

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
        .dropTableIfExists('customers')
        .dropTableIfExists('addresses');
};