
import event from './event.js';
import sockets from './socket.js';


let controllers = [...document.getElementsByTagName('input'),
                    ...document.getElementsByTagName('button')];

controllers.forEach((element,index) => {

    let type = element.dataset.type;

    type === 'connect' && event(element,'click');
    type === 'logout' && event(element,'click');
    type === 'change' && event(element,'click');

});

if (typeof io != 'undefined') sockets();
