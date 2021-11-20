
function loadchats(chatName,chatDisplayName) {
    $('#nmID').html("<h4 class='mb-1' id='nmID'>"+chatDisplayName+" <span class='float-right'> <span class='do'></span> Active now</span></h4> <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed</p>");
    $.ajax({
        url: "http://127.0.0.1:8000/api/user/getmessages/?chatID=" + chatName+ "/",
        type: 'GET',
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('token')); },
        success: function (response) {
            // $('#username').html("<a href='#' class='text-white'>"+myArr[1]+"</a>");
            const obj = JSON.parse(JSON.stringify(response));
            
            $('#Chats').empty()
            for (let i = 0; i < obj.length; i++) {
                if(obj[i].user==4){
                    $('#Chats').append("<div class='col-12 sender pt-3'>\
            <p><img src='"+obj[i].chatimage+"' style='width: 5%; border-radius: 50%;' alt=''> \
            <span class='ml-2'>"+ obj[i].message + "</span> </p> </div>")
                   
                }
                else{
                    $('#Chats').append("<div class='col-12 reciever pt-3'><p>\
                    <span class='ml-2'>"+ obj[i].message + "</span> <img src='"+obj[i].chatimage+"'\
                     style='width: 5%; border-radius: 50%;' alt=''>  </p> </div>")
                
                }
            }
            
        },
        error: function (jqXHR) {
            if (jqXHR.status == 404) {
            } else {

            }
        }
    });
}

$("#typedMessage").keypress(function(e) {
    if(e.which == 13) {
        sendMessage()
    $("#go").click();
    }
});

function sendMessage(){
    
    var csrf_token1 = $('[name="csrfmiddlewaretoken"]').val();
    data = {
        "message": "community",
        "chat": 'NM',
        "user": '2',
        csrfmiddlewaretoken:csrf_token1,
    }
    $.ajax({
        url: "http://127.0.0.1:8000/api/user/getmessages/",
        type: 'POST',
        dataType: "JSON",
        data: data,
                    
        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token '+localStorage.getItem('token'));},
        success: function (response) {
            // var responseText = jQuery.parseJSON(response);   
            //sessionStorage.setItem("token", response['token'])
            window.location.href = "http://127.0.0.1:8000/home/"
        },
        error: function (jqXHR) {
            if (jqXHR.status == 400) { 
                var responseText = jQuery.parseJSON(jqXHR.responseText);
                $('#emailwarning').html(responseText['non_field_errors']);
            } else {
                $('#emailwarning').html("Unnexpected Error Occured ");
            }
        }
    }); 
}