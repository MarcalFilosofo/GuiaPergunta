const express = require('express')
// const bootstrap = require('bootstrap')
const app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/fazerPergunta', (req, res) => {
    res.render('fazerPergunta')
})

app.listen(8080, () => { 
    console.log("App rodando")
})