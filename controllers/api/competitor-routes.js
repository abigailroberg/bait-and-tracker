const router = require('express').Router()
const { Competitor, Fish } = require('../../models')

//CRUD actions for Competitor model 
//relational db structure = (" one-to-many 'Competitor' -> 'Fish' ")
//================================================================================================

//GET route for all competitors (including fish caught information) : /api/competitors
router.get('/', (req, res) => {
    //get all competitors with corresponding fish caught for each competitor
    Competitor.findAll({
        attributes: ['id', 'name', 'email', 'phone'],
        //should we order the response in terms of which parameter? I chose weight here...
        order: [['id', 'DESC']],
        include: [
            {
                model: Fish,
                attributes: ['length', 'weight', 'picture'],
                order: [['weight', 'DESC']]
            }
        ]
    })
    .then(dbCompetitorData => res.json(dbCompetitorData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get route for all competitors with totals
router.get('/totals', (req, res) => {
    Competitor.findAll({
        attributes: ['id', 'name', 'email', 'phone'],
        include: [
            {
                model: Fish,
                attributes: ['length', 'weight', 'picture']
            }
        ]
    })
    .then(dbCompetitorData => {
        let competitors = []
        for(let i=0; i<dbCompetitorData.length; i++) {
            let fish = dbCompetitorData[i].get({ plain: true })  
            let totalLength = 0
            let totalWeight = 0
            let fishCount = 0
            for(let i=0; i<fish.fishes.length; i++) {
                totalLength = totalLength + Number(fish.fishes[i].length)
                totalWeight = totalWeight + Number(fish.fishes[i].weight)
                fishCount++
            }
            const totals = {
                'id': dbCompetitorData[i].id,
                'name': dbCompetitorData[i].name,
                'email': dbCompetitorData[i].email,
                'phone': dbCompetitorData[i].phone,
                'fish_caught': fishCount,
                'total_length': totalLength,
                'total_weight': totalWeight
            }
            competitors.push(totals)
        }
        res.json(competitors)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

//GET route for a single competitors : /api/competitors/:id
router.get('/:id', (req, res) => {
    //get one competitor with corresponding fish caught data
    Competitor.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'name', 'email', 'phone'],
        include: [
            {
                model: Fish,
                attributes: ['length', 'weight', 'picture'],
            }
        ]
    })
    .then(dbCompetitorData => {
        if(!dbCompetitorData){
            res.status(404).json({ message: 'No competitor found with this id.'});
            return;
        }
        res.json(dbCompetitorData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//POST route to add new competitor : /api/competitors
router.post('/', (req, res) => {
    // expects: { name: name, email: email, phone: phone, password:password }
  Competitor.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password
  })
  .then(dbCompetitorData => {
      // start session
      req.session.save(() => {
          req.session.competitor_id = dbCompetitorData.id,
          req.session.email = dbCompetitorData.email,
          req.session.loggedIn = true
      })
    res.json(dbCompetitorData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// login route /api/competitors/login will expect {email: 'handymanny@gmail.com', password: 'password12345'}
router.post('/login', (req, res) => {
  Competitor.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbCompetitorData => {
    if (!dbCompetitorData) {
      res.status(400).json({ message: 'no user with that email address' });
      return;
    }

    const validPassword = dbCompetitorData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'incorrect password' });
      return;
    }

    req.session.save(() => {
      req.session.competitor_id = dbCompetitorData.id;
      req.session.email = dbCompetitorData.email;
      req.session.loggedIn = true;
      
      res.json({ user: dbCompetitorData, message: 'you are now logged in' });
    });   
  });
});


// logout route /competitors/logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});

//PUT route to update competitors by id : /api/competitors/:id
router.put('/:id', (req, res) => {
    //expect {name: 'STRING', email 'STRING', phone: 'STRING', username: 'STRING', password: 'STRING'}
    Competitor.update( req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbCompetitorData => {
        if(!dbCompetitorData){
            res.status(404).json({ message: 'No competitor found with this id.' });
            return;
        }
        res.json(dbCompetitorData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//DELETE route to delete competitors by id : /api/competitors/:id
router.delete('/:id', (req, res) => {
    Competitor.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCompetitorData => {
        if(!dbCompetitorData) {
            res.status(404).json({ message: 'No competitor found with this id.'});
            return;
        }
        res.json(dbCompetitorData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;