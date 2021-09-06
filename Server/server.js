const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()

app.use(express.json())
app.use(cors())


const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})