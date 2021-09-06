// const { default: axios } = require("axios");

// const { response } = require("express")
const baseURL = process.env.baseURL || "http://localhost:4000"
axios.get(`${baseURL}/races`,(response)=>{
    console.log(response.data)
})