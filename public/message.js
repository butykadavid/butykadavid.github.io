var MsgSend = function(){
    
    var message = document.getElementById('text_input').innerHTML;
    const data = {message};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch('/msg', options);
    document.getElementById('text_input').innerHTML = '';
}