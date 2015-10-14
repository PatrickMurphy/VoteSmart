var absorb = require('absorb');
var question = {
    questions: {
            1:{
                id: 1,
                group: 1,
                owner: 1,
                date:'10/10/15 15:35:32',
                question: ''
            }
        },
    getList: function(req, res){
        res.setHeader('Content-Type', 'application/json');
        if(typeof req.query.group !== 'undefined'){
            res.send(JSON.stringify(question.questions));
        }else{
            res.send(JSON.stringify(question.questions));
        }
    },
    get: function(req, res){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(question.questions[req.params.id]));
    },
    post: function(req, res){
        var newSession = req.body;
        console.log(newSession);
        if(newSession.hasOwnProperty('id')){
            question.questions[newSession.id] = newSession;
            res.send('recieved');
        }else{
            res.send('error');
        }
    },
    update: function(req, res){
        if(question.questions.hasOwnProperty(req.params.id)){
            question.questions[req.params.id] = absorb(question.questions[req.params.id], req.body);
            res.send('Success');
        }else{
            res.send('Incorrect ID');
        }
    }
};

module.exports = question;

/*var mysql_connection = mysql.createConnection({
  host     : '192.185.35.74',
  user     : 'pmphotog_buscent',
  password : 'trackSumBuses12',
  database : 'pmphotog_buscentral'
});

mysql_connection.connect();
mysql_connection.query('SELECT feedbackID, mood, message FROM `feedback` ORDER BY feedbackID DESC Limit 5', function (error, results, fields) {
  res.send(results);
});
	mysql_connection.end();*/