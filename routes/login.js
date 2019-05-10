const bodyParser = require('body-parser'),
    urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){


    app.post('/login',urlencodedParser,function(req, res){

    let pathUsers = path.join(__dirname ,"../storage/users.json");


    // console.log(cookies);
        let loginAsync = new Promise((resolve,reject) =>{

        let form = new formidable.IncomingForm(); // parse dataForm content-type

        form.parse(req, function(err, fields){
            if(err) { console.error(err); return false; }

            let userData = {
                reqLogin: fields.login,
                reqPassword: fields.password
            };

            if (!(fields.login || fields.password)) reject(new Error('No login or password'));

        return resolve(userData);
        });
        })

        .then(({reqLogin,reqPassword}) =>{

            fs.readFile(pathUsers, "utf8", function(error,usersStorage){
            
            usersStorage = JSON.parse(usersStorage).users;
    
            let currentUser = usersStorage.find(element => {
                if(error) throw new Error('Error in promise login');
                if (element.login === reqLogin &&
                    element.password === reqPassword){

                    return true;
                } else return false;
            });

            if (!currentUser) throw new Error('no user founds');


            if (currentUser != undefined){
            

                req.session.views = req.session.views + 1 || 1;
                console.log(req.session.views);
                app.locals.client.set(currentUser.login, currentUser.password, 'NX');
                req.session.key = currentUser.login;
                req.session.name = currentUser.name;
                console.log('connection...');
                res.sendStatus(200);
            } else throw new Error('no user');
            });
        })
        .catch(error =>{

            res.sendStatus(403);
            console.log(error);
        });


});
};