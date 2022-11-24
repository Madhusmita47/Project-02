const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const route = require("./routes/route.js")
const app = express()



app.use(bodyparser.json())
// app.use(bodyparser.urlencoded)

mongoose.connect("mongodb+srv://madhusmita_123:5fiVrKsOKBIGJsKe@cluster0.cpbhduk.mongodb.net/project-02", {useNewUrlParser:true} )
.then(() => console.log("MongoDB connected.."))
.catch(err => console.log(err))


app.use('/', route)


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});