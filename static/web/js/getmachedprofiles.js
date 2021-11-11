
$(document).ready(function(){
  
    $.ajax({
        url: "http://127.0.0.1:8000/api/user/UpdateUserProperties/",
        type: 'GET',
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('token')); },
        success: function (response) {
            $('[id="nationality"]').html(response['nationality'])
            $("#name").html(response['name'])
            $("#ethinicity").html(response['ethnicGroup'])
            $("#Height").html(response['height'])
            $("#Weight").html(response['weight'])
            $("#martialStatus").html(response['martialStatus'])
            $("#noOfChildren").html(response['numberofChildresn'])
            $("#complexion").html(response['complexion'])
            $("#bodyType").html(response['bodyType'])
            $('[id="motherTongue"]').html(response['motherTongue'])
            $("#physicalStatus").html(response['physicalStatus'])
            $("#fatherOccupation").html(response['fatherOccupation'])
            $("#motherOccupation").html(response['motherOccupation'])
            $("#noOfSiblings").html(response['numberofsiblings'])
            $("#noOfElederBrother").html(response['elderBrothers'])
            $("#noOfMarriedBrothers").html(response['marriedBrothers'])
            $("#noOfYoungerSister").html(response['youngerSisters'])
            $("#noOfMarriedSisters").html(response['marriedSisters'])
            $("#financialStatus").html(response['financialStatus'])   
            var age= new Date().getFullYear()-new Date(response['dateOfBirth']).getFullYear();
            $("#age").html(age)
            $("#gender").html(response['gender'])
            $("#relegion").html(response['relegion'])
            $("#profileCreatedBy").html(response['profileCreated'])

            $("#mobile").html(response['moblie'])
            $("#dob").html(response['dateOfBirth'])
            $("#languageSpoken").html(response['languagespoken'])
            $("#familyType").html(response['familyType'])
            $("#brothers").html(response['brothers'])
            $("#sisters").html(response['sisters'])   
            $("#smoking").html(response['smoking'])
            $("#drinking").html(response['drinking'])
            $("#whenMarry").html(response['whenmarry'])   


            $('input[name=ethnicGroup]').val(response['ethnicGroup'])
            $('input[name=height]').val(response['height'])
            $('input[name=weight]').val(response['weight'])
            $('input[name=martialStatus]').val(response['martialStatus'])
            $('input[name=numberofChildresn]').val(response['numberofChildresn'])
            $('input[name=complexion]').val(response['complexion'])
            $('input[name=bodyType]').val(response['bodyType'])
            $('input[name=motherTongue]').val(response['motherTongue'])
            $('input[name=physicalStatus]').val(response['physicalStatus'])
            $('input[name=fatherOccupation]').val(response['fatherOccupation'])
            $('input[name=motherOccupation]').val(response['motherOccupation'])
            $('input[name=numberofsiblings]').val(response['numberofsiblings'])
            $('input[name=elderBrothers]').val(response['elderBrothers'])
            $('input[name=marriedBrothers]').val(response['marriedBrothers'])
            $('input[name=youngerSisters]').val(response['youngerSisters'])
            $('input[name=marriedSisters]').val(response['marriedSisters'])
            $("#financialStatus").val(response['financialStatus'])   
        },
       
    });
    $.ajax({
        url: "http://127.0.0.1:8000/api/user/UpdateUserLocationDetails/",
        type: 'GET',
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('token')); },
        success: function (response) {
            $("#highestEducation").html(response['highestEducation'])
            $("#location").html(response['locality'])
            $("#primaryNumber").html(response['primaryNumber'])
            $("#secondaryNumber").html(response['secondaryNumber'])
            $("#preferedPerson").html(response['preferedContact'])
            $("#relation").html(response['relation'])
            $("#presentCountry").html(response['currentCountry'])
            $("#presentState").html(response['currentState'])
            $("#presentCity").html(response['currentCity'])

            // $("p.ed1Id select").val(response['highestEducation']).change();
            $("#nativeCity").html(response['nativeCity'])
            $("#nativeCountry").html(response['nativeCountry'])
            $("#nativeState").html(response['nativeState'])
            $("#workingAs").html(response['workingas'])
            $("#workingWith").html(response['workingwith'])
            $("#annualIncome").html(response['annualincome'])
            $("#performNamaz").html(response['performNamaz'])
            $("#relegiousness").html(response['religiousness'])
            $("#readQuran").html(response['currentCity'])
            $("#madrasaEducation").html(response['madrassaEducation'])
            $("#attendIslamicService").html(response['attendIslamicServices'])

            // $('input[name=highestEducation]').val(response['highestEducation']).change()
            $('input[name=locality]').val(response['locality'])
            $('input[name=primaryNumber]').val(response['primaryNumber'])
            $('input[name=secondaryNumber]').val(response['secondaryNumber'])
            $('input[name=preferedContact]').val(response['preferedContact'])
            $('input[name=relation]').val(response['relation'])
            $('input[name=currentCountry]').val(response['currentCountry'])
            $('input[name=currentState]').val(response['currentState'])
            $('input[name=currentCity]').val(response['currentCity']) 
        },
       
    });

    $.ajax({
        url: "http://127.0.0.1:8000/api/user/UpdateUserImage/",
        type: 'GET',
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('token')); },
        success: function (response) {
         $("#userImage").attr('src', response['image'])
         $("#userNAme").html(response['nmId']) 
         $("#email").html(response.user['email'])

        },
       
    });


});


