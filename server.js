  let express = require('express'),
    http = require('http');
    path = require('path'),
    bodyParser = require('body-parser'),
    cookie = require('cookie'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    // httpProxy = require('http-proxy'),
    vhost = require('vhost'),
    formidable = require('formidable'),
    serveStatic = require('serve-static'),
    expressSession = require('express-session'),
    redis = require('redis'),
    redisStore = require('connect-redis')(expressSession),
    eventEmitter = require('events'),
    connect = require('connect'),
    fs = require("fs");
    


    let staticapp = connect();
    staticapp.use(serveStatic('./public'));
  
    config = require('./config/config');

    // express
    const app = express(); // lib
    app.use(cookieParser());

      // middlewear
  let server = http.createServer(app).listen(config.get('port'), function(){

    console.log(`Server listening on port ${config.get('port')}`);

  //   app.locals.client.get("admin", function(err, reply) {
  //     // reply is null when the key is missing
  //     console.log(reply);
  // });
  });
  io = require('socket.io')(server),

// socket io
    app.locals.client  = redis.createClient();
    app.locals.prefix = 'sess:';


       app.use(cookieParser());
        app.use(expressSession({ // set session cookie
          secret: config.get('session:secret'),
          key: config.get('session:key'),
          resave: false,
          "maxAge": null,
          saveUninitialized: true,
          cookie: { secure: false },
          store: new redisStore({ host: 'localhost', port: 6373, client: app.locals.client})
        }));

        io.set('origins',config.get('host'));
    const socketIO = require('./socket')(io,app);
    // io.set('logger',2);

    const login = require('./routes/login')(app),
    index = require('./routes/index')(app),
    logout = require('./routes/logout')(app,socketIO),
    panel = require('./routes/panel')(app,io),
    mail = require('./routes/mail')(app);


 
    // app.use(vhost('main.localhost:9000', staticapp));
    app.use(express.static(__dirname + '/public'));
    app.use(vhost('im', staticapp));

    app.set('view engine','egs'); // for ejs
    app.set('views', path.join(__dirname, '/views')); // views path
    // app.use(vhost('admin.mydomain.local', app2)); // Serves second app


    app.locals.client.on("connect", function () {
    //   app.locals.client.flushdb( function (err, succeeded) {
    //     console.log(succeeded); // will be true if successfull
    // });
  });

  app.locals.client.on("error", function (err) {
    console.log("Error " + err);
});
