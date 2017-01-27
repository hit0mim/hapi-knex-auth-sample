'use strict';
const Boom = require('boom');
const uuid = require('uuid');
const Bcrypt = require('bcrypt');

const internals = (route, options) => {

    return (request, reply) => {
        internals[options.action](request, reply);
    };
};


internals.create = (request, reply) => {
    
    const Knex = request.server.plugins['hapi-knex'].Knex;
    const { username, password } = request.payload;
    const id = uuid.v4();
        
    Bcrypt.genSalt(10)
        .then((salt) => {
        Bcrypt.hash(password, salt)
            .then((hashPass) => {
            
            Knex('users').insert({ 
                username,
                password: hashPass,
                })
                .then((data) => {
                    reply({
                        data: data,
                        message: `successfully created a new user ${username}`
                    });
                }).catch((err) => {

                    reply(Boom.badRequest, err);
                });
            });
    });
    



};

internals.handlerName = 'user';

module.exports = internals;