$(document).ready(function () {
    $('#Chats').empty();
    $.ajax({
        url: "http://127.0.0.1:8000/api/user/chats/",
        type: 'GET',
        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token '+localStorage.getItem('token'));},
        success: function (response) {
            const obj = JSON.parse(JSON.stringify(response));
            if(obj!=null){
            loadchats(obj[0].chatName,obj[0].chatDisplayName);
            $('#chatsList').empty()
            for(let i = 0; i < obj.length && i<=200; i++){
            $('#chatsList').append("<div id="+obj[i].chatName+" class='row chattt' onclick=(loadchats('"+obj[i].chatName+"','"+obj[i].chatDisplayName+"')) }'>\
            <div class='col-3 imgct'><img class='chatimg' src="+obj[i].chatimage+" alt='HI'></div>\
            <div class='col-6 sacti'><h4 class='mb-1'>"+obj[i].chatDisplayName+"</h4> <p>You : ............</p></div>\
            <div class='col-3 acti'><p>2min ago</p><div id='do' class='d-none'><span class='do' ></span> Active now</div></div>\
            </div>")
            }

            }
            
        },
        error: function (jqXHR) {
            if (jqXHR.status == 404) { 
            } else {
              
            }
        }
    }); 




});