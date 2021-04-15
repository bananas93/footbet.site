/* eslint-disable no-underscore-dangle */
const express = require('express');

const router = express.Router();
const Bet = require('../models/Bets');

/* GET all bets. */
router.get('/', async (req, res) => {
  const bets = await Bet.find();
  if (bets === null || bets.length < 1) {
    res.status(404).json({ message: 'Прогнозів не знайдено' });
  }
  res.status(200).json(bets);
});

/* GET one bet. */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    const bets = await Bet.find({ match: id });
    if (bets === null) {
      res.status(404).json({ message: 'Прогнозів не знайдено' });
    }
    res.status(200).json(bets);
  } else {
    res.status(500).json({ error: 'Невірний id ставки' });
  }
});

/* GET one bet by match */
router.get('/:id/:me', async (req, res) => {
  const { id } = req.params;
  const byUser = req.params.me;
  if (id.match(/^[0-9a-fA-F]{24}$/) && byUser) {
    const bets = await Bet.find({ match: id, user: req.user._id });
    if (bets === null) {
      res.status(404).json({ message: 'Прогнозів не знайдено' });
    }
    res.status(200).json(bets);
  } else {
    res.status(500).json({ error: 'Невірний id ставки' });
  }
});

/* ADD or UPDATE bet. */
router.patch('/', async (req, res) => {
  const { home, away, match } = req.body;
  const user = req.user._id;
  try {
    await Bet.updateOne(
      {
        match,
        user,
      },
      {
        bet: {
          home,
          away,
        },
        match,
        user,
      },
      {
        upsert: true,
      },
    );
    res.status(201).json({ message: 'Прогноз успішно збережено' });
  } catch (err) {
    res.status(400).json({ err: `${err}` });
  }
});

/* Delete bet. */
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      Bet.deleteOne({ _id: id })
        .then((resp) => res.status(200).json(resp))
        .catch((err) => res.status(400).json({ message: `${err}` }));
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
});

module.exports = router;
