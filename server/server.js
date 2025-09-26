import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'


dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.get('/', (req,res) => {
    res.send('<html> <body> <h1>Server is running</h1> </body> </html>')
})

app.listen(PORT , () => {
    console.log(`Server is running on ${PORT}`)
})


