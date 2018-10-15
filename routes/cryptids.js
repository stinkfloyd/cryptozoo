const express = require('express')
const router = express.Router()
const knex = require('../knex')
// READ ALL records for this table
router.get('/', (req, res, next) => {
  knex(`cryptids`)
    .then((records) => {
      res.send(records)
    })
})
// READ ONE record for this table
router.get('/:id', (req, res, next) => {
  knex(`cryptids`)
    .where(`id`, req.params.id)
    .then((records) => {
      res.send(records)
    })
})
// CREATE ONE record for this table
router.post('/', (req, res, next) => {
  // create new cryptid
  let newRecord = {
    name: req.body.name,
    bio: req.body.bio,
    photo: req.body.photo
  }
  knex(`cryptids`)
    .insert(newRecord, `*`)
    .then((result) => {
      res.send(result)
    })
    .catch((error) => {
      next(error)
    })
})
// UPDATE ONE record for this table
router.patch('/:id', (req, res, next) => {
  knex(`cryptids`)
    .where(`id`, req.params.id)
    .then((results) => {
      if (results.length > 0) {
        // Update the record
        let updatedRecord = results[0]
        if (req.body.name) updatedRecord.name = req.body.name
        if (req.body.bio) updatedRecord.name = req.body.bio
        if (req.body.photo) updatedRecord.name = req.body.photo
        // Update the record in the DB
        knex(`cryptids`)
          .where(`id`, req.params.id)
          .update(updatedRecord, `*`)
          .then((resUpdate) => {
            res.send(resUpdate)
          })
      } else {
        throw new Error(`Ya DINGUS! Not Found`)
      }
    })
    .catch((err) => {
      next(err)
    })
})
// DELETE ONE record for this table
router.delete('/:id', (req, res, next) => {
  // Lookup or verify ID exists
  knex(`cryptids`)
    .where(`id`, req.params.id)
    .then((theRecords) => {
      if (theRecords.length > 0) {
        // delete it
        knex(`cryptids`)
          .del()
          .where(`id`, req.params.id)
          .returning(`*`)
          .then((result) => {
            res.send(result[0])
          })
      } else {
        throw new Error(`Ya DINGUS! Not Found`)
      }
    })
    .catch((err) => {
      next(err)
    })
})
module.exports = router