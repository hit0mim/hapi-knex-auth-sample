'use strict'

const hapiJwt = require('hapi-auth-jwt');

exports.register = function (server, options, next) {
    
    server.register(hapiJwt);
    
    server.auth.strategy('token', 'jwt',
        {
            key: process.env.JWT_SECRET_KEY,
            // add validateFunc
            validateFunc: (decoded, request, callback) => callback(null, true), 
            verifyOptions: { 
                algorithms: [ 'HS256' ],
                audience: process.env.AUTH_AUDIENCE 
            }
        }
    );
    
    next();
}

exports.register.attributes = {
    name: 'auth-wrapper',
    version: '0.0.1'
};
