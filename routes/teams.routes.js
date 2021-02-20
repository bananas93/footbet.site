const { Router } = require('express');
const router = Router();
const Teams = require('../models/Teams');

router.get('/', async (req, res) => {
  try {
    const teams = await Teams.find();
    if (teams === null || teams.length < 1) {
      return res.status(404).json({message: 'Команд не знайдено'});
    }
    res.status(200).json(teams);
  } catch (e) {
    if (e.message) {
      res.status(500).json({message: e.message});
    } else {
      res.status(500).json({message: 'Помилка сервера. Спробуйте пізніше'});
    }
  }
})

module.exports = router;