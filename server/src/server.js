const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const socketio = require('socket.io')
const http = require('http')

const routes = require('./routes')

const app = express()

mongoose.connect('Put your Database URL Here', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// Extraindo o servidor HTTP da nossa aplicação em Express
// Com essa configuração a aplicação já está pronta para ouvir requisições tanto HTTP E Web Socket
const server = http.Server(app);
const io = socketio(server)

// Nesse caso estamos armazenando os usuários conectados na nossa aplicação nesse objeto
// mas toda vez que o servidor for reiniciado ele vai perder esses usuários

// Assim em uma aplicação em produção, é necessário usar um banco de dados rápido para
// armazenar esses usuários, podemos usar o MongoDB mas o recomendado é o Redis
// por ele ser mais rápido, e ser feito para salvar esses dados que não tem relacionamento no banco,
// só são dados e não informações

const connectedUsers = {}

// Vamos escutar a conexão de cada usuário que logar na aplicação, o socket nesse caso é a conexão
io.on('connection', socket => {
    
    // console.log(socket.handshake.query)
    // Cada conexão com o Back tem um id único
    // console.log('Usuário conectado', socket.id)

    const { user_id } = socket.handshake.query;

    // Está sendo utilizado esse formato de Array pois salvar objeto dessa forma connectedUsers.user_id
    // A informaçõ seria salva dessa forma

    /* 
        const connectedUsers = {

            user_id: ID do usuário

        }
    */

    // E a informação deve ser salva dessa forma

    /* 
        const connectedUsers = {

            // ID do Usuário
            123213221322

        }

    */

    connectedUsers[user_id] = socket.id

})

// Middleware
// Além de receber o req e res ele também recebe o next uma função
// que quando é chamada indica que a aplicação pode continuar o seu caminho

app.use((req, res, next) => {

    // Com isso todas as rotas da aplicação vão ter acesso ao io do socket e aos usuários conectados
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next()

})

// GET, POST, PUT, DELETE

// req.query = Acessar query params (Para Filtros)
// req.params = Acessar route params (Para Edição, Delete)
// req.body = Acessar corpo da requisição (Para criação, edição de registros)

app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes)

server.listen(3333);