$(document).ready(function () {
    $.ajax({
        url: "http://127.0.0.1:8000/api/user/MatchedProfiles/",
        type: 'GET',
        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token '+localStorage.getItem('token'));},
        success: function (response) {
            // $('#username').html("<a href='#' class='text-white'>"+myArr[1]+"</a>");
            const obj = JSON.parse(JSON.stringify(response));
            for(let i = 0; i < obj.length && i<=200; i++){
                var age= new Date().getFullYear()-new Date(obj[i]['profile'].dateOfBirth).getFullYear();
                $('#memberList').append("<div class='col-lg-4  col-md-6 col-sm-12 col-12 p-2' id='"+obj[i]['user']+"'>\
                <div class='pager-coll gext'><div class='row justify-content-center'>\
                <div class='col-lg-5 col-md-5 col-sm-12 pr-0'>\
                <img src='"+obj[i].image+"' alt='' class='homeimages'  onclick='profileview("+obj[i].id+")'>\
                <div class='d-flex mobi'><p class='sta'>\
                <i class='icofont-ui-text-chat'></i>\
                </p><p class='sta'><i class='icofont-star'></i>\
                </p></div></div><div class='col-lg-7 col-md-7\ col-sm-5 col-6 pro-detail'>\
                <a href='#' class='like mobii' onclick='likeProfile("+obj[i]['user']+")'><i class='icofont-ui-love'></i>Like</a>\
                <h4>"+obj[i].nmId+"</h4><p>Age  <span class='sp1 ml-4'>"+age+"</span> \
                </p> <p>Status  <span class='sp2'>"+obj[i]['profile'].martialStatus+"</span></p>\
                <p ><span><i class='icofont-users-alt-3 mr-2'></span></i>\
                "+obj[i]['profile'].relegion+"</p><p><span><i class='icofont-web mr-2'></span></i>\
                "+obj[i]['education'].highestEducation+"</p><p><span><i class='icofont-bag mr-2'></span></i>\
                "+obj[i]['education'].profession+"</p><p><span><i class='icofont-location-pin mr-2'></span></i>"+ obj[i]['education'].nativeCity+"</p>\
                </div></div><div class='d-none three justify-content-center'><p class='sta'>\
                <i class='icofont-ui-text-chat'></i></p><p class='sta'><i class='icofont-star'>\
                </i></p><p class='sta'><i class='icofont-heart'></i></p></div></div></div>");
                }
           
            // $('#usernamefield1').html(myArr[1]+"&nbsp&nbsp&nbsp<img style='border-radius: 50%;width:30px;height:30px;'src='"+myArr[0] +"' alt='SDGDSA'>");
            //sessionStorage.setItem("token", response['token'])
        },
        error: function (jqXHR) {
            if (jqXHR.status == 404) { 
                window.location.href = "http://127.0.0.1:8000/pending"
                var responseText = jQuery.parseJSON(jqXHR.responseText);
            } else {
                // $('#username').html("<a href='http://127.0.0.1:8000/signup/' class='get-started-btnn'>Sign Up</a>");
            }
        }
    }); 




});