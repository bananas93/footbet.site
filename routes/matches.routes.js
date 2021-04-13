/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const { Router } = require('express');

const router = Router();
const Match = require('../models/Match');
const Bet = require('../models/Bets');

router.get('/all/:tournament', async (req, res) => {
  const { tournament } = req.params;
  try {
    const matches = await Match.find({ tournament }).populate('home_team').populate('away_team');

    if (matches === null || matches.length < 1) {
      res.status(404).json({ message: 'Матчів не знайдено' });
    }
    const groups = matches.reduce((allGroups, game) => {
      const date = game.date.toISOString().split('T')[0];
      if (!allGroups[date]) {
        allGroups[date] = [];
      }
      allGroups[date].push(game);
      return allGroups;
    }, {});
    const groupArrays = Object.keys(groups).map((date, index) => ({
      id: index,
      date,
      games: groups[date],
    }));

    res.status(200).json(groupArrays);
  } catch (e) {
    if (e.message) {
      res.status(500).json({ message: e.message });
    } else {
      res.status(500).json({ message: 'Помилка сервера. Спробуйте пізніше' });
    }
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Match.findOne({ _id: id }).populate('home_team').populate('away_team');

    if (match === null) {
      res.status(404).json({ message: 'Матч не знайдено' });
    }
    const bets = await Bet.find({ match: id }).populate('user');
    res.status(200).json({ match, bets });
  } catch (e) {
    if (e.message) {
      res.status(500).json({ message: e.message });
    } else {
      res.status(500).json({ message: 'Помилка сервера. Спробуйте пізніше' });
    }
  }
});

module.exports = router;
