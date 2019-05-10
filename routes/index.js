

module.exports = function(app){

    app.get('/',function(req, res){

    let data = {};
         // create new session object.
    if(req.session.key) {
        status = 'connection';
        data.status = status;
        console.log('connection..');
        res.redirect('/panel'); // ejs
        } else {

        data.status = '';
        res.render('admin.ejs', {data: data});
        }
    });
};
