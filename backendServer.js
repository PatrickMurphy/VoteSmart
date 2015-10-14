'use strict';

var express = require('express.io'),
		app = express(),
        bodyParser = require('body-parser'),
		mysql = require('mysql'),
        // custom libs
        insitution = require('./server-libs/insitution'),
        group = require('./server-libs/group'),
        user = require('./server-libs/user'),
        question = require('./server-libs/question'),
        response = require('./server-libs/response'),
        session = require('./server-libs/session'),
    
		util = require('./server-libs/server-utils'),
		settings = {
			serverName: 'VoteSmart',
			host: 'localhost',
			port: process.env.PORT || 3010
		};

// setup public folder as static file serving location
// app.use(express.static('public'));
app.use(bodyParser.json());

// initialize socket.io
app.http().io();
// initialize pulpit event broadcaster
//pulpit.setup(app.io, foxtraxReader);

// on client connection register events like disconnect
//app.io.on('connection', pulpit.addConnection);


// -----------------------------------------------
// set up server
// -----------------------------------------------
var server = app.listen(settings.port, function () {
  console.log(settings.serverName + ' Backend Server listening at http://%s:%s', settings.host, settings.port);
});

// default route
app.get('/', function (req, res) {
	util.log('index', req.ip, function(){
	res.send('Welcome to the ' + settings.serverName + ' Backend Server<br />'+
             '<a href="/institution">Institutions</a><br /><a href="/user">Users</a><br /><a href="/group">Groups</a><br />'+
            '<a href="/session">Sessions</a><br /><a href="/question">Questions</a><br /><a href="/response">Responses</a><br />');
	});
});


// -----------------------------------------------
// Institutions / Customers 
// -----------------------------------------------

// GET List of Institutions     Super ADMIN  Returns users institution if not admin (MVP)
app.get('/institution', insitution.getList);

// GET Institution/:id          Super ADMIN (MVP)
app.get('/institution/:id', insitution.get);
// POST Institution             Super ADMIN
// UPDATE Institution           ADMIN
// DELETE Institution           ADMIN (Requests delete) / Super Admin


// -----------------------------------------------
// User     Student / TA / Teacher / admin / Super Admin
// -----------------------------------------------

// GET list of users (MVP) 2 users
app.get('/user', user.getList);

// GET (MVP) get each user
app.get('/user/:id', user.get);
// POST
// UPDATE
// DELETE
// login  authorization header
// logout


// -----------------------------------------------
// Groups / Classes
// -----------------------------------------------
    
// GET  list of groups          student (MVP)
app.get('/group', group.getList);

// GET  /group/:id one group    student (MVP)
app.get('/group/:id', group.get);
// POST create group  admin (Teacher can request)
// UPDATE             teacher
// DELETE             teacher (hides from lower, request delete)


// -----------------------------------------------
// Sessions
// -----------------------------------------------

// GET list of sessions
app.get('/session', session.getList);

// GET one session
app.get('/session/:id', session.get);

// POST create session
app.post('/session', session.post);
// UPDATE session
// DELETE session


// -----------------------------------------------
// Questions
// -----------------------------------------------
    
// GET      get list of questions for session
app.get('/question', question.getList);

// GET      get one question
app.get('/question/:id', question.get);

// POST     add question   ta or greater
app.post('/question', question.post);

// UPDATE   
app.put('/question/:id', question.update);
// DELETE


// -----------------------------------------------
// Responses
// -----------------------------------------------

// GET     get votes and summary
app.get('/response', response.getList);

// GET     get particular vote
app.get('/response/:id', response.get);

// POST    submit vote
app.post('/response', response.post);

// UPDATE change vote