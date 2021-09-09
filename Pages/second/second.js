const baseURL = 'http://localhost:4000/'

function getBoosts(){
    axios.get(baseURL + 'main_char')
    .then((result)=>{
        const {boostsCalc, mainCharacter} = result.data;

        const newDiv = document.createElement('div')
        newDiv.id = 'select_record'
        let append = `
            <p>Race: ${mainCharacter['race']}</p>
            <p>Class: ${mainCharacter['class']}</p>
            <p>Background: ${mainCharacter['background']}</p>
      
        `
        newDiv.innerHTML = append
        document.querySelector('form').appendChild(newDiv)

        let Str = loopBoost(boostsCalc['Str'])
        let Dex = loopBoost(boostsCalc['Dex'])
        let Con = loopBoost(boostsCalc['Con'])
        let Wis = loopBoost(boostsCalc['Wis'])
        let Int = loopBoost(boostsCalc['Int'])
        let Cha = loopBoost(boostsCalc['Cha'])


        const newTable = document.createElement('table')
        newTable.id = 'main-results';

        append = `
                <tr>
                    <th>Stat</th>
                    <th>Base</th>
                    <th>1st</th>
                    <th>5th</th>
                    <th>10th</th>
                    <th>15th</th>
                    <th>20th</th>
                </tr>

                <tr>
                    <th>Str</th>
                    <th>${Str}</th>
                    <th>1st</th>
                    <th>5th</th>
                    <th>10th</th>
                    <th>15th</th>
                    <th>20th</th>
                </tr>

                <tr>
                    <th>Dex</th>
                    <th>${Dex}</th>
                    <th>1st</th>
                    <th>5th</th>
                    <th>10th</th>
                    <th>15th</th>
                    <th>20th</th>
                </tr>

                <tr>
                    <th>Con</th>
                    <th>${Con}</th>
                    <th>1st</th>
                    <th>5th</th>
                    <th>10th</th>
                    <th>15th</th>
                    <th>20th</th>
                </tr>

                
                <tr>
                    <th>Wis</th>
                    <th>${Wis}</th>
                    <th>1st</th>
                    <th>5th</th>
                    <th>10th</th>
                    <th>15th</th>
                    <th>20th</th>
                </tr>

                <tr>
                    <th>Int</th>
                    <th>${Int}</th>
                    <th>1st</th>
                    <th>5th</th>
                    <th>10th</th>
                    <th>15th</th>
                    <th>20th</th>
                </tr>

                <tr>
                    <th>Cha</th>
                    <th>${Cha}</th>
                    <th>1st</th>
                    <th>5th</th>
                    <th>10th</th>
                    <th>15th</th>
                    <th>20th</th>
                </tr>
        `
        newTable.innerHTML = append
        document.querySelector('form').appendChild(newTable)
    })
}
getBoosts();

const LVL_LIMIT = 20;
const getLevelSelector = ()=>{
    const lvl = document.createElement('select');
    lvl.id = 'lvl-selector'

    let append = `<option>Choose Level</option>`
    for(let i =0; i < LVL_LIMIT; i++){
        append = append + `<option>${i+1}</option>`
    }
    lvl.innerHTML = append;

    document.querySelector('form').appendChild(lvl)
    
}
getLevelSelector();

const getChecks = ()=>{
    let previous = document.getElementsByClassName('level-boosts')
    while(previous[0]){
        previous[0].parentNode.removeChild(previous[0])
    }

    if(document.getElementById('lvl-selector').value === NaN) return false

    let loop = 1 + Math.floor(document.getElementById('lvl-selector').value / 5)

    for(let i = 0; i < loop; i++){
        let lev = i === 0 ? 1 : i *5
        const newDiv = document.createElement('div')
        newDiv.id = `L${lev}`
        newDiv.classList.add('level-boosts')
        newDiv.innerHTML = (
            `<input type="checkbox" id="${lev.toString()}-Str",value='Str'>
            <label for="${lev.toString()}-Str">Str</label><br>

            <input type="checkbox" id="${lev.toString()}-Dex",value='Dex'>
            <label for="${lev.toString()}-Dex">Dex</label><br>

            <input type="checkbox" id="${lev.toString()}-Con",value='Con'>
            <label for="${lev.toString()}-Con">Con</label><br>

            <input type="checkbox" id="${lev.toString()}-Wis",value='Wis'>
            <label for="${lev.toString()}-Wis">Wis</label><br>

            <input type="checkbox" id="${lev.toString()}-Int", value='Int'>
            <label for="${lev.toString()}-Int">Int</label><br>

            <input type="checkbox" id="${lev.toString()}-Cha", value='Cha'>
            <label for="${lev.toString()}-Cha">Cha</label><br>
        ` )

        document.querySelector('form').appendChild(newDiv)

    }


}

document.getElementById('lvl-selector').addEventListener('change',getChecks)

//Caclulates selected boosts //Add limit
const inputs = document.querySelectorAll('input')
for(let i =0; i < inputs.length; i++){
    inputs[i].addEventListener('change',modTable(input[i]))
}



const modTable = (input)=>{
    console.log('check')
}







const boostStat = (stat)=>{
    return stat > 17 ? 1: 2
}
const loopBoost = (num, base =10)=>{
    for(let i =0; i < num; i++){
        base+= boostStat(base)
    }
    return base;
}