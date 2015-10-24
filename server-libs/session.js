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
        var response = session.sessions;
        res.setHeader('Content-Type', 'application/json');

       if(req.query.hasOwnProperty('group') && isNumeric(req.query['group'])){
           response = objFilter(response, function(v,k){
               return v['group'] == req.query['group'];
           });
       }
       if(req.query.hasOwnProperty('owner') && isNumeric(req.query['owner'])){
           response = objFilter(response, function(v,k){
               return v['owner'] == req.query['owner'];
           });
       }
       if(req.query.hasOwnProperty('start_time')){
           response = objFilter(response, function(v,k){
               return new Date(v.times.start).getTime() >= new Date(req.query['start_time']).getTime();
           });
       }
       if(req.query.hasOwnProperty('end_time')){
           response = objFilter(response, function(v,k){
               return new Date(v.times.end).getTime() <= new Date(req.query['end_time']).getTime();
           });
       }
       res.send(response);
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
