'use strict';
const Boom = require('boom');
const uuid = require('uuid');
const Bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');

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
                        message: `successfully created a new user ${username}`,
                    }).code(201);
                }).catch((err) => {

                    reply(Boom.badRequest(err));
                });
            });
    });
};


internals.authenticate = (request, reply) => {

    const user = request.pre.user[0];

    const token = Jwt.sign(
        { id: user.id, username: user.username }, 
        process.env.JWT_SECRET_KEY, 
        { algorithm: 'HS256', expiresIn: "1h" }
    );
    reply({ id_token: token} ).code(201);      

};

internals.handlerName = 'user';

module.exports = internals;