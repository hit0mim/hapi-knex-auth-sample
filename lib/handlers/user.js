'use strict';
const Boom = require('boom');
const uuid = require('uuid');

const internals = (route, options) => {

    return (request, reply) => {
        internals[options.action](request, reply);
    };
};

internals.getById = (request, reply) => {

    const Knex = request.server.plugins['hapi-knex'].Knex;

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

    const Knex = request.server.plugins['hapi-knex'].Knex;
  
    const { id } = request.query;
    
    Knex('users')
        .where('uuid', id)
        .del()
        .then((data) => {

            reply({
                data: id,
                message: `successfully deleted user`
            });

        }).catch((err) => {

            reply(Boom.badRequest(err));
        });
};

internals.create = (request, reply) => {
    
    const Knex = request.server.plugins['hapi-knex'].Knex;
    const { name, hasAcknowledge, averageTransactionAmount } = request.payload;
    const id = uuid.v4();

    const insertOperation = Knex('users').insert({
        name: name, 
        hasAcknowledge: hasAcknowledge, 
        averageTransactionAmount: averageTransactionAmount, 
        uuid: id
    }).then((data) => {
        console.log(data)
        reply({
            data: id,
            message: 'successfully created a new user'
        });
    }).catch((err) => {

        reply(Boom.badRequest, err);
    })

};


internals.fetchById = (request, reply) => {
    
    const Knex = request.server.plugins['hapi-knex'].Knex;
  
    const id = request.query.id;
    const getOperation = Knex('users')
        .where('uuid', id)
        .select('name', 'hasAcknowledge', 'averageTransactionAmount', 'uuid', 'created_at')
        .then((data) => {

        if(!data || data.length === 0) {

            reply({ 
                error: true, 
                errMessage: 'no user found'
            });
        }
        reply(data);
    }).catch((err) => {

        reply(Boom.badRequest(err));
    });
};

internals.handlerName = 'user';

module.exports = internals;