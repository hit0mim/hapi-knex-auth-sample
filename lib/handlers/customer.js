'use strict';
const Boom = require('boom');
const uuid = require('uuid');

const internals = (route, options) => {

    return (request, reply) => {
        internals[options.action](request, reply);
    };
};

internals.fetchById = (request, reply) => {
    
    const Knex = request.server.plugins['hapi-knex'].Knex;
    const { id } = request.query;

    let customer; 

    Knex('customers')
        .where('uuid', id)
        .select()
        .then((result) => {
            
            customer = result;

            return Knex('addresses')
                .where('customer_id', id)
                .select()
        }).then((addresses) => {
            
            customer[0].addresses = addresses;

            const response = {
                data: {
                    customer: customer[0]
                }
            };
            reply(response);
        })
        .catch((err) => {

            reply(Boom.badRequest('Invalid query', err));
        });
};

internals.deleteById = (request, reply) => {

    const Knex = request.server.plugins['hapi-knex'].Knex;
  
    const { id } = request.query;
    
    Knex('customers')
        .where('uuid', id)
        .del()
        .then((result) => {

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
    const { name, hasAcknowledge, averageTransactionAmount, created_by } = request.payload;
    let addresses = request.payload.addresses;
    const id = uuid.v4();

    Knex.transaction((trx) => {

        return trx
            .insert({
                name: name, 
                hasAcknowledge: hasAcknowledge, 
                averageTransactionAmount: averageTransactionAmount, 
                uuid: id,
                created_by: created_by
            })
            .into('customers')
            .then((ids) => {
                
                const updatedAddresses = addresses.map((address) => {

                    return Object.assign(address, { customer_id: id });
                });

                return trx.insert(updatedAddresses).into('addresses');
            });
    })
    .then((result) => {

        reply({
            data: id,
            message: `successfully created a customer`
            }).code(201);
    })
    .catch((err) => {

        reply(Boom.badRequest(err));
    });  
};

internals.handlerName = 'customer';

module.exports = internals;