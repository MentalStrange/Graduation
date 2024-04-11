import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoutes from "./routes/auth.js"
const app = express()

app.use(express.json())
app.use(cors())
dotenv.config();

// connect to database
try {
  mongoose.connect(process.env.MONGO_URL_LOCAL);
  console.log("connected to database");
} catch (error) {
  console.log(error.message);
  process.exit(1);
}


app.get("/", (req,res) => {
  res.send(
    `<center>
    <h1>
    Welcome to the Graduation Project 
    </h1>
    </center>`
  )
})

app.use('/api/v1/auth',authRoutes)

app.listen(process.env.PORT,() => {
  console.log(`server run on => http://localhost:${process.env.PORT}`)
})