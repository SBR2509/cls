const mongoose = require("mongoose");
const connect = async()=>{
      try {
            await mongoose.connect("mongodb://localhost:27017/usersdb");
            console.log('db is connected successfully')
      } catch(error){
            console.error('error while connect to the db:', error.message);
            process.exit(1);
      }
};

module.exports = {connect};