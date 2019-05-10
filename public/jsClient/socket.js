

export default function(){

    let socket = io.connect('', { reconnect: true })

    .on('disconnect',function(socketData){
   
        console.log('disconnect socket io');
        
        if (socketData){

            console.log(socketData);
            window.location = '/';
        }
    })

    .on('connect',function(socket){

        console.log(socket);

    })

    .on('join', function(response){
        let warning = document.querySelector('.warning');
        count++;
        warning.innerHTML = ' ' + response.data;
        
    })

    .on('leave', function(response){
        console.log(response);
    });

}