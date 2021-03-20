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
    const bets = await Bet.find({ match: id });
    if (bets === null) {
      return res.status(404).json({message: 'Прогнозів не знайдено'});
    }
    res.status(200).json(bets);
  }
  else {
    res.status(500).json({error: 'Невірний id ставки'});
  }
});

/* GET one bet by match */
router.get('/:id/:me', async (req, res) => {
  const id = req.params.id;
  const byUser = req.params.me;
  if (id.match(/^[0-9a-fA-F]{24}$/) && byUser) {
    const bets = await Bet.find({ 'match': id, 'user': req.user._id });
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
        home: req.body.home,
        away: req.body.away,
      },
      user: req.user._id,
      match: req.body.match
    });
    let data = await bet.save();
    res.status(201).json({ data, result: 'Прогноз успішно збережено' });
  } catch (err) {
    res.status(400).json({ err: `${err}` });
  }
})

/* ADD bet. */
router.post('/update/:id', async (req, res) => {
  const bet = {
    bet: {
      home: req.body.home,
      away: req.body.away,
    }
  }
  try {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      Bet.findOneAndUpdate( { 'match': req.params.id, 'user': req.user._id }, bet, { upsert: true, new: true, runValidators: true } )
      .then((resp) => res.status(200).json(resp))
      .catch((err) => res.status(400).json({ message: `${err}` }))
    } else {
      res.status(500).json({ error: 'Невірний id ставки' });
    }
  } catch (e) {
    if (e.message) {
      res.status(500).json({ message: e.message });
    } else {
      res.status(500).json({ message: 'Помилка сервера. Спробуйте пізніше' });
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
