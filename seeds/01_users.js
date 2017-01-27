exports.seed = (knex, Promise) => {

    const table = 'users';
    const rows = [

        {
            username: 'myUser',
            password: 'password'
        },
        {
            username: 'myUser1',
            password: 'password1'
        },
    ];

    return knex(table)
        .del()
        .then(() => {
            return knex.insert(rows).into(table);
        });

};