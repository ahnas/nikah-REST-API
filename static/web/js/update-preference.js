var pageURL = $(location).attr("href");
$( document ).ready(function() {
    $("#successMessageDiv").hide();
    $("#preferenceEdit").hide();

   
});
function editprofile(){
    $('[id="preferenceEdit"]').fadeIn();
    $('[id="ProfileView"]').fadeOut();
    $("#successMessageDiv").hide();
    $('html, body').animate({
        scrollTop: $("#editFormDiv").offset().top
    }, 10);
}

$(document).ready(function () {
    $.ajax({
        url: "http://127.0.0.1:8000/api/user/GetUserPreferences/",
        type: 'GET',
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('token')); },
        success: function (response) {
            const obj = JSON.parse(JSON.stringify(response));
            console.log(obj);
            $('#ageFrom').val(obj[0]['ageFrom']);
            $('#ageTo').val(obj[0]['ageTo']);
            $('#heightFrom').val(obj[0]['heightFrom']);
            $('#heightTo').val(obj[0]['heightTo']);
            $('#weightFrom').val(obj[0]['weightFrom']);
            $('#weightTo').val(obj[0]['weightTo']);
            $('#martialStatus').val(obj[0]['martialStatus']);
            $('#complexion').val(obj[0]['complexion']);
            $('#heightFrom').val(obj[0]['heightFrom']);
            $('#physicalStatus').val(obj[0]['physicalStatus']);
            $('#complexion').val(obj[0]['complexion']);
            $("#community").val(obj[0]['community']);
            $("#education").val(obj[0]['education']);
            $("#EduSpezialization").val(obj[0]['EduSpezialization']);
            $("#workingwith").val(obj[0]['workingwith']);
            $("#workingas").val(obj[0]['workingas']);
            $("#country").val(obj[0]['country']);
            $("#district").val(obj[0]['district']);
            $("#city").val(obj[0]['city']);

            $('#ageFromView').html(obj[0]['ageFrom']);
            $('#ageToView').html(obj[0]['ageTo']);
            $('#heightFromView').html(obj[0]['heightFrom']);
            $('#heightToView').html(obj[0]['heightTo']);
            $('#weightFromView').html(obj[0]['weightFrom']);
            $('#weightToView').html(obj[0]['weightTo']);
            $('#martialStatusView').html(obj[0]['martialStatus']);
            $('#complexionView').html(obj[0]['complexion']);
            $('#heightFromView').html(obj[0]['heightFrom']);
            $('#physicalStatusView').html(obj[0]['physicalStatus']);
            $('#complexionView').html(obj[0]['complexion']);
            $("#communityView").html(obj[0]['community']);
            $("#educationView").html(obj[0]['education']);
            $("#EduSpezializationView").html(obj[0]['EduSpezialization']);
            $("#workingwithView").html(obj[0]['workingwith']);
            $("#workingasView").html(obj[0]['workingas']);
            $("#countryView").html(obj[0]['country']);
            $("#districtView").html(obj[0]['district']);
            $("#cityView").html(obj[0]['city']);

        },
        error: function (jqXHR) {
            if (jqXHR.status == 404) {
                var responseText = jQuery.parseJSON(jqXHR.responseText);
            } else {
                // $('#username').html("<a href='http://127.0.0.1:8000/signup/' class='get-started-btnn'>Sign Up</a>");
            }
        }
    });
    
    $.ajax({
        url: "http://127.0.0.1:8000/api/user/userdetailsFillCheck/",
        type: 'GET',
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('token')); },
        success: function (response) {
            if (response['userProperties'] == false) {

                if (pageURL != "http://127.0.0.1:8000/profiler") {
                    window.location.href = "http://127.0.0.1:8000/profiler"
                }
            }
            if (response['user'] == false) {

                if (pageURL != "http://127.0.0.1:8000/profilerB") {
                    window.location.href = "http://127.0.0.1:8000/profilerB"
                }

            }
        },
        error: function (jqXHR) {
        }
    });
    $("form[name='modify']").validate({
        rules: {
            ageFrom: {
                digits: true,
            },
            ageTo: {
                digits: true,
            },
            heightFrom: {
                digits: true,
            },
            heightTo: {
                digits: true,
            },
            weightFrom: {
                digits: true,
            },
            weightTo: {
                digits: true,
            },

        },
        messages: {
            ageFrom: "Enter a number ",
            ageTo: "Enter a number ",
            heightFrom: "Enter a number ",
            heightTo: "Enter a number ",
            weightFrom: "Enter a number ",
            weightTo: "Enter a number ",
        },
        submitHandler: function () {
            event.preventDefault();
            var csrf_token1 = $('[name="csrfmiddlewaretoken"]').val();
            var ageFrom = $('#ageFrom').val();
            var ageTo = $('#ageTo').val();
            var martialStatus = $('#martialStatus').val();
            var country = $('#country').val();
            var heightFrom = $('#heightFrom').val();
            var heightTo = $('#heightTo').val();
            var weightFrom = $('#weightFrom').val();
            var weightTo = $('#weightTo').val();
            var complexion = $('#complexion').val();
            var city = $('#city').val();
            var bodyType = $('#bodyType').val();
            var community = $('#community').val();
            
            var district = $('#district').val();
            var EduSpezialization=$('#EduSpezialization').val();
            var physicalStatus=$('#physicalStatus').val();
            var education=$('#education').val();
            var workingwith=$('#workingwith').val()
            var workingas=$('#workingas').val()
            data = {
                "district": district,
                "ageFrom": ageFrom,
                "city": city,
                "ageTo": ageTo,
                "martialStatus": martialStatus,
                "heightFrom": heightFrom,
                "heightTo": heightTo,
                "weightFrom": weightFrom,
                "weightTo": weightTo,
                "complexion": complexion,
                "country": country,
                "bodyType": bodyType,
                "community": community,
                "EduSpezialization":EduSpezialization,
                "physicalStatus":physicalStatus,
                "education":education,
                "workingwith":workingwith,
                "workingas":workingas

            }
            $.ajax({
                url: "http://127.0.0.1:8000/api/user/UpadteUserPreferences/",
                type: 'POST',
                dataType: "JSON",
                data: data,

                beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('token')); },
                success: function (response) {
                   window.location="http://127.0.0.1:8000/partnerpref/"
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
    });

});





