

$("#logout").click(function () {
    localStorage.removeItem('token');
    window.location.href = "http://192.168.1.65:8000/";
});
function loadlikecount(){
    $.ajax({
        url: "http://192.168.1.65:8000/api/user/GetLikesAndMatches/",
        type: 'GET',
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('token')); },
        success: function (response) { 
            var total_like =parseInt(response['likedyoucount']);
            $('[id="intr"]').html(total_like); 
            
            var youu_like = parseInt(response['youLikecount'])-parseInt(response['matchedcount']);
            var like_youu = parseInt(response['likedyoucount'])-parseInt(response['matchedcount']);
            var matchcount = parseInt(response['matchedcount']);


            $('#youlik').html(youu_like); 
            $('#likyo').html(like_youu);
            $('#matchh').html(matchcount);

        }
    });}
var pageURL = $(location).attr("href");
$(document).ready(function () {
    $.ajax({
        url: "http://192.168.1.65:8000/api/user/header_load/",
        type: 'GET',
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('token')); },
        success: function (response) { 
            const myArr = response.split(",");
            console.log(myArr)
            $('#usernamefield1').html(myArr[0] + "&nbsp&nbsp&nbsp<img style='border-radius: 50%;width:30px;height:30px;'src='" + myArr[1] + "' alt='Image'>");
            $('#usernameimage').html("<img style='border-radius: 50%;width:30px;height:30px;'src='" + myArr[1] + "' alt='Image'>");
            $('#modifyUsername').html(myArr[0]);
            $('#LogedInUserName').html(myArr[0]);
            $('#LogedInUserImage').attr("src",myArr[1]);
            $('#LogedInUserNMID').html(myArr[2]);
            $('#mobilemenuImage').attr("src",myArr[1]);
            $('#mobileName').html(myArr[0]);
        }
    });
    $.ajax({
        url: "http://192.168.1.65:8000/api/user/userdetailsFillCheck/",
        type: 'GET',
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('token')); },
        success: function (response) {

            // if (response['userProperties'] == true && response['user'] == true && response['userImage'] == true) {
            //     if (pageURL != "http://192.168.1.65:8000/home/" && pageURL != "http://192.168.1.65:8000/pending/") {
            //         // window.location.href = "http://192.168.1.65:8000/home"
            //     }
            // }
            // else if (response['userProperties'] == false) {
            //     if (pageURL != "http://192.168.1.65:8000/profiler") {
            //         window.location.href = "http://192.168.1.65:8000/profiler"
            //     }
            // }
            // else if (response['user'] == false) {

            //     if (pageURL != "http://192.168.1.65:8000/profilerB") {
            //         window.location.href = "http://192.168.1.65:8000/profilerB"
            //     }
            // }
            // else if (response['userImage'] == false) {

            //     if (pageURL != "http://192.168.1.65:8000/imageupload") {
            //         window.location.href = "http://192.168.1.65:8000/imageupload"
            //     }
            // }
        },
        error: function (jqXHR) {
        }
    });






});