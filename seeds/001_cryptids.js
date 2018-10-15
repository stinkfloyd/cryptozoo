exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('cryptids').del()
    .then(function () {
      // Inserts seed entries
      return knex('cryptids').insert([{
          id: 1,
          name: 'Chupacabra',
          bio: 'Goat Sucker from Puerto Rico, perhaps an escaped lab experiment',
          photo: 'www.chupacabraphoto.com'
        },
        {
          id: 2,
          name: 'Kraken',
          bio: 'A legendary cephalopod-like sea creature that eats ships',
          photo: 'www.krakenphoto.com'
        },
        {
          id: 3,
          name: 'Trunko',
          bio: 'A white furry elephant sea creature, a globster',
          photo: 'www.trunkophoto.com'
        },
        {
          id: 4,
          name: 'Classroom Sloth',
          bio: 'Lives in the classroom, moves when noone is looking',
          photo: 'www.classroomslothphoto.com'
        },
      ]);
    });
};