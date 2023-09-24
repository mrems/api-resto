const express = require('express')
const router = express.Router()
const Horaire = require('../models/horaire')

// Getting all
router.get('/', async (req, res) => {
  try {
    const horaires = await Horaire.find()
    res.json(horaires)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:jour', getHoraire, (req, res) => {
  res.json(res.horaire)
})

// Creating one
router.post('/', async (req, res) => {
    const horaire = new Horaire({
      jour: req.body.jour,
      midi: req.body.midi,
      soir: req.body.soir
    })
    try {
      const newHoraire = await horaire.save()
      res.status(201).json(newHoraire)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

// Updating One
router.patch('/:jour', getHoraire, async (req, res) => {
    if (req.body.jour != null) {
      res.horaire.jour = req.body.jour
    }
    if (req.body.midi != null) {
      res.horaire.midi = req.body.midi
    }
    if (req.body.soir != null) {
        res.horaire.soir = req.body.soir
      }
    try {
      const updatedHoraire = await res.horaire.save()
      res.json(updatedHoraire)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })
  
  // Deleting One
  router.delete('/:jour', getHoraire, async (req, res) => {
    try {
      await res.horaire.remove()
      res.json({ message: 'Deleted Horaire' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

async function getHoraire(req, res, next) {
  let horaire
  try {
    horaire = await Horaire.findOne({jour : req.params.jour})
    if (horaire == null) {
      return res.status(404).json({ message: 'trouve pas horaire' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.horaire = horaire
  next()
}

module.exports = router