'use strict';

module.exports = {
    development: {
        client: process.env.CLIENT,
        connection: {
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PW,
            database: process.env.MYSQL_DB,
            charset: 'utf8_general_ci'
        },
        migrations: {
            tableName: 'knex_migrations'
        },
        useNullAsDefault: true
    }
};