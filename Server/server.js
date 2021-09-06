const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const races = {
    "Elf":{

    },
    "Dwarf":{

    },
    "Human":{}
}
//require('./Databases/races.js')

app.use(express.json())
app.use(cors())


app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'../Pages/main.html'))
})
app.get('/css', (req,res)=>{
    res.sendFile(path.join(__dirname,'../Style/main.css'))
})
app.get('/js', (req,res)=>{
    res.sendFile(path.join(__dirname, '../Pages/main.js'))
})

app.use('/css', express.static(path.join(__dirname, '../Style/main.css')))
app.use('/js', express.static(path.join(__dirname, '../Pages/main.js')))

app.get('/races',(req,res)=>{
    res.status(200).send(races)
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})