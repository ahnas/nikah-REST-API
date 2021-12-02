function createOrdisplayChat(id){
    var csrf_token1 = $('[name="csrfmiddlewaretoken"]').val();
    data = {
        "chatName": 1,
        "ChatToUser": id,
        csrfmiddlewaretoken:csrf_token1,
    }
    $.ajax({
        url: "http://127.0.0.1:8000/api/user/chats/",
        type: 'POST',
        dataType: "JSON",
        data: data,       
        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token '+localStorage.getItem('token'));},
        success: function (response) {
            window.location.href ="http://127.0.0.1:8000/chats/";
        },
        error: function (jqXHR) {
            window.location.href ="http://127.0.0.1:8000/chats/";
            console.log(jqXHR.responseText)
            if (jqXHR.status == 400) { 
                var responseText = jQuery.parseJSON(jqXHR.responseText);
                $('#emailwarning').html(responseText['non_field_errors']);
            } else {
                $('#emailwarning').html("Unnexpected Error Occured ");
            }
        }
    }); 
}