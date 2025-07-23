// require('dotenv').config({path: './env'})
import connectDB from "./db/index.js";
import dotenv from "dotenv"
import { app } from "./app.js";
dotenv.config({
        path: './.env'
    }
)


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("Mongo DB connection FAILED !!!", err);
})




// for checking purpose only
app.get("/", (req, res) => {
    res.status(200).send("API is running 🧠");
  });
  








/*
import express from "express"
const app = express()

( async () => {
    try 
    {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error ) => {
          console.log("Error: ", error);
          throw error
        })

        app.listen(process.env.PORT, () => {
          console.log(`App is listening on port ${process.env.PORT}`);
        })
    } 
    catch (error) 
    {
        console.log("Error: ", error);
        throw error
    }
}) ()
*/