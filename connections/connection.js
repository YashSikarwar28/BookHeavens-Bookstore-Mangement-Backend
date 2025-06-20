const mongoose = require("mongoose")
require("dotenv").config()

const connection = async () => {
    try {
        await mongoose.connect(`${process.env.URI}`)
        console.log("Mongo DB Conected succesfully");
    } catch (error) {
        console.log(error);
    }
}

connection()

//MWXtXRk1cD0nVq8i