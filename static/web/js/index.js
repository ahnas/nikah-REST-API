function logout(){
    localStorage.removeItem('token');
    window.location.href = "http://127.0.0.1:8000/";
}
var pageURL = $(location).attr("href");
$(document).ready(function () {
    if(localStorage.getItem('token')!=null){
       
    $.ajax({
        url: "http://127.0.0.1:8000/api/user/test_auth/",
        type: 'GET',
        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token '+localStorage.getItem('token'));},
        success: function (response) {
            $.ajax({
                url: "http://127.0.0.1:8000/api/user/userdetailsFillCheck/",
                type: 'GET',
                beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('token')); },
                success: function (response) {
                    if (response['userProperties'] == true && response['user'] == true && response['userImage'] == true) {
                        if (pageURL != "http://127.0.0.1:8000/home/" && pageURL != "http://127.0.0.1:8000/pending/") {
                            window.location.href = "http://127.0.0.1:8000/home"
                        }
                    }
                    else if (response['userProperties'] == false) {
                        if (pageURL != "http://127.0.0.1:8000/profiler") {
                            window.location.href = "http://127.0.0.1:8000/profiler"
                        }
                    }
                    else if (response['user'] == false) {
        
                        if (pageURL != "http://127.0.0.1:8000/profilerB") {
                            window.location.href = "http://127.0.0.1:8000/profilerB"
                        }
                    }
                    else if (response['userImage'] == false) {
        
                        if (pageURL != "http://127.0.0.1:8000/imageupload") {
                            window.location.href = "http://127.0.0.1:8000/imageupload"
                        }
                    }
                },
                error: function (jqXHR) {
                }
            });
            
        },
        error: function (jqXHR) {
            if (jqXHR.status == 400) { 
                var responseText = jQuery.parseJSON(jqXHR.responseText);
                $('#emailwarning').html(responseText['non_field_errors']);
            } else {
                $('#findsoulmate').html("<a href='login/'><button class='btn btnr'>Login</button></a></div>");
            }
        }
    });
}   

});