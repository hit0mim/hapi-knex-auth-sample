exports.seed = (knex, Promise) => {

    const table = 'users';
    const rows = [

        {
            email: 'test1@test.com',
            password: 'password'
        },
        {
            email: 'test2@test.com',
            password: 'password'
        },
    ];

    return knex(table)
        .del()
        .then(() => {
            return knex.insert(rows).into(table);
        });

};