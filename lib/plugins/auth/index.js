'use strict'

const hapiJwt = require('hapi-auth-jwt');

exports.register = function (server, options, next) {
    
    server.register(hapiJwt, (err) => {

        if (err) {
            
            throw err;
        }
    });
    
    server.auth.strategy('token', 'jwt',
        {
            key: process.env.AUTH_CLIENT_SECRET,
            // add validateFunc
            // validateFunc: (decoded, request, callback) => callback(null, true), 
            verifyOptions: { 
                algorithms: [ 'RS256' ],
                audience: process.env.AUTH_AUDIENCE,
                // issuer: process.env.AUTH_URL
            }
        }
    );

    next();
}

exports.register.attributes = {
    name: 'auth-wrapper',
    version: '0.0.1'
};
