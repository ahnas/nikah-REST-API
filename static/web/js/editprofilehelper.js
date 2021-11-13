$( document ).ready(function() {
    $('[id="ProfileEdit"]').hide()
    $("#btnSubmitDiv").hide();
    $("#successMessageDiv").hide();

   
});
function editprofile(){
    $('[id="ProfileEdit"]').fadeIn();
    $("#btnSubmitDiv").show();
    $('[id="ProfileView"]').fadeOut();
    $("#successMessageDiv").hide();
    $('html, body').animate({
        scrollTop: $("#editFormDiv").offset().top
    }, 10);
}

function updateUserPropertiest(data){
    $.ajax({
        url: "http://127.0.0.1:8000/api/user/UpdateUserProperties/",
        type: 'PUT',
        data:data,
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('token')); },
        success: function (response) {
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
                    $("#martialstatus").html(response['martialStatus'])
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
                    $("#community").html(response['community'])
        
                    $('input[name=nationality]').val(response['nationality'])
                    $('select[name=ethnicGroup]').val(response['ethnicGroup'])
                    $('select[name=martialStatus]').val(response['martialStatus'])
                    $('input[name=numberofChildresn]').val(response['numberofChildresn'])
                    $('select[name=complexion]').val(response['complexion'])
                    $('select[name=bodyType]').val(response['bodyType'])
                    $('select[name=motherTongue]').val(response['motherTongue'])
                    $('select[name=physicalStatus]').val(response['physicalStatus'])
                    $('select[name=fatherOccupation]').val(response['fatherOccupation'])
                    $('select[name=motherOccupation]').val(response['motherOccupation'])
                    $('input[name=numberofsiblings]').val(response['numberofsiblings'])
                    $('input[name=elderBrothers]').val(response['elderBrothers'])
                    $('input[name=marriedBrothers]').val(response['marriedBrothers'])
                    $('input[name=youngerSisters]').val(response['youngerSisters'])
                    $('input[name=marriedSisters]').val(response['marriedSisters'])
                    $("select[name=financialStatus]").val(response['financialStatus'])   
                    $("select[name=smoking]").val(response['smoking'])
                    $("select[name=whenmarry]").val(response['whenmarry']) 
                    $('#datepicker').val(response['dateOfBirth']);
                    $("select[name=familyType]").val(response['familyType']) 
                    $("select[name=drinking]").val(response['drinking'])
                    $("input[name=mobile]").val(response['moblie'])
                    $("select[name=languagespoken]").val(response['languagespoken'])

                },
               
            });

            
        },
        error: function (jqXHR,responseText) {
            if (jqXHR.status == 400) {
                var responseText = jQuery.parseJSON(jqXHR.responseText);
                alert(jqXHR.responseText)
            } else {
                alert(jqXHR.responseText)
               
            }
        }
    });
}

function updateUserLocationDetails(data){
    $.ajax({
        url: "http://127.0.0.1:8000/api/user/UpdateUserLocationDetails/",
        type: 'PUT',
        data:data,
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('token')); },
        success: function (response) {
            $.ajax({
                url: "http://127.0.0.1:8000/api/user/UpdateUserLocationDetails/",
                type: 'GET',
                beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('token')); },
                success: function (response) {
                    $("#successMessageDiv").show();
                    $("#successMessage").show();
                    $("#successMessage").html('Updated successfully')
                    $("#highestEducation").html(response['highestEducation'])
                    $("#location").html(response['locality'])
                    $("#primaryNumber").html(response['primaryNumber'])
                    $("#secondaryNumber").html(response['secondaryNumber'])
                    $("#preferedPerson").html(response['preferedContact'])
                    $("#relation").html(response['relation'])
                    $("#presentCountry").html(response['currentCountry'])
                    $("#presentState").html(response['currentState'])
                    $("#presentCity").html(response['currentCity'])
                    $("#nativeCity").html(response['nativeCity'])
                    $("#nativeCountry").html(response['nativeCountry'])
                    $("#nativeState").html(response['nativeState'])
                    $("#workingAs").html(response['workingas'])
                    $("#workingWith").html(response['workingwith'])
                    $("#annualIncome").html(response['annualincome'])
                    $("#performNamaz").html(response['performNamaz'])
                    $("#relegiousness").html(response['religiousness'])
                    $("#readQuran").html(response['readQuran'])
                    $("#madrasaEducation").html(response['madrassaEducation'])
                    $("#attendIslamicService").html(response['attendIslamicServices'])
                    $("#specialization").html(response['EduSpezialization'])  
                    $("#describe").html(response['describe'])
                    $("#houseName").html(response['houseName'])



                    $('select[name=highestEducation]').val(response['highestEducation'])
                    $('input[name=locality]').val(response['locality'])
                    $('input[name=primaryNumber]').val(response['primaryNumber'])
                    $('input[name=secondaryNumber]').val(response['secondaryNumber'])
                    $('input[name=preferedContact]').val(response['preferedContact'])
                    $('input[name=relation]').val(response['relation'])
                    $('input[name=currentCountry]').val(response['currentCountry'])
                    $('input[name=currentState]').val(response['currentState'])
                    $('input[name=currentCity]').val(response['currentCity']) 
                    $("#EduSpezialization").val(response['EduSpezialization']) 
                    $('input[name=nativeCountry]').val(response['nativeCountry'])
                    $('select[name=workingas]').val(response['workingas'])
                    $('select[name=annualincome]').val(response['annualincome'])
                    $('select[name=performNamaz]').val(response['performNamaz'])
                    $('select[name=readQuran]').val(response['readQuran'])
                    $('select[name=attendIslamicServices]').val(response['attendIslamicServices'])
                    $('input[name=nativeCity]').val(response['nativeCity'])
                    $('input[name=nativeState]').val(response['nativeState'])
                    $('select[name=workingwith]').val(response['workingwith'])
                    $('input[name=describe]').val(response['describe'])
                    $('select[name=religiousness]').val(response['religiousness'])
                    $('input[name=madrassaEducation]').val(response['madrassaEducation'])
                    $('input[name=houseName]').val(response['houseName'])
                    setTimeout(function(){
                        $('[id="ProfileEdit"]').fadeOut();
                        $('[id="ProfileView"]').show();
                        $("#btnSubmitDiv").hide();
                        $("#successMessageDiv").hide()
                        $("#successMessage").hide()
                        // or fade, css display however you'd like.
                     }, 2000);
                },
               
            });          
        },
        error: function (jqXHR,responseText) {
            if (jqXHR.status == 400) {
                var responseText = jQuery.parseJSON(jqXHR.responseText);
            } else {
               
            }
        }
    });
    
}


