const mongoose = require("mongoose");
const {DB_NAME} = require('../constants');

const connectMongodb = async (url) => {
    // console.log("URL: ",url);
  try {
   const connectionInstant = await mongoose.connect(`${url}/${DB_NAME}`);
    console.log("Connected to MongoDB. HOST: ", connectionInstant.connection.host);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectMongodb;
