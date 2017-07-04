const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');

let app = express();

app.use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(express.static(path.join(__dirname, 'dist')))
  .use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
  });

passport.use(new LocalStrategy(
  (username, password, cb) => {
    let user = Object.keys(database).find( elem => elem === username);
    if (!user) { return cb(null, false) };
    if (database[user].password !== password) { return cb(null, false) };
    return cb(null, database[user])
  }
));

let database = {
	"lelin999@gmail.com": {
		user: "lelin999@gmail.com",
		password: '12345'
	}
};

app.post('/signup', (req, res) => {
	let user = req.body.email;
	let password = req.body.password;
	let searchResults = findUser(database, user);
	let result;
	if (searchResults) {
		result = { token: null, status: 'USEREXISTS' }
	} else {
		database[user] = {
			user,
			password
		}
		let token = jwt.sign({user}, 'secret');
		result = {token, status: 'USEREXISTS' };
	}
	res.send(result);
});

app.post('/signin', (req, res) => {
	let user = req.body.email;
	let password = req.body.password;
	let searchResults = findUser(database, user);
	let result;
	if (!searchResults || password !== database[user].password) {
		result = { token: null, status: 'USERORPWNOTFOUND' }
	} else {
		database[user] = {
			user,
			password
		}
		let token = jwt.sign({user}, 'secret');
		result = {token, status: 'SUCCESS' };
	}
	res.send(result);
});


let findUser = (db, user) => {
  return Object.keys(db).find(elem => elem === user);
};

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, './dist/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);
app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
})