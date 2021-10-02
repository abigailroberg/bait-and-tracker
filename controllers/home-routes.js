const router = require('express').Router();
const sequelize = require('../config/connection');
// TODO: Need to require models

router.get('/', (req, res) => {
  const fishes = [
    {
      id: 1, 
      length: 12,
      weight: 5,
      pictures: [
        'http://placekitten.com/48/36',
        'http://placekitten.com/48/36',
        'http://placekitten.com/48/36',
        'http://placekitten.com/48/36',
        'http://placekitten.com/48/36'
      ]
    },
    {
      id: 2, 
      length: 10,
      weight: 8,
      pictures: [
        'http://placekitten.com/48/36',
        'http://placekitten.com/48/36',
        'http://placekitten.com/48/36'
      ]
    },
    {
      id: 3, 
      length: 8,
      weight: 8,
      pictures: [
        'http://placekitten.com/48/36',
        'http://placekitten.com/48/36',
        'http://placekitten.com/48/36',
        'http://placekitten.com/48/36'
      ]
    },
    {
      id: 4, 
      length: 7,
      weight: 8,
      pictures: [
        'http://placekitten.com/48/36',
        'http://placekitten.com/48/36',
        'http://placekitten.com/48/36'
      ]
    },
    {
      id: 5, 
      length: 4,
      weight: 8,
      pictures: [
        'http://placekitten.com/48/36',
        'http://placekitten.com/48/36',
        'http://placekitten.com/48/36'
      ]
    }
  ]

  res.render('homepage', {
    fishes
  });
});

  // .then(dbFishData => {
  //   const fishes = dbFishData.map(fish => fish.get({ plain: true }));

  //   res.render('homepage', {
  //     fishes
  //   });
  // })
  // .catch(err => {
  //   console.log(err);
  //   res.status(500).json(err);
  // });
//

module.exports = router;