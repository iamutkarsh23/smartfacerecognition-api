const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profileid = require('./controllers/profileid');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'superuser',
    database : 'smart-brain'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req, res)=>{res.json(database.users);})

app.post('/signin', (req, res) =>{ signin.handleSignIn(req, res, db, bcrypt)} )
app.post('/register', (req, res) =>{ register.handleRegister(req, res, db, bcrypt)} );
// for future developements
app.get('/profile/:id', (req, res) => { profileid.handleProfile(req, res, db)} );
// allows us to increment the entries
app.put('/image', (req, res) => { image.handleImage(req,res,db)} );
app.post('/imageurl', (req,res) => { image.handleApiCall(req,res)});

app.listen(3000, ()=> {
    console.log('App is running on port 3000')
});

