const express = require('express')
const bodyParser = require('body-parser')
const connection = require('./database/database')
const Pergunta = require('./database/Pergunta')
const Resposta = require('./database/Resposta')


connection.
    authenticate().
    then(() => {
        console.log("Conexão feita com sucesso")
    })
    .catch((error) => {
        console.error(error)
    })

const app = express();

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extend: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    Pergunta.findAll({ raw: true, order: [
        ['id', 'DESC']
    ]}).then(perguntas => {
        res.render('index', {
            perguntas: perguntas
        })
    })
})

app.get('/fazerPergunta', (req, res) => {
    res.render('fazerPergunta')
})

app.post('/salvarPergunta', (req, res) => {
    var titulo = req.body.titulo
    var descricao = req.body.descricao
    Pergunta.create({
        titulo: titulo,
        descricao: descricao,
    }).then(() =>{
        res.redirect('/')
    })
})

app.get('/pergunta/:id', (req, res) => {
    var id = req.params.id
    Pergunta.findOne({ 
        where: { id: id}
        
    }).then(pergunta => {
        if(pergunta != undefined){
            Resposta.findAll({
                where: { perguntaId: pergunta.id},
                order: [
                    ['id', 'DESC']
                ]
            }).then(respostas => {
                res.render('pergunta', {
                    pergunta: pergunta,
                    respostas: respostas
                })
            })
        }else{
            res.redirect('/')
        }
    })
})

app.post('/responder', (req, res) => {
    var corpo = req.body.corpo
    var perguntaId = req.body.perguntaId
    // console.log(corpo, perguntaId)
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect('/pergunta/' + perguntaId)
    })
})

app.listen(8080, () => { 
    console.log("App rodando")
})