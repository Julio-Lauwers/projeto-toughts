const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require ('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const conn = require('./db/conn')

//models
const Tougth = require('./models/Tought') 
const User = require('./models/User')

// import Routes
const toughtsRoutes = require('./routes/toughtsRoutes')
const authRoutes = require('./routes/authRoutes')

// import controller
const ToughtController = require('./controllers/ToughtController')

// template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//receber resposta do body
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

//session midware (onde o express vai salvar  as sessoes)
app.use(
    session({
        name: 'session', 
        secret: 'nosso_secret',
        resave: false, // se cair a sessão, desconecta
        saveUninitialized: false, 
        // onde salvar
        store: new FileStore({
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(), 'sessions'), // path é o caminho para a pasta
        }),
        cookie: { 
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000 ),
            httpOnly: true
        }
    }),
)

//Flash messages (mensgens do sistema para o usuario)

app.use(flash())

// public path
app.use(express.static('public'))
// set session to res

app.use((req, res, next) => {

    if(req.session.userid) {
        res.locals.session = req.session
    }

    next()

    
})

//Routes
app.use('/toughts', toughtsRoutes)
app.use('/', authRoutes)

app.get('/', ToughtController.showToughts)


conn     
    .sync()
    .then(() => {
        app.listen(3000)
    })
    .catch((err) => console.log(err))