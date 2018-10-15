exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('reports').del()
    .then(function () {
      // Inserts seed entries
      return knex('reports').insert([{
            id: 1,
            name: 'Joe Bob Jenkins',
            content: 'Last saturday, Joe Bob tending sheep, when the Chupacabra ate his sheep',
            reported_at: new Date(2018, 10, 13, 9, 22),
            location: 'Oaxaca, MX',
            cryptid_id: 1
          },
          {
            id: 2,
            name: 'Sally',
            content: 'Sally saw a furry elephant swimming in the water',
            reported_at: new Date(2018, 5, 3, 3, 13),
            location: 'Ohio',
            cryptid_id: 3
          },
          {
            id: 3,
            name: 'Pete',
            content: 'Pete saw a kraken',
            reported_at: new Date(2018, 10, 7, 1, 15),
            location: 'Antarctica',
            cryptid_id: 2
          },
          {
            id: 4,
            name: 'Craig',
            content: 'Craig saw a classroom sloth',
            reported_at: new Date(2018, 10, 5, 4, 13),
            location: 'Classroom',
            cryptid_id: 4
          },
        ])
        .then(() => knex.raw(`SELECT setval('reports_id_seq', (SELECT MAX(id) FROM reports));`))
    })
}