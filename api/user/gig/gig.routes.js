const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getGigs, getGigById, addGig, updateGig, removeGig, getLabels } = require('./gig.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

// router.get('/labels', getLabels)
// console.log(router.get);
router.get('/', getGigs)
router.get('/:id', getGigById)
router.post('/', addGig)
router.put('/:id', updateGig)
// router.post('/', requireAuth, requireAdmin, addGig)
// router.put('/:id', requireAuth, requireAdmin, updateGig)
router.delete('/:id', requireAuth, requireAdmin, removeGig)

module.exports = router