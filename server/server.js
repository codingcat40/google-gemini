import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose';
import userRoute from './routes/userRoutes.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

// user router
app.use('/api/users', userRoute)

mongoose.connect(process.env.MONGO_URI).then(() =>{
    console.log("MongoDB Connected")
    app.listen(PORT , () => {
    console.log(`Server is running on ${PORT}`)
})


}).catch((err) => {console.log(err)})


app.get('/', (req,res) => {
    res.send('<html> <body> <h1>Server is running</h1> </body> </html>')
})


