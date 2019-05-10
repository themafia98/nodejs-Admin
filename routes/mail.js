
    const   nodemailer = require('nodemailer'),
    bodyParser = require('body-parser'),
    urlencodedParser = bodyParser.urlencoded({ extended: false });
    
module.exports = function(app){

    app.post('/send',urlencodedParser,function(req, res){

        let pathMail = path.join(__dirname ,"../mail/mailAccount.txt");

        let fileContent = fs.readFileSync(pathMail, "utf8");
        let account = fileContent.split(' ');
        if (!req.body) return res.sendStatus(400);

        let form = new formidable.IncomingForm();
        form.parse(req, function(err, fields){
        if(err) { console.error(err); return false; }

        console.log(fields);

        let transporter = nodemailer.createTransport({
                ervice: 'Gmail',
            auth: {
                user: account[0],
                pass: account[1]
            }
        });
            
        transporter.sendMail({
            from: fields.email,
            to: account[0],
            subject: 'запрос клиента',
            text: `Сообщение от ${fields.email}, имя: ${fields.name} :\n ${fields.text}\n Телефон клиента: ${fields.phone}`,
        });

        console.log('Mail send!');
            res.sendStatus(200);

        });
    });
};