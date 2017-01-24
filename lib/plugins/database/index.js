'use strict';

const Joi = require('joi');
const mySql = require('mysql');
const Knex = require('knex');

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
            database: Joi.string()
        })
    }),
    models: Joi.array().items(
        Joi.object().keys({
            tableName: Joi.string(),
            modelPath: Joi.string(),
            name: Joi.string()
        })
    )     
});

/*
* Below makes a bookshelf object available 
* through server and request object in hapi.
* @todo Read a path to a model to enable associations 
*/
exports.register = function (server, options, next) {

    const validation = Joi.validate(options, schema);

    if (validation.error) {

        return next(validation.error);
    }

    const conn = Knex(options.knex);
    let bookshelf = require('bookshelf')(conn);

    bookshelf.plugin('registry');
    //server.expose('bookshelf', bookshelf);

    if (options.models) {

        options.models.map((mod) => {
            
            const modelName = mod.name;

            server.expose(modelName, require(mod.modelPath)(bookshelf));
            server.expose(modelName, require(mod.modelPath)(bookshelf));
        });
    }
    
    next();
};

exports.register.attributes = {
    name: 'hapi-bookshelf',
    version: '1.0.0'
};