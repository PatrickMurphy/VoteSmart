var insitution = {
    insitutions: {
            1:{
                id: 1,
                name: 'CWU'
            }
        },
    getList: function(req, res){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(insitution.insitutions));
    },
    get: function(req, res){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(insitution.insitutions[req.params.id]));
    }
};

module.exports = insitution;