var express = require('express');
var router = express.Router();
const Coin = require('../models/Coin');

router.get('/', (req, res, next) => {
  console.log('req', req.query.name);
  
  Coin.find({}, (err, data) => {
    if (err) return console.error(err);
    res.json(data);
  })
})

// Con el regex
// router.get('/', (req, res, next) => {
//   console.log('req', req.query.name);

//   Coin.find({ name: { $regex: req.query.name }}, (err, data) => {
//     if (err) return console.error(err);
//     res.json(data);
//   })
// })

router.get('/:id', (req, res, next) => {
  Coin.findOne({ _id: req.params.id }, (err, data) => {
    if (err) return console.error(err);
    res.json(data);
  })
})

router.post('/', (req, res, next)=> {
  const newCoin = new Coin({
    name: req.body.name,
    value: req.body.value,
    rateUSD: req.body.rateUSD,
    notes: req.body.notes
  })

  newCoin.save((err, data) => {
    if (err) return res.status(500).send(err);
    console.log('OK!');
    res.json({ ready: true });
  })
});

router.put('/:id', (req, res, next) => {
  Coin.updateOne({ _id: req.params.id }, { name: req.body.name, value: req.body.value, rateUSD: req.body.rateUSD, notes: req.body.notes },
    (err, data) => {
      if (err) return console.error(err);
      res.json({ ready: true })
    })
})

router.delete('/:id', (req, res, next) => {
  Coin.deleteOne({ _id: req.params.id }, (err, data) => {
    if (err) return console.error(err);
    res.json({ ready: true })
  })
})


module.exports = router;

