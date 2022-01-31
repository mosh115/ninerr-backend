const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId


async function query(filterBy) {
    try {
        let criteria = {}
        if (filterBy) criteria = _buildCriteria(filterBy);
        const collection = await dbService.getCollection('gig');
        const gigs = await collection.find(criteria).toArray() || [];
        return gigs;
    } catch (err) {
        logger.error('cannot find gigs', err)
        throw err
    }
}

async function getById(gigId) {
    try {
        const collection = await dbService.getCollection('gig')
        const gig = collection.findOne({ '_id': ObjectId(gigId) })
        return gig
    } catch (err) {
        logger.error(`while finding gig ${gigId}`, err)
        throw err
    }
}

async function remove(gigId) {
    try {
        const collection = await dbService.getCollection('gig')
        await collection.deleteOne({ '_id': ObjectId(gigId) })
        return gigId
    } catch (err) {
        logger.error(`cannot remove gig ${gigId}`, err)
        throw err
    }
}

async function add(gig) {
    try {
        newGig = {
            ...gig,
            createdAt: Date.now()
        }
        const collection = await dbService.getCollection('gig')
        await collection.insertOne(newGig)
        return newGig
    } catch (err) {
        logger.error('cannot insert gig', err)
        throw err
    }
}

async function update(gig) {
    try {
        const savedGig = {
            _id: ObjectId(gig._id),
            ...gig
        }
        // delete savedGig._id
        const collection = await dbService.getCollection('gig')
        await collection.updateOne({ "_id": id }, { $set: { ...gig } })
        return gig
    } catch (err) {
        logger.error(`cannot update gig ${gigId}`, err)
        throw err
    }
}

async function getLabels() {
    try {
        const collection = await dbService.getCollection('gig')
        const gigs = await collection.find({}).toArray()
        const labels = await _getLabelsByGigs(gigs)
        console.log('labels:', labels);
        return labels;
    } catch (err) {
        console.log(err)
    }
}


function _buildCriteria(filterBy) {
    const { title, tags, userId } = filterBy;
    let criteria = {};
    if (title) {
        console.log('im here!');
        criteria.title = { $regex: title, $options: 'i' };
    }
    //  else if (inStock === 'outofstock') {
    //     criteria.inStock = false;
    // }
    if (tags) {
        criteria.tags = { $all: tags }
    }
    if (userId) {
        criteria = { 'owner._id': userId };
    }
    console.log('criteria:', criteria);
    return criteria

}

function _getLabelsByGigs(gigs) {
    if (!gigs) return;
    let labels = [];
    gigs.forEach(gig => {
        gig.labels.forEach(labelFromGig => {
            if (labels.some(label => label === labelFromGig)) return;
            labels.push(labelFromGig)
        })
    })

    return Promise.resolve(labels)

}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    getLabels
}