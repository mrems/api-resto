const express = require('express')
const router = express.Router()
const CarteItem = require('../models/carte')

// Getting all
router.get('/', async (req, res) => {
  try {
    const carteItems = await CarteItem.find()
    res.json(carteItems)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:category/:title', getCarteItem, (req, res) => {
  res.json(res.carteItem)
})

// Getting One category
router.get('/:category', getCarteCategory, (req, res) => {
  res.json(res.carteCategory)
})

// Creating one
router.post('/', async (req, res) => {
  const carteItem = new CarteItem({
    category: req.body.category,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price
  })
  try {
    const newCarteItem = await carteItem.save()
    res.status(201).json(newCarteItem)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:title', getCarteItem, async (req, res) => {
  if (req.body.category != null) {
    res.carteItem.category = req.body.category
  }
  if (req.body.title != null) {
    res.carteItem.title = req.body.title
  }
  if (req.body.description != null) {
    res.carteItem.description = req.body.description
  }
  if (req.body.price != null) {
    res.carteItem.price = req.body.price
  }
  try {
    const updatedCarteItem = await res.carteItem.save()
    res.json(updatedCarteItem)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:title', getCarteItem, async (req, res) => {
  try {
    await res.carteItem.remove()
    res.json({ message: 'Deleted CarteItem' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getCarteItem(req, res, next) {
  let carteItem
  try {
    carteItem = await CarteItem.findOne({title : req.params.title})
    if (carteItem == null) {
      return res.status(404).json({ message: 'Cannot find carteItem' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.carteItem = carteItem
  next()
}

async function getCarteCategory(req, res, next) {
  let carteCategory
  try {
    carteCategory = await CarteItem.find({category : req.params.category})
    if (carteCategory == null) {
      return res.status(404).json({ message: 'Cannot find carteCategory' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.carteCategory = carteCategory
  next()
}

module.exports = router