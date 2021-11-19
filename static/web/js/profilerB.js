function currentAddress(){
    if ($('#sameAddress').is(':checked')) {
        var cntry=$('#nativeCountry').val()
        var state=$('#nativeState').val()
        var city=$('#nativeCity').val()
        $('#currentCountry').val(cntry);
        $('#currentState').val(state);
        $('#currentCity').val(city);
    }
    else{
        $('#currentCountry').val('');
        $('#currentState').val('');
        $('#currentCity').val('');
    }   
}
var pageURL = $(location).attr("href");
$(document).ready(function () {
    $.ajax({
        url: "http://127.0.0.1:8000/api/user/userdetailsFillCheck/",
        type: 'GET',
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('token')); },
        success: function (response) {
            if (response['user'] == true) {
                $.ajax({
                    url: "http://127.0.0.1:8000/api/user/Bproperties/",
                    type: 'GET',
                    dataType: "JSON",
                                
                    beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token '+localStorage.getItem('token'));},
                    success: function (response) {
                        console.log(response[0])
                        $('#highestEducation').val(response[0]['highestEducation']);
                        $('#workingwith').val(response[0]['workingwith']);
                        $('#workingas').val(response[0]['workingas']);
                        $('#nativeCountry').val(response[0]['nativeCountry']);
                        $('#currentCountry').val(response[0]['currentCountry']);
                        $('#currentState').val(response[0]['currentState']);
                        $('#currentCity').val(response[0]['currentCity']);
                        $('#workingwith').val(response[0]['workingwith']);
                        $('#workingas').val(response[0]['workingas']);
                        $('#EduSpezialization').val(response[0]['EduSpezialization']);
                        $('#nativeState').val(response[0]['nativeState']);
                        $('#nativeCity').val(response[0]['nativeCity']);
                        $('#primaryNumber').val(response[0]['primaryNumber']);
                        $('#secondaryNumber').val(response[0]['secondaryNumber']);
                        $('#preferedContact').val(response[0]['preferedContact']);
                        $('#relation').val(response[0]['relation']);
                        $('#describe').val(response[0]['describe']);
                        $('#houseName').val(response[0]['houseName']);
                        $('#locality').val(response[0]['locality']);
                        $('#pincode').val(response[0]['pincode']);
                        $('#madrassaEducation').val(response[0]['madrassaEducation']);
                        $('#attendIslamicServices').val(response[0]['attendIslamicServices']);
                        $('#performNamaz').val(response[0]['performNamaz']); 
                        $('#readQuran').val(response[0]['readQuran']); 
                        $('#religiousness').val(response[0]['religiousness']); 
                        $('#annualincome').val(response[0]['annualincome']); 
                    },
                    error: function (jqXHR) {
                        
                    }
                }); 
            }
            if (response['userProperties'] == false) {
                if (pageURL != "http://127.0.0.1:8000/profiler") {
                    window.location.href = "http://127.0.0.1:8000/profiler"
                }
            }
        },
        error: function (jqXHR) {
        }
    });
    $.ajax({
        url: "http://127.0.0.1:8000/api/user/Profesions/",
        type: 'GET',
        success: function (response) {
            
            $('#profession').html('')
            const obj = JSON.parse(JSON.stringify(response));
            for(let i = 0; i < obj.length ; i++){
            $('#profession').append("<option value='"+obj[i].professionName+"'>"+obj[i].professionName+"</option>")
            }
            $('#profession').append("<option value='Other'>Other</option>")

        }
    });
    $("form[name='profilerB']").validate({ // initialize the plugin
        rules: {
            highestEducation: {
                required: true,                
            },
            nativeCountry: {
                required: true,
            },
            nativeState: {
                required: true,
            },
            nativeCity: {
                required: true,
            },
            primaryNumber: {
                required: true,
            },
            secondaryNumber: {
                required: true,
            },
            preferedContact: {
            },
            relation: {
                required: true,
            },
            houseName: {
                required: true,
            },
            locality: {
                required: true,
            },
            pincode: {
                required: true,
            },
            performNamaz: {
                required: true,
            },
            religiousness: {
                required: true,
            },
            readQuran: {
                required: true,
            },
            madrassaEducation: {
                required: true,
            },
            attendIslamicServices: {
                required: true,
            },
          
           
        },
        messages:{
            highestEducation:"This field is required.",
            
            nativeCountry:"This field is required.",
            nativeState:"This field is required.",
            nativeCity:"This field is required.",
            primaryNumber:"This field is required.",
            secondaryNumber:"This field is required.",
            relation:"This field is required.",
            describe:"This field is required.",
            houseName:"This field is required.",
            locality:"This field is required.",
            pincode:"This field is required.",
            performNamaz:"This field is required.",
            religiousness:"This field is required.",
            readQuran:"This field is required.",
            madrassaEducation:"This field is required.",
            attendIslamicServices:"This field is required.",

        },
        
    
        submitHandler:function(){
            event.preventDefault();
            var csrf_token1 = $('[name="csrfmiddlewaretoken"]').val();
            var highestEducation = $('#highestEducation').val();
            var workingwith = $('#workingwith').val();
            var workingas = $('#workingas').val();
            var nativeCountry = $('#nativeCountry').val();
            var currentCountry = $('#currentCountry').val();
            var currentState = $('#currentState').val();
            var currentCity = $('#currentCity').val();
            var workingwith = $('#workingwith').val();
            var workingas = $('#workingas').val();
            var EduSpezialization = $('#EduSpezialization').val();
            var nativeState = $('#nativeState').val();
            var nativeCity = $('#nativeCity').val();
            var primaryNumber = $('#primaryNumber').val();
            var secondaryNumber = $('#secondaryNumber').val();
            var preferedContact = $('#preferedContact').val();
            var relation = $('#relation').val();
            var describe = $('#describe').val();
            var houseName = $('#houseName').val();
            var locality = $('#locality').val();
            var pincode = $('#pincode').val();
            var madrassaEducation = $('#madrassaEducation').val();
            var attendIslamicServices = $('#attendIslamicServices').val();
            var performNamaz = $('#performNamaz').val(); 
            var readQuran = $('#readQuran').val(); 
            var religiousness = $('#religiousness').val(); 
            var annualincome = $('#annualincome').val(); 
            
            data = {
                "highestEducation": highestEducation,
                "workingwith": workingwith,
                "workingas": workingas,
                "nativeCountry": nativeCountry,
                "nativeState": nativeState,
                "nativeCity": nativeCity,
                "primaryNumber": primaryNumber,
                "secondaryNumber": secondaryNumber,
                "preferedContact": preferedContact,
                "relation": relation,
                "describe": describe,
                "houseName": houseName,
                "locality": locality,
                "performNamaz": performNamaz,
                "pincode": pincode,
                "religiousness": religiousness,
                "readQuran": readQuran,
                "madrassaEducation": madrassaEducation,
                "attendIslamicServices": attendIslamicServices,
                "workingwith":workingwith,
                "workingas":workingas,
                "EduSpezialization":EduSpezialization,
                "currentCountry":currentCountry,
                "currentState":currentState,
                "currentCity":currentCity,
                "annualincome":annualincome,

            }
            $.ajax({
                url: "http://127.0.0.1:8000/api/user/Bproperties/",
                type: 'POST',
                dataType: "JSON",
                data: data,
                            
                beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token '+localStorage.getItem('token'));},
                success: function (response) {
                    // var responseText = jQuery.parseJSON(response);   
                    //sessionStorage.setItem("token", response['token'])
                    window.location.href = "http://127.0.0.1:8000/basicpref/"
                },
                error: function (jqXHR) {
                    if (jqXHR.status == 400) { 
                        var responseText = jQuery.parseJSON(jqXHR.responseText);

                        $('#emailwarning').html(responseText['non_field_errors']);
                        alert(JSON.stringify(responseText))
                    } else {
                        $('#emailwarning').html("Unnexpected Error Occured ");
                        alert("Hai Error")
                    }
                }
            }); 
        }
    });

});





