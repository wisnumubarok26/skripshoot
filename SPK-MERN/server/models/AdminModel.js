import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'; // Import bcrypt untuk hashing password

dotenv.config();

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

const Admin = sequelize.define('admins', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Pastikan username unik
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true, // Menambahkan kolom createdAt dan updatedAt
});

// Sebelum menyimpan admin, hash password
Admin.beforeCreate(async (admin) => {
    const salt = await bcrypt.genSalt(10); // Menghasilkan salt
    admin.password = await bcrypt.hash(admin.password, salt); // Meng-hash password
});

// Metode untuk memverifikasi password
Admin.verifyPassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

// Sinkronisasi model dengan database
const syncModels = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        await sequelize.sync();
        console.log('Admin model synced with database');
    } catch (err) {
        console.error('Unable to connect to the database or sync model:', err);
    }
};

syncModels();

export default Admin;
