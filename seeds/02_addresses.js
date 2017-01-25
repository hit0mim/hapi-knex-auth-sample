'use strict';

exports.seed = function(knex, Promise) {

  return knex('addresses').del()
    .then(function () {
      return Promise.all([

        knex('addresses').insert({
          user_id: '72eff7d1-efee-44ff-9e07-2560d7a81033', 
          type: 'home',
          street: 'abc street',
          city: 'Boca Raton',
          state: 'FL',
          postalCode: '33333'
        }),
        knex('addresses').insert({
          user_id: '72eff7d1-efee-44ff-9e07-2560d7a81033', 
          type: 'office',
          street: 'abc road',
          city: 'Boca Raton',
          state: 'FL',
          postalCode: '33333'
        }),
      ]);
    });
};
