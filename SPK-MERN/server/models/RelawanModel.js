import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
import Penilaian from './PenilaianModel.js';

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

const Relawan = sequelize.define('relawans', {
    nama_relawan: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email_relawan: {
        type: DataTypes.STRING,
        allowNull: false
    },
    no_relawan: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender_relawan: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Define association
Relawan.hasMany(Penilaian, {
    foreignKey: 'id_relawan',
    sourceKey: 'id'
});
Penilaian.belongsTo(Relawan, { foreignKey: 'id_relawan' }); // Tambahkan asosiasi ini

const syncModels = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        await sequelize.sync();
        console.log('Relawan model synced with database');
    } catch (err) {
        console.error('Unable to connect to the database or sync model:', err);
    }
};

syncModels();

export default Relawan;
