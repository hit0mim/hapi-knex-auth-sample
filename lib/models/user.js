'use strict';

const Address = require('./address');

module.exports = (bookshelf) => {

    const User = bookshelf.Model.extend('User', {

        tableName: 'users',
        addresses: () => {
            return this.hasMany('Address');
        },
        foreignKey:'_id'
    });

    return User;
}