import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

const HasilPerhitungan = sequelize.define('hasil_perhitungan', {
    id_relawan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'relawans',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    nama_relawan: {
        type: DataTypes.STRING,
        allowNull: false
    },
    skor: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    }
}, {
    timestamps: false
});

const syncModels = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        await sequelize.sync();
        console.log('HasilPerhitungan model synced with database');
    } catch (err) {
        console.error('Unable to connect to the database or sync model:', err);
    }
};

syncModels();

export default HasilPerhitungan;
