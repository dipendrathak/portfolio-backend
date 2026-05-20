const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📦 Database: ${conn.connection.name}`);
        return conn;
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        console.error('');
        console.error('👉 Make sure you have:');
        console.error('   1. Created a MongoDB Atlas free cluster at https://cloud.mongodb.com');
        console.error('   2. Created a database user with username & password');
        console.error('   3. Whitelisted your IP address (or 0.0.0.0/0 for development)');
        console.error('   4. Updated MONGODB_URI in backend/.env with your connection string');
        console.error('');
        process.exit(1);
    }
};

module.exports = connectDB;
