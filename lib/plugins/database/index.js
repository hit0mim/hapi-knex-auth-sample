'use strict';

const Joi = require('joi');
const mySql = require('mysql');
const knex = require('knex');

/*
* Schema for the plugin registration opion
*/
const schema = Joi.object().keys({
    knex: Joi.object().keys({
        client: Joi.string().required(),
        connection: Joi.object().keys({
            host: Joi.string().required(),
            user: Joi.string(),
            password: Joi.string().required(),
            database: Joi.string(),
            charset: Joi.string()
        })
    })
});

exports.register = function (server, options, next) {

    const validation = Joi.validate(options, schema);

    if (validation.error) {

        return next(validation.error);
    }

    const Knex = knex(options.knex);

    server.expose('Knex', Knex);

    server.ext({
        type: 'onPostStop',
        method: (_server, _next) => Knex.destroy(_next)
    });

    next();
};

exports.register.attributes = {
    name: 'hapi-knex',
    version: '1.0.0'
};
