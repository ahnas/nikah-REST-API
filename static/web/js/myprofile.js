$(document).ready(function(){
    $("#btnSubmitDiv").hide();
    $("#noc").prop('disabled', true)
    $("#ocupationFather").html('<p> <input id="fatherOccupation" name="fatherOccupation" type="text" class="form-control" onfocus="fatherInputToselect()"></p>')
    $("#ocupationMother").html('<p> <input id="motherOccupation" name="motherOccupation" type="text" class="form-control" onfocus="motherInputToselect()"></p>')
    $("#EduSpezializationOption").html('<p> <input id="EduSpezialization" name="EduSpezialization" type="text" class="form-control" onfocus="eduInputToselect()"></p>')
    $("#workingasoptions").html('<p> <input id="workingas" name="workingas" type="text" class="form-control" onfocus="workingInputToselect()"></p>')


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
            $("#fatherOccupationview").html(response['fatherOccupation'])
            $("#motherOccupationview").html(response['motherOccupation'])
            $("#noOfSiblings").html(response['numberofsiblings'])
            $("#noOfElederBrother").html(response['elderBrothers'])
            $("#noOfMarriedBrothers").html(response['marriedBrothers'])
            $("#noOfYoungerSister").html(response['youngerSisters'])
            $("#noOfMarriedSisters").html(response['marriedSisters'])
            $("#elderSister").html(response['elderSister'])
            $("#yongerBrother").html(response['yongerBrother'])
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
            $('#fatherOccupation').val(response['fatherOccupation'])
            $('#motherOccupation').val(response['motherOccupation'])
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
            $("input[name=yongerBrother]").val(response['yongerBrother'])
            $("input[name=elderSister]").val(response['elderSister'])
            $("input[name=languagespoken]").val(response['languagespoken'])
            $("select[name=community]").val(response['community'])


 

            

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
            $("#nativeCity").html(response['nativeCity'])
            $("#nativeCountry").html(response['nativeCountry'])
            $("#nativeState").html(response['nativeState'])
            $("#workingAsview").html(response['workingas'])
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
            $('#workingas').val(response['workingas'])
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
        var motherOccupation = $('#motherOccupation').val()
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
        var fatherOccupation = $('#fatherOccupation').val()
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
        var elderSister =  $('input[name=elderSister]').val()
        var yongerBrother =  $('input[name=yongerBrother]').val()

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
            'elderSister':elderSister,
            'yongerBrother':yongerBrother,
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


function fatherInputToselect(){
    var html=`<select id='fatherOccupation' onchange="fatherocupation();" name='fatherOccupation' class="form-control fm">
    <option value="Private">Private</option>
    <option value="Self Employee">Self Employee</option>
    <option value="Doctor">Doctor</option>
    <option value="Engineer">Engineer</option>
    <option value="Manager">Manager</option>
    <option value="Pharmacist">Pharmacist</option>
    <option value="Accountant">Accountant</option>
    <option value="Teacher">Teacher</option>
    <option value="Late">Late</option>
    <option value="NRI">NRI</option>
    <option value="Home Maker">Home Maker</option>
    <option value="Govt Employee">Govt Employee</option>
    <option value="Retired">Retired</option>
    <option value="Buisness">Buisness</option>
    <option value="Coolie">Coolie</option>
    <option value="Farmer">Farmer</option>
    <option value="Other">Other</option>
    </select>`;
    $("#ocupationFather").html(html)
}
function fatherocupation(){
    if($('#fatherOccupation').val()=='Other'){
        var html=''
        html+='<input type="Text" placeholder="Specify Occupation" id="fatherOccupation" name="fatherOccupation" class="form-control">'
        $('#ocupationFather').html(html)
    }
}

function motherInputToselect(){
    var html=`<select id='motherOccupation'  onchange="motherocupation();" name='motherOccupation' class="form-control">
    <option value="Private">House Wife</option>
    <option value="Self Employee">Self Employee</option>
    <option value="Doctor">Doctor</option>
    <option value="Engineer">Engineer</option>
    <option value="Manager">Manager</option>
    <option value="Pharmacist">Pharmacist</option>
    <option value="Accountant">Accountant</option>
    <option value="Teacher">Teacher</option>
    <option value="Late">Late</option>
    <option value="Private">Private</option>
    <option value="NRI">NRI</option>
    <option value="Home Maker">Home Maker</option>
    <option value="Govt Employee">Govt Employee</option>
    <option value="Retired">Retired</option>
    <option value="Buisness">Buisness</option>
    <option value="Coolie">Coolie</option>
    <option value="Farmer">Farmer</option>
    <option value="Other">Other</option>
</select>`;
    $("#ocupationMother").html(html)
}
function motherocupation(){
    if($('#motherOccupation').val()=='Other'){
        var html=''
        html+='<input type="Text" placeholder="Specify Occupation" id="motherOccupation" name="motherOccupation" class="form-control">'
        $('#ocupationMother').html(html)
    }
}



function eduInputToselect(){
    var html=`<select id='EduSpezialization' onchange="educationspecialization();" class="form-control">


    <option value="MBBS">MBBS</option>
    <option value="BDS">BDS</option>
    <option value="BAMS">BAMS</option>
    <option value="BUMS">BUMS</option>
    <option value="B.Sc Nursing">B.Sc Nursing</option>
    <option value="B.Pharm">B.Pharm</option>
    <option value="M.Pharm">M.Pharm</option>
    <option value="D.Pharm">D.Pharm</option>
    <option value="B.Arch">B.Arch</option>
    <option value="M.Arch">M.Arch</option>
    <option value="Bachelor of Arts">Bachelor of Arts</option>
    <option value="Bachelor of Science">Bachelor of Science</option>
    <option value="Bachelor of Fine Art">Bachelor of Fine Art</option>
    <option value="Master of Arts">Master of Arts</option>
    <option value="Master of Science">Master of Science</option>
    <option value="B.A English">B.A English</option>
    <option value="B.A History">B.A History</option>
    <option value="B.A Economics">B.A Economics</option>
    <option value="B.A Psychology">B.A Psychology</option>
    <option value="B.A Journalism">B.A Journalism</option>
    <option value="B.A Arabic">B.A Arabic</option>
    <option value="B.A Political Science">B.A Political Science</option>
    <option value="B.A (Honors)">B.A (Honors)</option>
    <option value="M.A English">M.A English</option>
    <option value="M.A History">M.A History</option>
    <option value="M.A Economics">M.A Economics</option>
    <option value="M.A Arabic">M.A Arabic</option>
    <option value="M.A Malayalam">M.A Malayalam</option>
    <option value="B.Sc in Computer Science">B.Sc in Computer Science</option>
    <option value="B.Sc Physics">B.Sc Physics</option>
    <option value="B.Sc Mathematics">B.Sc Mathematics</option>
    <option value="B.Sc Botany">B.Sc Botany</option>
    <option value="B.Sc in Zoology">B.Sc in Zoology</option>
    <option value="B.Sc in Statistics">B.Sc in Statistics</option>
    <option value="M.Sc in Computer Science">M.Sc in Computer Science</option>
    <option value="M.Sc Physics">M.Sc Physics</option>
    <option value="M.Sc Mathematics">M.Sc Mathematics</option>
    <option value="B.Sc Botany">B.Sc Botany</option>
    <option value="M.Sc in Zoology">M.Sc in Zoology</option>
    <option value="M.Sc in Statistics">M.Sc in Statistics</option>
    <option value="B.com">B.com</option>
    <option value="M.com">M.com</option>
    <option value="BBA">BBA</option>
    <option value="MBA">MBA</option>
    <option value="Chartered Accountant (CA)">Chartered Accountant (CA)</option>
    <option value="Company Secretary (CS)">Company Secretary (CS)</option>
    <option value="LLB">LLB</option>
    <option value="B.Tech">B.Tech</option>
    <option value="M.Tech">M.Tech</option>
    <option value="B.Tech Mechanical">B.Tech Mechanical</option>
    <option value="B.Tech Civil">B.Tech Civil</option>
    <option value="B.Tech Computer Science and Engineering">B.Tech Computer Science and Engineering</option>
    <option value="B.Tech ECE">B.Tech ECE</option>
    <option value="B.Tech Aerospace">B.Tech Aerospace</option>
    <option value="Diploma Courses">Diploma Courses</option>
    <option value="Certificate Couses">Certificate Couses</option>
    <option value="Diploma in Interior Designing">Diploma in Interior Designing</option>
    <option value="Diploma in Fashion Designing">Diploma in Fashion Designing</option>
    <option value="Hotel Management">Hotel Management</option>
    <option value="Animation, Graphics and Multimedia">Animation, Graphics and Multimedia</option>
    <option value="ITI">ITI</option>
    <option value="Higher Secondary">Higher Secondary</option>
    <option value="High School">High School</option>
    <option value="M. Ed">M. Ed</option>
    <option value="B. Ed">B. Ed</option>
    <option value="TTC">TTC</option>
    <option value="Other">Other</option>
    

</select>`;
    $("#EduSpezializationOption").html(html)
}
function educationspecialization(){
    if($('#EduSpezialization').val()=='Other'){
        var html=''
        html+='<input type="Text" placeholder="Specify Education" id="EduSpezialization" name="EduSpezialization" class="form-control">'
        $('#EduSpezializationOption').html(html)
    }
}



function workingInputToselect(){
    var html=`<select id='workingas'  onchange="workingaschange();" class="form-control">


    <option value="Not Working">Not Working</option>
    <option value="Accountant">Accountant</option>
    <option value="CA">CA</option>
    <option value="BUMS">BUMS</option>
    <option value="Secretary">Secretary</option>
    <option value="Doctor">Doctor</option>
    <option value="Manager">Manager</option>
    <option value="Asst. Manager">Asst. Manager</option>
    <option value="Engineer">Engineer</option>
    <option value="Bank employee">Bank employee</option>
    <option value="PRO">PRO</option>
    <option value="Sales">Sales</option>
    <option value="Electrician">Electrician</option>
    <option value="Mechanic">Mechanic</option>
    <option value="Plumber">Plumber</option>
    <option value="Coolie">Coolie</option>
    <option value="Cashier">Cashier</option>
    <option value="Driver">Driver</option>
    <option value="Consultants">Consultants</option>
    <option value="Nurse">Nurse</option>
    <option value="Marketing Executive">Marketing Executive</option>
    <option value="HRM">HRM</option>
    <option value="Pharmacist">Pharmacist</option>
    <option value="Self Employed">Self Employed</option>
    <option value="Part-Time">Part-Time</option>
    <option value="Professor">Professor</option>
    <option value="Teacher">Teacher</option>

    <option value="Software Developer">Software Developer</option>
    <option value="Graphics Designer">Graphics Designer</option>
    <option value="Business">Business</option>
    <option value="Administrator">Administrator</option>
    <option value="Other">Other</option>
    

</select>`;
    $("#workingasoptions").html(html)
}
function workingaschange(){
    if($('#workingas').val()=='Other'){
        var html=''
        html+='<input type="Text" placeholder="Specify Occupation" id="workingas" name="workingas" class="form-control">'
        $('#workingasoptions').html(html)
    }
}

$('#workingas').on('change', function (e) {
    var valueSelected = this.value;
    if(valueSelected=='Other'){
        var html=''
        html+='<input type="Text" placeholder="Specify Your Work" id="workingas" name="workingas" class="form-control">'
        $('#workingasoptions').html(html)
    }
});


$('#EduSpezialization').on('change', function (e) {
    var valueSelected = this.value;
    if(valueSelected=='Other'){
        var html=''
        html+='<input type="Text" placeholder="Specify Education" id="EduSpezialization" name="EduSpezialization" class="form-control">'
        $('#EduSpezializationOption').html(html)
        console.log("Other")
    }
});



$('#motherOccupation').on('change', function (e) {
    var valueSelected = this.value;
    if(valueSelected=='Other'){
        var html=''
        html+='<input type="Text" placeholder="Specify Occupation" id="motherOccupation" name="motherOccupation" class="form-control">'
        $('#ocupationMother').html(html)
        console.log("Other")
    }
});

