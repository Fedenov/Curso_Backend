import cookieParser from 'cookie-parser';
import session from 'express-session';
import express from 'express'
const app = express();
import MongoStore from 'connect-mongo';
import passport from 'passport';



import { signUp_strategy, login_strategy } from './strategies.js';
import * as User from './models.js'

import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url))
import {mongoConnection} from  './db.js'
import { auth , hashPassword} from './services.js';
import { setTimeout } from 'timers/promises';

const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }

const users = [{input_mail: 'caca@caca.com'}]

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static( __dirname + '/public' ));


app.use(cookieParser());

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: mongoConnection, mongoOptions
    }),

    secret: "coderhouse",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 3000,
    },
  })
);

app.use(passport.initialize())
app.use(passport.session())



passport.use('register', signUp_strategy)
passport.use('login', login_strategy )

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, done)
})




app.set('port', 8080)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')



app.listen(8080, () => {
    
    console.log(`El servidor está escuchando el puerto: 8080 [ ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} ]`)

})





app.get('/', (req, res) => {
    if(req.session.user){
      res.render('index', {data : req.session.user})
    }else{
      res.render('index', {data:undefined})
    }
})

app.post('/login', (req, res) => {
  
  const {input_mail, input_pass} = req.body
  const user = users.find(user => user.input_mail === input_mail)     

  if(!user || input_pass !== user.input_pass){
    return res.render('error', {data: 'Credenciales invalidas'})
  }

  req.session.user = user
  res.render('index', {data:user.input_mail})
  
})

app.get('/logOut', auth, (req, res) => {
  let user = req.session.user
  req.session.destroy()
  res.render('bye', {data: user})
 
    
})

app.get('/register', (req,res) => {
  res.render('register')
})





app.post('/register', (req,res) => {
  const {input_name, input_lastName, input_mail, input_pass} = req.body

  const existingUser = users.find(user => user.input_mail === input_mail)

  if(existingUser) {
   return res.render('error', {data: 'Usuario ya existe'})
  }

    
  users.push(req.body)
  console.log(users)

  res.redirect('/')


  


})



app.get('/error', (req, res) => {
  res.render('error', {data:'Error'})
})