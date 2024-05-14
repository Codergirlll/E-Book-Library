
const express = require("express")

const app = express()

require("dotenv").config()
const port= process.env.PORT|| 4040 

app.listen(port,()=>{
    console.log(`Server is running at Port no. ${port}`)
})