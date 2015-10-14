var group = {
    groups: {
            1:{
                id: 1,
                name: 'CS 110',
                owner: 1
            }
        },
    getList: function(req, res){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(group.groups));
    },
    get: function(req, res){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(group.groups[req.params.id]));
    }
};

module.exports = group;