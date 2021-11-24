$(document).ready(function(){
    $("#btnSubmitDiv").hide();
    $("#noc").prop('disabled', true)
});
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
            $('select[name=height]').val(response['height'])
            $('select[name=weight]').val(response['weight'])
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
            $("input[name=languagespoken]").val(response['languagespoken'])
            $("select[name=community]").val(response['community'])


 

            

        },
       
    });
    $.ajax({
        url: "http://127.0.0.1:8000/api/user/UpdateUserLocationDetails/",
        type: 'GET',
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('token')); },
        success: function (response) {
            console.log(response)
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
            console.log(response['workingas'])
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


$("form[name='updateUserDetailsForm']").validate({
    rules:{
        currentCountry:{
            required:true,
        },
        currentState:{
            required:true,
        },
        currentCity:{
            required:true,
        },
        nativeCity:{
            required:true,
        },
        nativeCountry:{
            required:true,
        },
        workingas:{
            required:true,
        },
        workingwith:{
            required:true,
        },
        annualincome:{
        },
        madrassaEducation:{
            required:true,
        },
        primaryNumber:{
            required:true,
            digits:true
        },
        secondaryNumber:{
            required:true,
            digits:true
        },
        nationality:{
            required:true,
        },
        height:{
            required:true,
        },
        weight:{
            required:true,
        },
        numberofChildresn:{
            required:true,
        },
        currentCmotherTongueountry:{
            required:true,
        },
        mobile:{
            required:true,
        },
        dateOfBirth:{
            required:true,
        },
        languagespoken:{
            required:true,
        },
        numberofsiblings:{
            required:true,
            digits:true
        },
        elderBrothers:{
            required:true,
            digits:true
        },
        marriedBrothers:{
            required:true,
            digits:true
        },
        youngerSisters:{
            required:true,
            digits:true,
        },
        marriedSisters:{
            required:true,
            digits:true,
        },
        houseName:{
            required:true,
        },
        messages:{
            currentCountry:{
                required:"This field is required",
            },
            currentState:{
                required:"This field is required",
            },
            currentCity:{
                required:"This field is required",
            },
            nativeCity:{
                required:"This field is required",
            },
            nativeCountry:{
                required:"This field is required",
            },
            workingas:{
                required:"This field is required",
            },
            workingwith:{
                required:"This field is required",
            },
            annualincome:{
                required:"This field is required",
            },
            describe:{
                required:"This field is required",
            },
            madrassaEducation:{
                required:"This field is required",
            },
            primaryNumber:{
                required:"This field is required",
            },
            secondaryNumber:{
                required:"This field is required",
            },
            preferedContact:{
                required:"This field is required",
            },
            nationality:{
                required:"This field is required",
            },
            height:{
                required:"This field is required",
            },
            weight:{
                required:"This field is required",
            },
            numberofChildresn:{
                required:"This field is required",
            },
            currentCmotherTongueountry:{
                required:"This field is required",
            },
            mobile:{
                required:"This field is required",
                digits:"Mobile no must be a number",
            },
            dateOfBirth:{
                required:"This field is required",
            },
            languagespoken:{
                required:"This field is required",
            },
            numberofsiblings:{
                required:"This field is required",
            },
            elderBrothers:{
                required:"This field is required",
            },
            marriedBrothers:{
                required:"This field is required",
            },
            youngerSisters:{
                required:"This field is required",
                
            },
            marriedSisters:{
                required:"This field is required",
            },
            houseName:{
                required:"This field is required",
            }

        }



    },
    submitHandler:function(e){
        var csrf_token = $('[name="csrfmiddlewaretoken"]').val();
        var mobile = $('input[name=mobile]').val()
        var nationality = $('input[name=nationality]').val()
        var height = $('select[name=height]').val()
        var weight = $('select[name=weight]').val()
        var martialStatus = $('select[name=martialStatus]').val()
        var complexion = $('select[name=complexion]').val()
        var motherTongue = $('select[name=motherTongue]').val()
        var languagespoken = $('select[name=languagespoken]').val()
        var smoking = $('select[name=smoking]').val()
        var whenmarry = $('select[name=whenmarry]').val()
        var motherOccupation = $('select[name=motherOccupation]').val()
        var elderBrothers = $('input[name=elderBrothers]').val()
        var youngerSisters = $('input[name=youngerSisters]').val()
        var financialStatus = $('select[name=financialStatus]').val()
        var ethnicGroup = $('select[name=ethnicGroup]').val()
        var numberofChildresn = $('input[name=numberofChildresn]').val()
        var bodyType = $('select[name=bodyType]').val()
        var physicalStatus = $('select[name=physicalStatus]').val()
        var dateOfBirth = $('#datepicker').val()
        var familyType = $('select[name=familyType]').val()
        var drinking = $('select[name=drinking]').val()
        var fatherOccupation = $('select[name=fatherOccupation]').val()
        var numberofsiblings = $('input[name=numberofsiblings]').val()
        var marriedBrothers = $('input[name=marriedBrothers]').val()
        var marriedSisters = $('input[name=marriedSisters]').val()
        var community = $('select[name=community]').val()


        // user education and education details

        var highestEducation = $('select[name=highestEducation]').val()
        var EduSpezialization = $('#EduSpezialization').val()
        var workingwith = $('select[name=workingwith').val()
        var workingas = $('select[name=workingas]').val()
        var annualincome = $('select[name=annualincome]').val()
        var nativeCountry = $('input[name=nativeCountry]').val()
        var nativeState = $('input[name=nativeState]').val()
        var nativeCity = $('input[name=nativeCity]').val()
        var currentCountry = $('input[name=currentCountry]').val()
        var currentState = $('input[name=currentState]').val()
        var currentCity = $('input[name=currentCity]').val()
        var locality = $('input[name=locality]').val()
        var primaryNumber = $('input[name=primaryNumber]').val()
        var secondaryNumber = $('input[name=secondaryNumber]').val()
        var preferedContact = $('input[name=preferedContact]').val()
        var relation = $('input[name=relation]').val()
        var describe = $('input[name=describe]').val()
        var performNamaz = $('select[name=performNamaz]').val()
        var religiousness = $('select[name=religiousness]').val()
        var readQuran = $('select[name=readQuran]').val()
        var madrassaEducation = $('input[name=madrassaEducation]').val()
        var attendIslamicServices = $('select[name=attendIslamicServices]').val()
        var houseName =  $('input[name=houseName]').val()

        data={
            'moblie':mobile,
            'nationality':nationality,
            'height':height,
            'weight':weight,
            'martialStatus':martialStatus,
            'complexion':complexion,
            'motherTongue':motherTongue,
            'languagespoken':languagespoken,
            'smoking':smoking,
            'whenmarry':whenmarry,
            'motherOccupation':motherOccupation,
            'elderBrothers':elderBrothers,
            'youngerSisters':youngerSisters,
            'financialStatus':financialStatus,
            'ethnicGroup':ethnicGroup,
            'numberofChildresn':numberofChildresn,
            'bodyType':bodyType,
            'physicalStatus':physicalStatus,
            'dateOfBirth':dateOfBirth,
            'familyType':familyType,
            'drinking':drinking,
            'fatherOccupation':fatherOccupation,
            'numberofsiblings':numberofsiblings,
            'marriedBrothers':marriedBrothers,
            'marriedSisters':marriedSisters,
            'community':community,
            csrfmiddlewaretoken:csrf_token
        }
        educationDetailsData = {
            'highestEducation':highestEducation,
            'EduSpezialization':EduSpezialization,
            'workingwith':workingwith,
            'workingas':workingas,
            'annualincome':annualincome,
            'nativeCountry':nativeCountry,
            'nativeState':nativeState,
            'nativeCity':nativeCity,
            'currentCountry':currentCountry,
            'currentState':currentState,
            'currentCity':currentCity,
            'locality':locality,
            'primaryNumber':primaryNumber,
            'secondaryNumber':secondaryNumber,
            'preferedContact':preferedContact,
            'relation':relation,
            'describe':describe,
            'performNamaz':performNamaz,
            'religiousness':religiousness,
            'readQuran':readQuran,
            'madrassaEducation':madrassaEducation,
            'attendIslamicServices':attendIslamicServices,
            'houseName':houseName,
            csrfmiddlewaretoken:csrf_token


        }
        updateUserPropertiest(data)
        updateUserLocationDetails(educationDetailsData)
        
    }
})

$("#martialStatus").change(function(){
    if($(this).val() == 'Never Married'){
        $("#noc").prop('disabled', true)
        $('input[name=numberofChildresn]').val('0')      
    }
    else{
        $("#noc").prop('disabled', false)
    }
});