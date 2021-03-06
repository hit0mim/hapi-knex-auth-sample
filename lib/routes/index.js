'use strict';

const Joi = require('joi');
const Bcrypt = require('bcrypt');
const verifyUniqueCustomer = require('../pres/customers').verifyUniqueCustomer;
const verifyUniqueUser = require('../pres/users').verifyUniqueUser;
const verifyCredential = require('../pres/users').verifyCredential;
const verifyUser = require('../pres/users').verifyUser;

exports.register = function(server, option, next) {

    const apiOne = server.select('api1');

    apiOne.route([{
        
        method: 'POST',
        path: '/users',
        config: {
            description: 'Create a new user.',
            notes: 'Create a new user.',
            tags: ['api1', 'api'],
            pre: [
                { method: verifyUniqueUser }
            ],
            validate: {
                payload: Joi.object().keys({
                    email: Joi.string().email().required(),
                    password: Joi.string().required()
                })
            },
            handler: {
                user: { action: 'create' }
            }
        }
    },
    {
        
        method: 'POST',
        path: '/users/auth',
        config: {
            description: 'Authenticate a user.',
            notes: 'Authenticate a user.',
            tags: ['api1', 'api'],
            pre: [
                { method: verifyCredential, assign: 'user' }
            ],
            validate: {
                payload: Joi.object().keys({
                    email: Joi.string().email().required(),
                    password: Joi.string().required()
                })
            },
            handler: {
                user: { action: 'authenticate' }
            }
        }
    },
    {
        
        method: 'POST',
        path: '/customers',
        config: {
            description: 'Create a new customer.',
            notes: 'Create a new customer.',
            tags: ['api1', 'api'],
            auth: { 
                strategy: 'token'
            },
            pre: [
                { method: verifyUser },
                { method: verifyUniqueCustomer }
            ],
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
                    ),
                    created_by: Joi.string()
                })
            },
            handler: {
                customer: { action: 'create' }
            }
        }
    },
    {
        
        method: 'GET',
        path: '/customers',
        config: {
            description: 'Get customer by ID',
            notes: 'Get customer by ID',
            tags: ['api1', 'api'],
            auth: {
                strategy: 'token'
            },
            validate: {
                query: {
                    id: Joi.string()
                }
            },
            handler: {
                customer: { action: 'fetchById' }
            }
        }
    },
    {
        
        method: 'DELETE',
        path: '/customers',
        config: {
            description: 'Delete a customer.',
            notes: 'Delete an existing customer by ID.',
            tags: ['api1', 'api'],
            auth: {
                strategy: 'token'
            },
            validate: {
                query: {
                    id: Joi.string()
                }
            },
            handler: {
                customer: { action: 'deleteById' }
            }
        }
    }]);

    const apiTwo = server.select('api2');

    apiTwo.route([{
        
        method: 'GET',
        path: '/entries',
        config: {
            description: 'Fetch customer entry by ID',
            notes: 'Fetch customer entry by ID',
            tags: ['api2', 'api'],
            auth: {
                strategy: 'token'
            },
            validate: {
                query: {
                    id: Joi.string()
                }
            },
            handler: {
                entry: { action: 'fetchById' }
            }
        }
    }]);

    next();
}

exports.register.attributes = {
    name: 'routes',
    version: '1.0.0'
};