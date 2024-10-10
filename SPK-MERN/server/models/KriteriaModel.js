import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

const Kriteria = sequelize.define('kriteria', {
  id_kriteria: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nama_kriteria: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bobot: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  tipe: {
    type: DataTypes.STRING,
    allowNull: false
  },
},{
  timestamps : false
});


const syncModels = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    await sequelize.sync({ force: false });
    console.log('Kriteria model synced with database');
  } catch (err) {
    console.error('Unable to connect to the database or sync model:', err);
  }
};

syncModels();

export default Kriteria;
