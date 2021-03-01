var express = require('express');
var router = express.Router();
const Match = require('../models/Match');
const Bet = require('../models/Bets');

/* GET all bets. */
router.get('/', async (req, res) => {
  const bets = await Bet.find();
  if (bets === null || bets.length < 1) {
    return res.status(404).json({message: 'Прогнозів не знайдено'});
  }
  res.status(200).json(bets);
});

/* GET one bet. */
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    const bets = await Bet.findOne({ _id: id });
    if (bets === null) {
      return res.status(404).json({message: 'Прогнозів не знайдено'});
    }
    res.status(200).json(bets);
  }
  else {
    res.status(500).json({error: 'Невірний id ставки'});
  }
});

/* ADD bet. */
router.post('/add', async (req, res) => {
  try {
    const bet = new Bet({
      bet: {
        home: req.body.bet.home,
        away: req.body.bet.away
      },
      user: req.user._id,
      match: req.body.match
    });
    let data = await bet.save();
    res.status(201).json({ data });
  } catch (err) {
    res.status(400).json({ err: err });
  }
})

/* ADD bet. */
router.post('/update/:id', async (req, res) => {
  const id = req.params.id;
  try {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      Bet.updateOne({ _id: id } , { $set: req.body })
      .then((resp) => res.status(200).json(resp))
      .catch((err) => res.status(400).json({message: `${err}`}))
    }
    else {
      res.status(500).json({error: 'Невірний id ставки'});
    }
  } catch (e) {
    if (e.message) {
      res.status(500).json({message: e.message});
    } else {
      res.status(500).json({message: 'Помилка сервера. Спробуйте пізніше'});
    }
  }
})

/* ADD bet. */
router.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;
  try {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      Bet.deleteOne({ _id: id })
      .then((resp) => res.status(200).json(resp))
      .catch((err) => res.status(400).json({message: `${err}`}))
    }
    else {
      res.status(500).json({error: 'Невірний id ставки'});
    }
  } catch (e) {
    if (e.message) {
      res.status(500).json({message: e.message});
    } else {
      res.status(500).json({message: 'Помилка сервера. Спробуйте пізніше'});
    }
  }
})

module.exports = router;
