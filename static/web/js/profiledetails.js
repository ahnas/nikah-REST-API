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
            if(obj['is_liked']!=0){
                var like="<span class='float-right disp'><button class='btnn ml-3' onclick='likeProfile("+obj['user'].id+")'><i id='"+obj['user'].id+"' class='icofont-thumbs-down border-radius-50 float-left mr-2'></i></button></span>"
            }
            else{
                like="<span class='float-right disp'><button class='btnn ml-3' onclick='likeProfile("+obj['user'].id+")'><i id='"+obj['user'].id+"' class='icofont-ui-love mr-2 border-radius-50'></i></button></span>";
            
            }
            $('#profileimage').attr('src', obj['image'].medium_square_crop)
            $('#profileimage2').attr('src', obj['image_two'].medium_square_crop)
            $('#profileimage3').attr('src', obj['image_three'].medium_square_crop)
            $('#ProfileName').html(obj['profile'].name +like )
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
            $("#youngerBrother").html(obj['profile'].youngerBrother);
            $("#elderSister").html(obj['profile'].elderSister);
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
            console.log(prof)
            for (let i = 0; i < prof.length && i < n; i++) {
                if (prof[i].id == id) {
                    n++;
                    continue;

                }
                var age = new Date().getFullYear() - new Date(prof[i]['profile'].dateOfBirth).getFullYear();
                var html=''
                    html+=`<div class="col-lg-3 col-md-6 col-sm-12 col-12 col-pad-md" onclick='profileview(`+ prof[i].id +`)'>
                    <div class="pcard">

                    <img class="position-relative" width="100%" src=`+ prof[i].image['medium_square_crop'] +` alt="" onclick='profileview(`+prof[i].id+`)'>

                    <div class="position-absolute pcard-det">  
                    <h5>`+ prof[i]['profile'].name +`</h5>
                    <h6>`+prof[i].nmId+`</h6>

                    <ul class="d-flex justify-content-space-between">
                    <li>`+age+` Years |&nbsp</li> 
                    <li>`+prof[i]['profile'].height+` cm |&nbsp</li> 
                    <li>`+prof[i]['profile'].martialStatus+`</li>  </ul>

                    <ul class="d-flex justify-content-space-between">
                    <li>`+prof[i]['education'].workingas+` |&nbsp</li> 
                    <li>`+prof[i]['profile'].relegion+` |&nbsp</li> 
                    <li>`+ prof[i]['education'].nativeCity+` ...</li>  
                    </ul>
                    <div class="margin-top10">
                    <a class="heartt" id="buttonn">
                    <i class="icofont-ui-love float-left" onclick='likeProfile(`+prof[i]['user']+`)'></i>  </a>
                    <i class="icofont-ui-text-chat float-right chta" onclick='createOrdisplayChat(`+prof[i]['user']+`)'></i> 
                    </div>
                    </div>
                    </div>
                    </div>`
                    $('#similarProfiles').append(html)
            }
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