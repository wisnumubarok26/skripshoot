import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
import Kriteria from './KriteriaModel.js'; // Jangan lupa import model Kriteria

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

const Penilaian = sequelize.define('penilaians', {
    nilai: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    id_relawan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'relawans',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    id_kriteria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'kriteria',
            key: 'id_kriteria'
        },
        onDelete: 'CASCADE'
    }
}, {
    timestamps: false
});

// Tambahkan asosiasi
Penilaian.belongsTo(Kriteria, { foreignKey: 'id_kriteria' });

const syncModels = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        await sequelize.sync({ alter: true });
        console.log('Penilaian model synced with database');
    } catch (err) {
        console.error('Unable to connect to the database or sync model:', err);
    }
};

syncModels();

export default Penilaian;
