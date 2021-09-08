const express = require('express')
const cors = require('cors')


const app = express()
//Include databases
const races = require('./Databases/races.js')
const backgrounds = require('./Databases/backgrounds.js')
const classes = require('./Databases/classes.js')


app.use(cors())
app.use(express.json())
const baseURL = '/'


//axios calls
app.get(baseURL + `races`,(req,res)=>{
    //console.log('request')
    res.status(200).send(races)
})
app.get(baseURL + 'classes', (req,res)=>{
    console.log(classes)
    res.status(200).send(classes)
})
app.get(baseURL + 'backgrounds',(req,res)=>{
    res.status(200).send(backgrounds)
})


////////////////function used in '/submit' DO NOT REMOVE///////////////////////
function countArr(stat, arr){
    let sum =0
    for(i of arr){
        console.log(i, arr[i])
        if(i=== stat) sum++
    }
    return sum;
}

/////////////////used to store data///////////////////
let mainCharacter;
let boostsCalc;
app.post(baseURL + 'submit', (req,res)=>{
    console.log(req.body)

    let raceArr = req.body['choice race'].join(" ") + " " + races[req.body['race']]['boosts']['b'].join(' ')
    raceArr = raceArr.split(' ');


    let raceP = races[req.body['race']]['boosts']['p']

    let backArr = req.body['choice background']

    let classbonuses = classes[req.body['class']]['b'];
    console.log(races[req.body['race']]['boosts']['b'])
    let classArr = classbonuses.length < 2 ? classes[req.body['class']]['b'] :req.body['choice class']
    boostsCalc = {
        'race': {
            "Str": countArr('Str', raceArr) - countArr('Str', raceP),
            "Dex": countArr('Dex', raceArr) - countArr('Dex', raceP),
            "Con": countArr('Con', raceArr) - countArr('Con', raceP),
            "Wis": countArr('Wis', raceArr) - countArr('Wis', raceP),
            "Int": countArr('Int', raceArr) - countArr('Int', raceP),
            "Cha": countArr('Cha', raceArr) - countArr('Cha', raceP),


        },
        'class': {
            "Str": countArr('Str',classArr),
            "Dex": countArr('Dex',classArr),
            "Con": countArr('Con',classArr),
            "Wis": countArr('Wis',classArr),
            "Int": countArr('Int',classArr),
            "Cha": countArr('Cha',classArr),

        },
        'background':{
            "Str": countArr('Str',backArr),
            "Dex": countArr('Dex',backArr),
            "Con": countArr('Con',backArr),
            "Wis": countArr('Wis',backArr),
            "Int": countArr('Int',backArr),
            "Cha": countArr('Cha',backArr)
        },
        




    }
        boostsCalc['Str'] = boostsCalc.race.Str+ boostsCalc.class.Str + boostsCalc.background.Str,
        boostsCalc['Dex']= boostsCalc.race.Dex+ boostsCalc.class.Dex + boostsCalc.background.Dex,
        boostsCalc['Con']= boostsCalc.race.Con+ boostsCalc.class.Con + boostsCalc.background.Con,
        boostsCalc['Wis']= boostsCalc.race.Wis+ boostsCalc.class.Wis + boostsCalc.background.Wis,
        boostsCalc['Int']= boostsCalc.race.Int+ boostsCalc.class.Int + boostsCalc.background.Int,
        boostsCalc['Cha']= boostsCalc.race.Cha+ boostsCalc.class.Cha + boostsCalc.background.Cha
    



    mainCharacter = req.body;
    res.status(200).send(boostsCalc)
})
app.get(baseURL +'main_char', (req,res)=>{
    res.status(200).send({boostsCalc, mainCharacter})
})


//Where to operate locally
const PORT = 4000;
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})