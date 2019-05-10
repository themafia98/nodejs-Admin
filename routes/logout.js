const bodyParser = require('body-parser');
const socket = require('../socket.js');

module.exports = function(app,socketIO){

    app.post('/logout',function(req,res){

        if (req.session.name && req.session.key){
        let pathUsers = path.join(__dirname ,"../storage/users.json");

        fs.readFile(pathUsers, 'utf-8', function(err,usersStorage){
            if(err) throw new Error('read users db error');
            usersStorage = JSON.parse(usersStorage);
            usersStorage = JSON.stringify(usersStorage,null, '\t');

            fs.writeFile(pathUsers,usersStorage,function(err){
                if(err) throw err;

                req.session.destroy(function(err){
                    if(err) throw new Error('user session undefiend');

                        status = 'disconect';
                        req.session = null;
                        console.log(status);
                        res.redirect(200,'/');
                });
            });
        });
        } else {
                        res.redirect(200,'/404');
                        throw new Error('user session undefiend');
        }
    });
};