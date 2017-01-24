'use strict';

const manifest = {
    server: {
        debug: {
            log: ['error'],
            request: ['error']
        }
    },
    connections: [{
        port: 1337,
        host: '0.0.0.0',
        labels: ['api1']
    },
    {
        port: 1338,
        host: '0.0.0.0',
        labels: ['api2']
    }],
    registrations: [
        {
            plugin: 'blipp'
        },
        {
            plugin: 'inert'
        },
        {
            plugin: 'vision'
        },
        {
            plugin: 'hapi-swagger'
        },
        {
            plugin: {
                register: './lib/plugins/database',
                options: {
                    knex: {
                        client: 'mysql',
                        connection: {
                            host: process.env.MYSQL_HOST,
                            user: process.env.MYSQL_USER,
                            password: process.env.MYSQL_PW,
                            database: process.env.MYSQL_DB
                        }
                    },
                    plugins: ['registry'],
                    models: [
                        {
                            tableName: 'users',
                            modelName: 'User'
                        },
                                                {
                            tableName: 'addresses',
                            modelName: 'Address'
                        }
                    ]
                }
            }
        },
        {
            plugin: {
                register: 'hapi-handlers',
                options: {
                    includes: './lib/handlers/**/*.js'
                }
            }
        },
        {
            plugin: './lib/routes'
            
        }
    ]
};

module.exports = manifest; 

