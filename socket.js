const cookieParser = require('cookie-parser'),
      cookie = require('cookie');


module.exports = function (io,app){

    io.sockets.on('connect',function(socket){

      console.log('socket io connection');
      socket.broadcast.emit('join',{data: 'user connection'});
    });



    io.sockets.on('disconnect',function(socket){

      console.log('socket io disconnect');

      socket.broadcast.emit('disconnect', function(){

        socket.broadcast.emit('leave',{data: 'new user connection'});
      });
    });

};