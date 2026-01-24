import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js'
import geminiRoute from './routes/geminiRoutes.js'
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000

// middlewares for cors and parsing incoming JSON requests
app.use(cors({
    origin: ["http://localhost:5173", "https://noema-ai-9jvr.vercel.app"],
    methods: ['GET', "POST", 'PUT', 'DELETE'],
    credentials:  true
}))
app.use(express.json())
app.use(cookieParser());




// user router
app.use('/api/auth', authRoutes)
// home
app.use("/api/gemini",geminiRoute)


mongoose.connect(process.env.MONGO_URI).then(() =>{
    console.log("MongoDB Connected")
    app.listen(PORT , () => {
    console.log(`Server is running on ${PORT}`)
})


}).catch((err) => {console.log(err)})


app.get('/', (req,res) => {
    res.send('<html> <body> <h1>Server is running</h1> </body> </html>')
})


