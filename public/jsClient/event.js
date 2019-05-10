
export default function(module,event){

    let type = module.dataset.type;

    type === 'connect' &&
    module.addEventListener(event,eventConnect,false);

    type == 'logout' &&
    module.addEventListener(event,eventLogout,false);

    type == 'change' &&
    module.addEventListener(event,eventChange,false);

    function eventConnect(e){
        e.preventDefault();

        let login = document.querySelector('.login').value;
        let pass = document.querySelector('.password').value;

        if (login && pass){

            let formData = new FormData(document.forms.login);
            let url = '/login';
            fetch(url, {
                method: 'post',
                body: formData,
            })
            .then(response => response.status)
            .then(resposne => {

                let stat = document.querySelector('.stat');
                resposne === 403 && (stat.innerHTML = 'Invalid');
                if (resposne === 200) {

                    stat.innerHTML = 'connection';
                    let timer = setTimeout(()=>{

                    window.location.href = '/panel';
                    },500);
                }
            });
        }
    }

    function eventLogout(e){

        e.preventDefault();

        fetch('/logout', {method:'post'})
        .then(response => response.status)
        .then(response => {

        if (response === 200){
            window.location.href = '/';
        } else throw error(error);
        })
        .catch(error => console.warn(error));
    }

    function eventChange(e){

        e.preventDefault();

        let formData = new FormData(document.forms.changeEmail);
        
        let url = '/panel';
        fetch(url, {
            method: 'post',
            body: formData,
        })
        .then(response => response.status)
        .then(response => {
            
            let warning = document.querySelector('.warning');

            if(response === 200){
                
                warning.innerHTML = ' Email for clients requst change';
            } else warning.innerHTML ='Wrong policy, email no change.';
        })
        .catch(err => console.warn(err));
    };

}

