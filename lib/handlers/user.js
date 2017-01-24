'use strict';
const Boom = require('boom');

const internals = (route, options) => {

    return (request, reply) => {
        internals[options.action](request, reply);
    };
};

internals.getById = (request, reply) => {

    console.log(request.server.plugins['hapi-bookshelf']);
    const User = request.server.plugins['hapi-bookshelf'].User; 

    User.fetchAll()
        .then((users) => {
            reply(users);
        })
        .catch((err) => {
            reply(Boom.badRequest, err);
        });
};

internals.deleteById = (request, reply) => {

    const id = request.params.id;

    return reply(`DeleteById is working - ${id}`);
};

internals.create = (request, reply) => {
    
    const User = request.server.plugins['hapi-bookshelf'].User; 
    let payload = request.payload;
    
    request.payload.createdAt = new Date();

    new User(payload)
        .save()
        .then((data) => {
            reply(data);
        })
        .catch((err) => {
            reply(Boom.badRequest(err));
        }) 
};

internals.handlerName = 'user';

module.exports = internals;