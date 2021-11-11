
$(document).ready(function () {
    $.ajax({
        url: "http://127.0.0.1:8000/api/user/test_auth/",
        type: 'GET',
        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token '+localStorage.getItem('token'));},
        success: function (response) {
            $('#usernamefield').val(response);
        },
        error: function (jqXHR) {
            if (jqXHR.status == 400) { 
            } else {
            }
        }
    }); 

});