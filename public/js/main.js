const numberInput = document.getElementById('number'),
    textInput = document.getElementById('msg'),
    button = document.getElementById('button'),
    response = document.querySelector('.response');

button.addEventListener('click', send, false);


const socket = io();
socket.on('smsStatus', function(data){
    response.innerHTML = '<h5> Text send to +' + data.number + '</h5>';
});

function send() {
    const number = numberInput.value.replace(/\D/g, '');
    const msg = textInput.value;
    
    fetch('/', {
        method : 'post',
        headers :  {
            'Content-type': 'application/json'
        },
        body : JSON.stringify({
            number : number,
            text : msg
        })
    })
    .then(function(res){
       console.log(res); 
    })
    .catch(function(err){
        console.log(err);
    })
}