console.log('client.js has been loaded');

$(document).ready(function(){
    console.log('JQ has been loaded');
    $.ajax({
        method: 'POST',
        url: '/shoes',
        data: {
            name: 'Nike Air Jordan',
            cost: '110'
        },
        success: function(response) {
            console.log('response', response);
            
        }
    })
})