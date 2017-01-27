exports.seed = (knex, Promise) => {

    const table = 'customers';
    const rows = [

        {
            name: 'Test Name',
            hasAcknowledge: true,                   
            averageTransactionAmount: 1000.20,
            uuid: '72eff7d1-efee-44ff-9e07-2560d7a81033',
            created_by: 'myUser',
        },
        {
            name: 'Another Name',
            hasAcknowledge: false,                   
            averageTransactionAmount: 1500.20,
            uuid: '86eff7d1-efee-44ff-9e07-2560d7a5612',
            created_by: 'myUser1'
        }
    ];

    return knex(table)
        .del()
        .then(() => {
            return knex.insert(rows).into(table);
        });

};