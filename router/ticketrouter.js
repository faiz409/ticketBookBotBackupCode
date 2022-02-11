const express = require('express');
const ticketData = require('../models/ticket');

const router = express.Router();

// Post
router.post('/', async (req, res) => {
    // eslint-disable-next-line new-cap
    const ticket = new ticketData({

        userName: req.body.userName,
        mobile: req.body.mobile,
        mail: req.body.mail,
        personNumber: req.body.personNumber,
        amount: req.body.amount,
        placeAndTime: req.body.placeAndTime

    });

    try {
        const ticket1 = await ticket.save();
        res.json(ticket1);
    } catch (err) {
        console.log('Error' + err);
    }
});

// Get
router.get('/', async (req, res) => {
    try {
        // console.log(req.query);
        const ticket = await ticketData.find(req.query);
        res.json(ticket);
    } catch (err) {
        console.log(err);
    }
});

// Get by id

router.get('/:id', async (req, res) => {
    try {
        if (req.params.id) {
            const ticket = await ticketData.findById(req.params.id);
            return res.json(ticket);
        }
    } catch (err) {
        console.log(err);
        if (err) {
            return res.json({
                errors: [
                    {
                        msg: 'Id is invalid please fill correct ticket Id'
                    }
                ]
            });
        }
    }
});

// Delete by id

router.delete('/:id', async (req, res) => {
    // console.log(req);
    const deleteTicket = await ticketData.findByIdAndDelete(req.params.id);
    // console.log(req.params.id);

    if (!req.params.id) {
        return res.json({
            errors: [{
                msg: 'invalid delete params'
            }]
        });
    }

    return res.json(deleteTicket);
});

module.exports = router;
