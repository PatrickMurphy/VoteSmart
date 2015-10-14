//  Student / TA / Teacher / admin / Super Admin
var user = {
    users: {
            1:{
                id: 1,
                name: 'Prof. Tester',
                type: 'teacher',
                type_code: 3
            },
            2:{
                id:2,
                name: 'Billy Books',
                type: 'student',
                type_code: 1
            }
        },
    getList: function(req, res){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(user.users));
    },
    get: function(req, res){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(user.users[req.params.id]));
    }
};

module.exports = user;