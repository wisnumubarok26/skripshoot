import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

// Define the Penilaian model
const Penilaian = sequelize.define('penilaian', {
    nilai: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    // Define the foreign keys with the correct references
    id_relawan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'relawans', // name of the target table
            key: 'id'        // key in the target table
        },
        onDelete: 'CASCADE'
    },
    id_kriteria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'kriteria', // name of the target table
            key: 'id_kriteria' // key in the target table
        },
        onDelete: 'CASCADE'
    }
}, {
    timestamps: false // Nonaktifkan timestamps jika tidak diperlukan
});

// Sync models with the database
const syncModels = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    // Gunakan opsi alter untuk memperbarui tabel yang sudah ada
    await sequelize.sync({ alter: true }); // Menggunakan alter agar tidak membuat tabel baru
    await sequelize.sync({ force: false });
    console.log('Penilaian model synced with database');
  } catch (err) {
    console.error('Unable to connect to the database or sync model:', err);
  }
};

syncModels();

export default Penilaian;
