'use strict';

const User = require('./user');

module.exports = (bookshelf) => {

    const Address = bookshelf.Model.extend('Address', {

        tableName: 'addresses',
        users: () => {
            return this.belongsTo(User);
        }
    });

    return Address;
}