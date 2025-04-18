const sequelize = require('./database');
const Event = require('../models/event');
const User = require('../models/user');

const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true }); 
        console.log('Database synchronized');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
};

syncDatabase();