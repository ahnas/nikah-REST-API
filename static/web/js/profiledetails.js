$(document).ready(function () {
    id = $('#profileID').val()
    $.ajax({
        url: "http://127.0.0.1:8000/api/user/UaerpropertiesLikedandAndNonLiked/" + id + "/",
        type: 'GET',
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('token')); },
        success: function (response) {
            const obj = JSON.parse(JSON.stringify(response));
            var age = new Date().getFullYear() - new Date(obj['profile'].dateOfBirth).getFullYear();
            if ((new Date(obj['profile'].dateOfBirth).getMonth()) > new Date().getMonth()) {
                age = age - 1;
            }

            $('#profileimage').attr('src', obj['image'].medium_square_crop)
            $('#ProfileName').html(obj['profile'].name + "<span class='float-right disp'>Like this profile? <button class='btnn ml-3'><i class='icofont-ui-love mr-2'></i>Like</button></span>")
            $('#dateOfBirth').html(age);
            $("#dateOfBirthpc").html(age);
            $("#dateOfBirthpcc").html(age);
            $("#martialStatuspc").html(obj['profile'].martialStatus);
            $("#martialStatuspc2").html(obj['profile'].martialStatus);
            $("#languagespoken").html(obj['profile'].languagespoken);
            $("#martialStatus").html(obj['profile'].martialStatus);
            $("#workingwith").html(obj['education'].workingwith);
            $("#workingas").html(obj['education'].workingas);
            $("#workingas1").html(obj['education'].workingas);
            $("#EduSpezialization").html(obj['education'].EduSpezialization);
            $("#annualincome").html(obj['education'].annualincome);
            $("#profileCreated").html(obj['profile'].profileCreated);
            $("#familyType").html(obj['profile'].familyType);
            $("#nativeCityPC").html(obj['education'].nativeCity);
            $("#nativeCity").html(obj['education'].nativeCity);
            $("#height").html(obj['profile'].height);
            $("#whenmarry").html(obj['profile'].whenmarry);
            $("#weight").html(obj['profile'].weight);
            $("#numberofChildresn").html(obj['profile'].numberofChildresn);
            $("#community").html(obj['profile'].community);
            $("#nationality").html(obj['profile'].nationality);
            $("#bodyType").html(obj['profile'].bodyType + " | " + obj['profile'].height + " cm | " + obj['profile'].weight + "Kg");
            $("#relegion").html(obj['profile'].relegion + " | " + obj['profile'].community);
            $("#highestEducation").html(obj['education'].highestEducation);
            $("#highestEducation2").html(obj['education'].highestEducation);
            $("#profession").html(obj['education'].profession);
            $("#motherTongue").html(obj['profile'].motherTongue);
            $("#ethnicGroup").html(obj['profile'].ethnicGroup);
            $("#eliteclass").html(obj['profile'].eliteclass);
            $("#smoking").html(obj['profile'].smoking);
            $("#disability").html(obj['profile'].physicalStatus);
            $("#fatherocupation").html(obj['profile'].fatherocupation);
            $("#motherocupation").html(obj['profile'].motherocupation);
            $("#performNamaz").append(obj['education'].performNamaz);
            $("#relegiousStatus").append(obj['education'].religiousness);
            $("#quran").append(obj['education'].readQuran);
            $("#madrassaEdu").append(obj['education'].madrassaEducation);
            $("#islamicsercices").append(obj['education'].attendIslamicServices);
            $("#primaryNumber").html(obj['education'].primaryNumber);
            $("#whatsapp").html("+91 " + obj['education'].primaryNumber);
            $("#secondaryNumber").html(obj['education'].secondaryNumber);
            var str = obj['education'].houseName + "," + obj['education'].locality + ",<br>" + obj['education'].nativeCity + ",<br>" + obj['education'].pincode;
            $("#nativeaddress").append(str);
            $("#currentAddress").append(str);
            $("#profileEmail").html(obj['user'].email);
            $("#describe").html(obj['education'].describe);
            $("#complexion").html(obj['profile'].complexion);
            $("#fatherOccupation").html(obj['profile'].fatherOccupation);
            $("#motherOccupation").html(obj['profile'].motherOccupation);
            $("#numberofsiblings").html(obj['profile'].numberofsiblings);

            $("#elderBrothers").html(obj['profile'].elderBrothers);
            $("#marriedBrothers").html(obj['profile'].marriedBrothers);
            $("#youngerSisters").html(obj['profile'].youngerSisters);
            $("#marriedSisters").html(obj['profile'].marriedSisters);
            $("#financialStatus").html(obj['profile'].financialStatus);
            $("#nmId").append(obj['nmId']);
            $("#drinking").html(obj['profile'].drinking);
            var b = (parseInt(obj['profile'].brothers) > 1) ? "s" : "";
            var s = (parseInt(obj['profile'].sisters) > 1) ? "s" : "";
            $("#brothersister").html(obj['profile'].brothers + " Brother" + b + " | " + obj['profile'].sisters + " Sister" + s);
            $.ajax({
                url: "http://127.0.0.1:8000/api/user/getpreferenceofuser/" + obj['user'].id + "/",
                type: 'GET',
                beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('token')); },
                success: function (response) {
                    const obj = JSON.parse(JSON.stringify(response));

                    $('#dateOfBirthpcc').html(obj['ageFrom'] + " - " + obj['ageTo']);
                    $('#preferedstatus').html(obj['martialStatus']);
                    $("#prefheight").html(obj['heightFrom'] + " - " + obj['heightTo']);
                    $("#prefeducation").html(obj['education']);
                    $("#prefcommunity").html(obj['community']);
                    $("#prefcity").html(obj['city']);

                },
                error: function (jqXHR) {
                    if (jqXHR.status == 404) {
                        var responseText = jQuery.parseJSON(jqXHR.responseText);
                    } else {
                        // $('#username').html("<a href='http://127.0.0.1:8000/signup/' class='get-started-btnn'>Sign Up</a>");
                    }
                }
            });
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
        url: "http://127.0.0.1:8000/api/user/collectproperties/",
        type: 'GET',
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('token')); },
        success: function (response) {
            var n = 3;
            const prof = JSON.parse(JSON.stringify(response));
            for (let i = 0; i < prof.length && i < n; i++) {
                if (prof[i].id == id) {
                    n++;
                    continue;

                }
                var ages = new Date().getFullYear() - new Date(prof[i]['profile'].dateOfBirth).getFullYear();

                $('#similarProfiles').append(
                    "<div class='col-lg-4 col-md-6 col-sm-12 col-12 p-2'>\
             <div class='pager-coll' onclick='profileview("+ prof[i].id + ")'>\
              <div class='row'>\
               <div class='col-lg-6 col-md-6 col-sm-6 col-6 pr-0 simig'>\
              <img src='"+ prof[i].image['medium_square_crop'] + "' alt='' class='homeimages'>\
                 <div class='d-flex'> <p class='sta'><i class='icofont-ui-text-chat'></i></p> <p class='sta'><i class='icofont-star'></i></p> </div>\
                  </div> \
                  <div class='col-lg-6 col-md-6 col-sm-6 col-6 pro-detail floa pr-0'>\
                   <a class='like'><i class='icofont-ui-love'></i>Like</a> <h4>"+ prof[i]['profile'].name + "</h4> <p>Age  <span class='sp1 ml-4'>" + ages + "</span> </p>\
                    <p>Status  <span class='sp2'>"+ prof[i]['profile'].martialStatus + "</span></p> <p><span><i class='icofont-users-alt-3 mr-2'></span></i>" + prof[i]['profile'].relegion + "</p> \
                    <p><span><i class='icofont-web mr-2'></span></i>"+ prof[i]['education'].highestEducation + "</p> <p><span><i class='icofont-bag mr-2'></span></i>" + prof[i]['education'].workingas + "</p>\
                     <p><span><i class='icofont-location-pin mr-2'></i></span></i>"+ prof[i]['education'].nativeCity + "</p> </div> </div> </div> </div>")

            }
            // $('#username').html("<a href='#' class='text-white'>"+myArr[1]+"</a>");
            const obj = JSON.parse(JSON.stringify(response));

        },
        error: function (jqXHR) {
            if (jqXHR.status == 404) {
                var responseText = jQuery.parseJSON(jqXHR.responseText);
            } else {
                // $('#username').html("<a href='http://127.0.0.1:8000/signup/' class='get-started-btnn'>Sign Up</a>");
            }
        }
    });





});
function loadpremiumFeatures(){
    $.ajax({
        url: "http://127.0.0.1:8000/api/user/UaerpropertiesLikedandAndNonLiked/" + id + "/",
        type: 'GET',
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('token')); },
        success: function (response) {
            const obj = JSON.parse(JSON.stringify(response));
            var str = obj['education'].houseName + "," + obj['education'].locality + ",<br>" + obj['education'].nativeCity + ",<br>" + obj['education'].pincode;
            $("#premiumfeatures").html("<div class='row'>\
                <div class='col-5'>Primary Number</div> : <div class='col-6' id='relegion'>"+obj['education'].primaryNumber+"</div>\
            </div>\
            <div class='row'>\
                <div class='col-5'>Whatsapp</div> : <div class='col-6' id='nationality'>"+obj['education'].primaryNumber+"</div>\
            </div>\
            <div class='row'>\
                <div class='col-5'>House Name </div> : <div class='col-6' id='martialStatuspc2'>"+ obj['education'].houseName +"</div>\
            </div>\
            <div class='row'>\
                <div class='col-5'>Locality</div> : <div class='col-6' id='numberofChildresn'>"+obj['education'].locality+"</div>\
            </div>\
            <div class='row'>\
                <div class='col-5'>City</div> : <div class='col-6' id='ethnicGroup'>"+obj['education'].nativeCity+"</div>\
            </div>\
            <div class='row'>\
                <div class='col-5'>Email</div> : <div class='col-6' id='motherTongue'>"+obj['user'].email+"</div>\
            </div>");
        },
        error: function (jqXHR) {
            if (jqXHR.status == 404) {
                var responseText = jQuery.parseJSON(jqXHR.responseText);
            } else {
                // $('#username').html("<a href='http://127.0.0.1:8000/signup/' class='get-started-btnn'>Sign Up</a>");
            }
        }
    });



}