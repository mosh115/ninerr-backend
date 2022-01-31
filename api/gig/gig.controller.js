const gigService = require('./gig.service.js');
const logger = require('../../services/logger.service')

// GET LIST
async function getGigs(req, res) {
  // console.log('in server', req.query);
  try {
    let filterBy = req.query;
    // console.log('filter', filterBy);
    // if (filterBy) filterBy = JSON.parse(filterBy)
    // console.log('filterBy in getGigs', filterBy);
    const gigs = await gigService.query(filterBy)
    res.json(gigs);
  } catch (err) {
    logger.error('Failed to get gigs', err)
    res.status(500).send({ err: 'Failed to get gigs' })
  }
}

// GET BY ID 
async function getGigById(req, res) {
  console.log(req);
  try {
    const gigId = req.params.id;
    console.log(gigId);
    const gig = await gigService.getById(gigId)
    res.json(gig)
  } catch (err) {
    logger.error('Failed to get gig', err)
    res.status(500).send({ err: 'Failed to get gig' })
  }
}

// POST (add gig)
async function addGig(req, res) {
  try {
    const gig = req.body;

    const addedGig = await gigService.add(gig)
    res.json(addedGig)
  } catch (err) {
    logger.error('Failed to add gig', err)
    res.status(500).send({ err: 'Failed to add gig' })
  }
}

// PUT (Update gig)
async function updateGig(req, res) {
  try {
    const gig = req.body;
    const updatedGig = await gigService.update(gig)
    res.json(updatedGig)
  } catch (err) {
    logger.error('Failed to update gig', err)
    res.status(500).send({ err: 'Failed to update gig' })

  }
}

// DELETE (Remove gig)
async function removeGig(req, res) {
  try {
    const gigId = req.params.id;
    await gigService.remove(gigId)
    res.send({ msg: 'Delete Successfully' })
  } catch (err) {
    logger.error('Failed to remove gig', err)
    res.status(500).send({ err: 'Failed to remove gig' })
  }
}

// async function getLabels(req, res) {
//   console.log('im here!');
//   try {
//     const labels = await gigService.getLabels()
//     res.send(labels)
//   } catch (err) {
//     logger.error('Failed to get Labels', err)
//     res.status(500).send({ err: 'Failed to get Labels' })
//   }
// }

module.exports = {
  getGigs,
  getGigById,
  addGig,
  updateGig,
  removeGig,
  // getLabels
}
