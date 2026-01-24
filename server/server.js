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
// app.use(cors({
//     origin: ["http://localhost:5173", "https://noema-ai-9jvr.vercel.app"],
//     methods: ['GET', "POST", 'PUT', 'DELETE'],
//     credentials:  true
// }))

const allowedOrigins = [
  "http://localhost:5173",
  "https://noema-ai.vercel.app", // backend itself if needed
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);

      // allow localhost
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // allow ALL vercel preview URLs for your app
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.options("*", cors());



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


