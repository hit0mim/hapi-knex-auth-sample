'use strict';
const Boom = require('boom');

const internals = (route, options) => {

    return (request, reply) => {
        internals[options.action](request, reply);
    };
};

internals.fetchById = (request, reply) => {

    const User = request.server.plugins['hapi-bookshelf'].User; 

    console.log(User);
    // User.where({ uuid: request.params.id })
    //     .select('name', 'uuid', 'hasAcknowledge', 'averageTransactionAmount')
    //     .then((users) => {
    //         console.log(users);
    //         if (!result || results.length === 0) {

    //             reply({ error: true, errMessage: 'no user found.'})
    //         }

    //         reply(users);
    //     })
    //     .catch((err) => {

    //         reply(Boom.badRequest, err);
    //     });
    reply('working');
};

internals.deleteById = (request, reply) => {

    const id = request.params.id;

    return reply(`DeleteById is working - ${id}`);
};

internals.create = (request, reply) => {
    
    const User = request.server.plugins['hapi-bookshelf'].User; 
    let payload = request.payload;
    const name = request.payload.name;
    const hasAcknowledge = request.payload.hasAcknowledge;

    
    new User(payload)
        .save()
        .then((data) => {
            reply(data);
        })
        .catch((err) => {
            reply(Boom.badRequest(err));
        }) 
};


internals.getAll = (request, reply) => {
    
    const User = request.server.plugins['hapi-bookshelf'].User; 
    
    console.log(User);
    User.fetchAll()
        .then(function(user) {
            console.log(user);
        }).catch(function(err) {
            console.error(err);
        });
};

internals.handlerName = 'user';

module.exports = internals;