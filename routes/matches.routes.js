const {Router} = require('express');
const router = Router();
const Match = require('../models/Match');

router.get('/', async (req, res) => {
  try {
    const matches = await Match.find().populate('home_team').populate('away_team');

    if (matches === null || matches.length < 1) {
      return res.status(404).json({message: 'Матчів не знайдено'});
    }

    res.status(200).json(matches);
  } catch (e) {
    if (e.message) {
      res.status(500).json({message: e.message});
    } else {
      res.status(500).json({message: 'Помилка сервера. Спробуйте пізніше'});
    }
  }
})

router.get('/:id', async (req, res) => {
  try {
    const match = await Match.findOne({_id: req.params.id}).populate('home_team').populate('away_team');

    if (match === null) {
      return res.status(404).json({message: 'Матч не знайдено'});
    }

    res.status(200).json(match);
  } catch (e) {
    if (e.message) {
      res.status(500).json({message: e.message});
    } else {
      res.status(500).json({message: 'Помилка сервера. Спробуйте пізніше'});
    }
  }
})

// router.post('/new', async (req, res) => {
//   try {
//     const user = new Match({
//       home_team: {
        
//       }
//     });
//     let data = await user.save();
//     res.status(201).json({ data });
//   } catch (e) {
//     if (e.message) {
//       res.status(500).json({message: e.message});
//     } else {
//       res.status(500).json({message: 'Помилка сервера. Спробуйте пізніше'});
//     }
//   }
// })

router.post('/:id', async (req, res) => {
  try {
    Match.updateOne({id: req.params.id}, {$set: req.body})
    .then((resp) => res.status(200).json(resp))
    .catch((err) => res.status(400).json({message: `${err}`}))
  } catch (e) {
    if (e.message) {
      res.status(500).json({message: e.message});
    } else {
      res.status(500).json({message: 'Помилка сервера. Спробуйте пізніше'});
    }
  }
})


module.exports = router;