'use strict';

const Joi = require('joi');

exports.register = function(server, option, next) {

    const apiOne = server.select('api1');

    apiOne.route([{
        
        method: 'POST',
        path: '/users',
        config: {
            description: 'Create a new user.',
            notes: 'Create a new user.',
            tags: ['api1'],
            validate: {
                payload: Joi.object().keys({
                    name: Joi.string(),
                    hasAcknowledge: Joi.boolean(),
                    averageTransactionAmount: Joi.number().precision(2),
                    addresses: Joi.array().items(
                        Joi.object().keys({
                            type: Joi.string().valid(['home', 'work', 'business']),
                            street: Joi.string(),
                            city: Joi.string(),
                            state: Joi.string().length(2),
                            postalCode: Joi.string().length(5)
                        })
                    )
                })
            },
            handler: {
                user: { action: 'create' }
            }
        }
    },
    {
        
        method: 'DELETE',
        path: '/users/{id}',
        config: {
            description: 'Delete a user.',
            notes: 'Delete an existing user by ID.',
            tags: ['api1'],
            handler: {
                user: { action: 'deleteById' }
            }
        }
    }]);

    const apiTwo = server.select('api2');

    apiTwo.route([{
        
        method: 'GET',
        path: '/users',
        config: {
            description: 'Get user by ID',
            notes: 'Get user by ID',
            tags: ['api2'],
            handler: {
                user: { action: 'getById' }
            }
        }
    }]);

    next();
}

exports.register.attributes = {
    pkg: require('./package')
};