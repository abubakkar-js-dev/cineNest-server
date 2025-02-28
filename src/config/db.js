const mongoose = require("mongoose");

const connectMongodb = async (url) => {
  try {
   const connectionInstant = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB. HOST: ", connectionInstant.connection.host);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectMongodb;
