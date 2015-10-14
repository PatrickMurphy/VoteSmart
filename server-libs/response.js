var response = {
    responses: {
            1:{
                id: 1,
                group: 1,
                owner: 1,
                times: {start:'10/10/15 13:35:32',end:'10/10/15 15:35:32'}
            }
        },
    getList: function(req, res){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(response.responses));
    },
    get: function(req, res){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(response.responses[req.params.id]));
    },
    post: function(req, res){
        var newSession = req.body;
        console.log(newSession);
        if(newSession.hasOwnProperty('id')){
            response.responses[newSession.id] = newSession;
            res.send('recieved');
        }else{
            res.send('error');
        }
    }
};

module.exports = response;