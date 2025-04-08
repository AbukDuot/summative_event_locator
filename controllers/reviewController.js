const pool = require('../config/db');

exports.createReview = async (req, res) => {
    const { userId, eventId, rating, review } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO reviews (user_id, event_id, rating, review) VALUES ($1, $2, $3, $4) RETURNING *',
            [userId, eventId, rating, review]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error submitting review' });
    }
};

exports.getReviews = async (req, res) => {
    const { eventId } = req.params;

    try {
        const result = await pool.query('SELECT * FROM reviews WHERE event_id = $1', [eventId]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching reviews' });
    }
};
