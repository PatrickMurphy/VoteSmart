var objFilter = require('object-filter');
var isNumeric = function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
var session = {
    sessions: {
            1:{
                id: 1,
                group: 1,
                owner: 1,
                times: {start:'10/10/15 13:35:32',end:'10/10/15 15:35:32'}
            },
            2:{
                id:2,
                group: 2,
                owner: 1,
                times:{start:'10/11/15 13:35:32',end:'10/11/15 15:35:32'}
            }
        },
    getList: function(req, res){
        res.setHeader('Content-Type', 'application/json');

       if(req.query.hasOwnProperty('group') && isNumeric(req.query.group)){
           var response = objFilter(session.sessions, function(v,k){
               return v.group == req.query.group;
           });
           res.send(response);
       }else{
        res.send(session.sessions);
       }
    },
    get: function(req, res){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(session.sessions[req.params.id]));
    },
    post: function(req, res){
        var newSession = req.body;
        console.log(newSession);
        if(newSession.hasOwnProperty('id')){
            session.sessions[newSession.id] = newSession;
            res.send('recieved');
        }else{
            res.send('error');
        }
    }
};

module.exports = session;
