const pool = require('../config/database');

exports.addFavorite = async (req, res) => {
    const { userId, eventId } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO favorites (user_id, event_id) VALUES ($1, $2) RETURNING *',
            [userId, eventId]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error adding to favorites' });
    }
};

exports.getFavorites = async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await pool.query('SELECT * FROM favorites WHERE user_id = $1', [userId]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching favorites' });
    }
};
