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
    plugins: Joi.array().items(
        Joi.string()
        ).default([]).required(),
    models: Joi.array().items(
        Joi.object().keys({
            tableName: Joi.string(),
            modelName: Joi.string()
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
    const bookshelf = require('bookshelf')(conn);
    const models = options.models;

    if (models) {
        
        models.map((model) => {
            
            const name = model.modelName;
            const bookshelfModel = bookshelf.Model.extend({

                tableName: model.tableName
            });

           server.expose(name, bookshelfModel);
           server.decorate('server', name, bookshelfModel);
           server.decorate('request', name, bookshelfModel);
        });
    }

    next();
};

exports.register.attributes = {
    name: 'hapi-bookshelf',
    version: '1.0.0'
};