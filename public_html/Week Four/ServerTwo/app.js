var express = require('express')
var handlebars = require('hbs')

var app = express()

// Setting up handlebars view engine
app.set('view engine', 'hbs')
app.use(express.urlencoded({extended:false}))

// hbs helper function
handlebars.registerHelper('ptag', (num) => {
    var msg = ""
    for(let i = 0; i < num; i++){

        msg += `<p>${num}</p>`
    }
    return new handlebars.handlebars.SafeString(msg)
})


app.get('/form', (req,res) => { 
    res.render('form.hbs')
})

app.post('/results', (req,res) => {
    res.render('results.hbs', {
        num:req.body.testNumber
    })
})

app.listen(3000, () => {
    console.log('running on port 3000')
})