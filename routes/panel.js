const bodyParser = require('body-parser'),
    urlencodedParser = bodyParser.urlencoded({ extended: false }),
    nodemailer = require('nodemailer'),
    fs = require('fs');

module.exports = function(app,io){
    
    io.use(function(socket, next) {
        console.log('cookies:');
        socket.request.cookies = cookie.parse(socket.request.headers.cookie);
        let signedCookie = socket.request.cookies[config.get('session:key')];
        let sid = cookieParser.signedCookie(signedCookie,config.get('session:secret'));

        if(!sid) throw new Error('Error cookie socket io');
        app.locals.client.get(app.locals.prefix + sid, function(err, reply) {
            console.log(reply);
            if (err) throw new Error('Error read db');
            if (!reply) {
                throw new Error('Error found user in db'); 
            } else next();
        });
        });

        
    app.get('/panel', (req,res) => {
        let data = {};

        if(req.session.key){
        app.locals.client.get(req.session.key, function(err, reply) {
            // reply is null when the key is missing

            console.log(req.session.key['admin@admin.com']);
        if(reply != null){

        status = 'connection';
        data.status = status;
        console.log('render');
        let showObject =  {data: {name: req.session.name}};
        res.render('panel.ejs', showObject); // ejs
        } else {

            status = 'invalid';
            console.log('invalid key');
            res.render('403.ejs');
        }
    });
} else {

    status = 'invalid';
    console.log('invalid connect');
    res.render('403.ejs');
}
});

app.post('/panel',urlencodedParser,function(req, res){

    let pathSend = path.join(__dirname ,"../mail/mailAccount.txt");
    let count = 1;
    let data = {};

    console.log(req.session);

    if (req.session.key && req.session.key.policy == 'admin' && count === 1){



        console.log(req.session.key);
        count++;
        let fileContent = fs.readFileSync(pathSend, "utf8");
        let account = fileContent.split(' ');
        let form = new formidable.IncomingForm();
            form.parse(req, function(err, fields){
            if(err) { console.error(err); return false; }

        let message = `${fields.email} ${fields.emailPassword}`;
        fs.writeFileSync(pathSend, message);
        data.msg = 'susses change';
        console.log('susses change');
        count = 1;
        res.sendStatus(200);
        });
    } else res.sendStatus(403);
});
};
