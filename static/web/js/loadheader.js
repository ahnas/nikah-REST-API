$("#logout").click(function () {
    localStorage.removeItem('token');
    window.location.href = "http://127.0.0.1:8000/";
});

var pageURL = $(location).attr("href");
$(document).ready(function () {
    $.ajax({
        url: "http://127.0.0.1:8000/api/user/header_load/",
        type: 'GET',
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('token')); },
        success: function (response) {
            const myArr = response.split(",");
            $('#usernamefield1').html(myArr[0] + "&nbsp&nbsp&nbsp<img style='border-radius: 50%;width:30px;height:30px;'src='" + myArr[1] + "' alt='Image'>");
        }
    });
    $.ajax({
        url: "http://127.0.0.1:8000/api/user/userdetailsFillCheck/",
        type: 'GET',
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('token')); },
        success: function (response) {

            if (response['userProperties'] == true && response['user'] == true && response['userImage'] == true) {
                if (pageURL != "http://127.0.0.1:8000/home/" && pageURL != "http://127.0.0.1:8000/pending/") {
                    // window.location.href = "http://127.0.0.1:8000/home"
                   
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






});