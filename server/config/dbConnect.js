require('dotenv').config();
const { default: mongoose } = require('mongoose');

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        if (conn.connection.readyState === 1) {
            console.log('Db connection is successful');
        } else {
            console.log('Db connection is connecting');
        }
    } catch (error) {
        console.log('Db connection is failed');
        throw new Error(error);
    }
}

module.exports = dbConnect