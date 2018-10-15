const express = require('express')
const router = express.Router()
const knex = require('../knex')
// READ ALL records for this table
router.get('/', (req, res, next) => {
  knex(`reports`)
    .then((records) => {
      res.send(records)
    })
})
// READ ONE record for this table
router.get('/:id', (req, res, next) => {
  knex(`reports`)
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
    content: req.body.content,
    reported_at: req.body.reported_at,
    location: req.body.location,
    cryptid_id: req.body.cryptid_id
  }
  knex(`reports`)
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
  knex(`reports`)
    .where(`id`, req.params.id)
    .then((results) => {
      if (results.length > 0) {
        // Update the record
        let updatedRecord = results[0]
        if (req.body.name) updatedRecord.name = req.body.name
        if (req.body.content) updatedRecord.name = req.body.content
        if (req.body.reported_at) updatedRecord.name = req.body.reported_at
        if (req.body.location) updatedRecord.name = req.body.location
        if (req.body.cryptid_id) updatedRecord.name = req.body.cryptid_id
        // Update the record in the DB
        knex(`reports`)
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
  knex(`reports`)
    .where(`id`, req.params.id)
    .then((theRecords) => {
      if (theRecords.length > 0) {
        // delete it
        knex(`reports`)
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