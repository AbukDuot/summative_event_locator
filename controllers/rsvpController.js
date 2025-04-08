const RSVP = require('../models/RSVP'); // Import the RSVP model
const Event = require('../models/Event'); // Import the Event model

// Create RSVP
const createRSVP = async (req, res) => {
    try {
        const { userId, eventId } = req.body;

        // Check if the event exists
        const event = await Event.findByPk(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if the user has already RSVP'd for the event
        const existingRSVP = await RSVP.findOne({ where: { userId, eventId } });
        if (existingRSVP) {
            return res.status(400).json({ message: 'User has already RSVP\'d to this event' });
        }

        // Create the RSVP
        const rsvp = await RSVP.create({ userId, eventId });

        res.status(201).json(rsvp);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get RSVPs for an event
const getRSVPsByEvent = async (req, res) => {
    try {
        const { eventId } = req.query;

        // Find RSVPs for the given event
        const rsvps = await RSVP.findAll({ where: { eventId } });

        res.status(200).json(rsvps);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get RSVPs by user
const getRSVPsByUser = async (req, res) => {
    try {
        const { userId } = req.query;

        // Find RSVPs for the given user
        const rsvps = await RSVP.findAll({ where: { userId } });

        res.status(200).json(rsvps);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete RSVP
const deleteRSVP = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the RSVP
        const rsvp = await RSVP.findByPk(id);
        if (!rsvp) {
            return res.status(404).json({ message: 'RSVP not found' });
        }

        await rsvp.destroy();

        res.status(200).json({ message: 'RSVP deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createRSVP,
    getRSVPsByEvent,
    getRSVPsByUser,
    deleteRSVP,
};