const { default: axios } = require("axios")

const baseURL = 'https://assesment6.herokuapp.com/'

axios.get(baseURL + 'races')
.then((res)=>{
    console.log(res.data)
})