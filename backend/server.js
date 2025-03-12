const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()

const gemini = require('./config/gemini');
const PORT = 3000
app.use(express.json())
app.use(cors())
app.post('/api/chat' , async (req , res) =>{
 
    console.log(req.body)
    let result = await gemini(req.body.prompt)
    res.json(result)
})

app.listen(PORT , () => console.log("listening on port " , PORT));


