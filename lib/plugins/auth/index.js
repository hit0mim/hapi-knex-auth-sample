'use strict'

const hapiJwt = require('hapi-auth-jwt');

exports.register = function (server, options, next) {
    
    server.register(hapiJwt);
    
    server.auth.strategy('token', 'jwt',
        {
            key: process.env.JWT_SECRET_KEY,
            validateFunc: (decoded, request, callback) => callback(null, true), // This should be replaced with a more robust function
            verifyOptions: { algorithms: [ 'HS256' ] }
        }
    );
    
    next();
}

exports.register.attributes = {
    name: 'auth-wrapper',
    version: '0.0.1'
};
