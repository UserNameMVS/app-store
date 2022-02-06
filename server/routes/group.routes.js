const express = require('express')
const Group = require('../models/Group')
const router = express.Router({ mergeParams: true })
// const cors = require('cors')

router.get('/', async (req, res) => {
  try {
    const list = await Group.find()
    res.status(200).send(list)
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже.'
    })
  }
})

module.exports = router
