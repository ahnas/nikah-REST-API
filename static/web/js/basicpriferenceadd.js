var pageURL = $(location).attr("href");
$(document).ready(function () {
    $.ajax({
        url: "http://192.168.1.65:8000/api/user/userdetailsFillCheck/",
        type: 'GET',
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('token')); },
        success: function (response) {
            if (response['userProperties'] == false) {

                if (pageURL != "http://192.168.1.65:8000/profiler") {
                    window.location.href = "http://192.168.1.65:8000/profiler"
                }
            }
            if (response['user'] == false) {

                if (pageURL != "http://192.168.1.65:8000/profilerB") {
                    window.location.href = "http://192.168.1.65:8000/profilerB"
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

            }
            $.ajax({
                url: "http://192.168.1.65:8000/api/user/BasicPreferences/",
                type: 'POST',
                dataType: "JSON",
                data: data,

                beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('token')); },
                success: function (response) {
                    window.location.href = "http://192.168.1.65:8000/imageupload/"
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





