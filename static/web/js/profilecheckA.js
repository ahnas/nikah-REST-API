
$(document).ready(function () {
    $('#numberodChildren').hide();
    for (var i = 137; i <= 213; i++) {
        $('#height').append("<option value=" + i + ">" + i + " cm  " + (i * 0.0328084).toFixed(1) + " ft</option>")
    }
    for (var i = 30; i <= 140; i++) {
        $('#weight').append("<option value=" + i + ">" + i + " Kg </option>")
    }
    $('#martialStatus').change(function () {
        if ($(this).val() != 'Never Married') {
            $('#numberodChildren').show();
        }
        else{
            $('#numberodChildren').hide();
        }
    });

    // $.ajax({
    //     url: "http://192.168.1.65:8000/api/user/properties/",
    //     type: 'GET',
    //     beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('token')); },
    //     success: function (response) {
    //         const obj = JSON.parse(JSON.stringify(response));
    //         if (obj.length > 0) {
    //             window.location.href = "http://192.168.1.65:8000/profilerB/"
    //         }
    //         else {

    //         }
    //     },
    //     error: function (jqXHR) {
    //         if (jqXHR.status == 400) {
    //         } else {
    //             window.location.href = "http://192.168.1.65:8000/"
    //         }
    //     }
    // });




});