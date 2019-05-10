

module.exports = function(app){

const login = require('./login')(app),
    index = require('./index')(app),
    logout = require('./logout')(app),
    panel = require('./panel')(app),
    mail = require('./mail')(app);
};