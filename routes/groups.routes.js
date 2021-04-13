const { Router } = require('express');

const router = Router();
const Groups = require('../models/Groups');

router.get('/:tournament', async (req, res) => {
  const { tournament } = req.params;
  try {
    const teams = await Groups.find({ tournament }).populate('teams');
    if (teams === null || teams.length < 1) {
      res.status(404).json({ message: 'Груп не знайдено' });
    }
    res.status(200).json(teams);
  } catch (e) {
    if (e.message) {
      res.status(500).json({ message: e.message });
    } else {
      res.status(500).json({ message: 'Помилка сервера. Спробуйте пізніше' });
    }
  }
});

module.exports = router;
