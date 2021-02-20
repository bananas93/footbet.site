var express = require('express');
var router = express.Router();
const Match = require('../models/Match');
const Bet = require('../models/Bets');

/* GET users listing. */
router.get('/', async (req, res) => {
  const bets = await Bet.find().populate("match");
  if (bets === null || bets.length < 1) {
    return res.status(404).json({message: 'Прогнозів не знайдено'});
  }
  res.status(200).json(bets);
});

router.get('/:id', async (req, res) => {
  const bets = await Bet.findOne({id: req.params.id}).populate("match");
  if (bets === null || bets.length < 1) {
    return res.status(404).json({message: 'Прогнозів не знайдено'});
  }
  res.status(200).json(bets);
});

router.post('/:id', async (req, res) => {
  const bet = await Bet.findOne({ 'user.id': req.params.id });
  console.log(bet)
  // try {
  //   Bet.updateOne({ 'user.id': req.params.id, '_id': req.body.id }, { $set: req.body }, { upsert: true })
  //   .then((resp) => res.status(200).json(resp))
  //   .catch((err) => res.status(400).json({message: `${err}`}))
  // } catch (e) {
  //   if (e.message) {
  //     res.status(500).json({message: e.message});
  //   } else {
  //     res.status(500).json({message: 'Помилка сервера. Спробуйте пізніше'});
  //   }
  // }
})

router.get('/:user_id', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
