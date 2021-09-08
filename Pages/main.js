
const baseURL = 'http://localhost:4000/'
const statArr = ['Str', 'Dex', 'Con', 'Wis', 'Int', 'Cha']

//Gives race options and bonuses
const raceSection = ()=>{
    axios.get(baseURL + 'races')
    .then((result)=>{
        let append = '<option>Choose a Race</option>';
        for(let i in result.data){
            append = append + `<option>${i}</option>`
        }
        document.getElementById('race-selector').innerHTML = append
        
        
    })
    .catch(()=>console.log('j'))
}
raceSection();

const classSection = ()=>{
    axios.get(baseURL + 'classes')
    .then((result)=>{
        let append = `<option>Choose a Class</option>`
        for(let i in result.data){
            append = append + `<option>${i}</option>`
        }
        document.getElementById('class-selector').innerHTML = append;
    }).catch(()=> console.log('class transfer err'))
}
classSection();
const backgroundSection = ()=>{
    axios.get(baseURL + 'backgrounds')
    .then((result)=>{
        let append = `<option>Choose a background</option>`
        for(let i in result.data){
            append = append + `<option>${i}</option>`
        }
        document.getElementById('background-selector').innerHTML = append;
    }).catch(()=>console.log('background err'))
}
backgroundSection();

//Allows player to select their stats
document.getElementById('race-selector').addEventListener('change',()=>{
    let chosenRace = document.getElementById('race-selector').value
    
    const elements = document.getElementsByClassName('race')
    while(elements.length >0){
        elements[0].parentNode.removeChild(elements[0])
    }

    console.log(chosenRace)
    axios.get(baseURL + 'races')
    .then((result)=>{
        const boosts = result.data[chosenRace]["boosts"]
        //console.log(boosts['b'], boosts['p'], boosts['f'])
        if(boosts['f']!== 0){
            for(let i =0; i <boosts['f']; i++){
                let boostSelect = document.createElement('select')
                boostSelect.id = `race-boost-${i}`
                boostSelect.className = 'race'
                
                let append = `<option>Choose Stat</option>`
                for(let i of statArr){

                    append = append + `<option>${i}</option>`
                }
                boostSelect.innerHTML = append
                document.querySelector('form').appendChild(boostSelect)

            }
        }

        
    })
    .catch('err')
})
document.getElementById('class-selector').addEventListener('change', ()=>{

    const elements = document.getElementsByClassName('class')
    while (elements.length > 0){
        elements[0].parentNode.removeChild(elements[0])
    }
    axios.get(baseURL + 'classes')
    .then((result)=>{
        let input = document.getElementById('class-selector').value
        let boosts = result.data[input]['b']

        if(boosts.length < 2) 1 === 1 //Do nothing
        else {
            let classSelect = document.createElement('select')
            classSelect.className = 'class';

            let apppend = `<option>Choose Stat</option>`
            for(let i of boosts){
                apppend = apppend + `<option>${i}</option>`
            }
            classSelect.innerHTML = apppend;
            document.querySelector('form').appendChild(classSelect)
        }
    }).catch(()=>console.log('class err'))
})
document.getElementById('background-selector').addEventListener('change',()=>{
    const elements = document.getElementsByClassName('background')
    while (elements.length > 0){
        elements[0].parentNode.removeChild(elements[0])
    }
    axios.get(baseURL+ 'backgrounds')
    .then((result)=>{
        let input = document.getElementById('background-selector').value;
        let boosts = result.data[input]['b'];
        let free = result.data[input]['f'];

        let option = document.createElement('select')
        option.className = 'background'
        option.id = `background-boost-0`

        let append = `<option>Choose a stat</option>`
        for(let i of boosts){
            append = append + `<option>${i}</option>`
        }
        option.innerHTML = append;
        document.querySelector('form').appendChild(option);

        for(let i =0; i<free; i++){
                let boostSelect = document.createElement('select')
                boostSelect.id = `background-boost-${i+1}`
                boostSelect.className = 'background'
                
                let append = `<option>Choose Stat</option>`
                for(let i of statArr){

                    append = append + `<option>${i}</option>`
                }
                boostSelect.innerHTML = append
                document.querySelector('form').appendChild(boostSelect)
        }


    }).catch(()=>console.log('back err'))
})

//Sends data to the server
document.getElementById('stat-submit').addEventListener('click', ()=>{
    document.getElementById('statTable') ? document.getElementById('statTable').removeChild() :0 ===0
    let classArr=[]
    let loop = document.getElementsByClassName('class');
        for(let i in loop){
            if(loop[i].value) classArr.push(loop[i].value)
        }

    let backArr = []
    loop = document.getElementsByClassName('background')
        for(let i in loop){
            if(loop[i].value) backArr.push(loop[i].value)
        }
    let raceArr=[]
    loop = document.getElementsByClassName('race')
        for(let i in loop){
            if(loop[i].value)raceArr.push(loop[i].value)
        }
    
    let obj = {
        'class':document.getElementById('class-selector').value,
        'background':document.getElementById('background-selector').value,
        'race':document.getElementById('race-selector').value,

        'choice class': classArr,
        'choice background': backArr,
        'choice race': raceArr


    }
    console.log(obj)
    axios.post(baseURL + 'submit',obj)
    .then((result)=>{
        console.log(result.data)
        //Create a chart showing the results of your choices

        let obj = result.data;

        //Error message for overlap


        const statTable = document.createElement('table')
        statTable.id = 'statTable';

        statTable.innerHTML = `
            <tr>
                <th>Stat</th>
                <th>Race</th>
                <th>Class</th>
                <th>Background</th>
                <th>Total</th>
            </tr>

            <tr>
                <th>Str</th>
                <th>${obj.race.Str}</th>
                <th>${obj.class.Str}</th>
                <th>${obj.background.Str}</th>
                <th>${obj.Str}</th>
            </tr>

            <tr>
                <th>Dex</th>
                <th>${obj.race.Dex}</th>
                <th>${obj.class.Dex}</th>
                <th>${obj.background.Dex}</th>
                <th>${obj.Dex}</th>
            </tr>

            <tr>
                <th>Con</th>
                <th>${obj.race.Con}</th>
                <th>${obj.class.Con}</th>
                <th>${obj.background.Con}</th>
                <th>${obj.Con}</th>
            </tr>
            
            <tr>
                <th>Wis</th>
                <th>${obj.race.Wis}</th>
                <th>${obj.class.Wis}</th>
                <th>${obj.background.Wis}</th>
                <th>${obj.Wis}</th>
            </tr>
           
            <tr>
                <th>Int</th>
                <th>${obj.race.Int}</th>
                <th>${obj.class.Int}</th>
                <th>${obj.background.Int}</th>
                <th>${obj.Int}</th>
            </tr>

            <tr>
                <th>Cha</th>
                <th>${obj.race.Cha}</th>
                <th>${obj.class.Cha}</th>
                <th>${obj.background.Cha}</th>
                <th>${obj.Cha}</th>
            </tr>


        
        `
        document.querySelector('form').appendChild(statTable);

    }).catch(()=>{console.log('err chart')})
})