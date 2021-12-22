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
    $("#EduSpezializationOption").html('<input id="EduSpezialization" name="EduSpezialization" placeholder="Specialization" type="text" class="form-control" onfocus="eduInputToselect()">')
    $("#workingasoptions").html('<input id="workingas" name="workingas" type="text" class="form-control" placeholder="Working as" onfocus="workingInputToselect()">')

    $.ajax({
        url: "http://192.168.1.65:8000/api/user/userdetailsFillCheck/",
        type: 'GET',
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('token')); },
        success: function (response) {
            if (response['user'] == true) {
                $.ajax({
                    url: "http://192.168.1.65:8000/api/user/Bproperties/",
                    type: 'GET',
                    dataType: "JSON",
                                
                    beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token '+localStorage.getItem('token'));},
                    success: function (response) {
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
                if (pageURL != "http://192.168.1.65:8000/profiler") {
                    window.location.href = "http://192.168.1.65:8000/profiler"
                }
            }
        },
        error: function (jqXHR) {
        }
    });
    $.ajax({
        url: "http://192.168.1.65:8000/api/user/Profesions/",
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
                url: "http://192.168.1.65:8000/api/user/Bproperties/",
                type: 'POST',
                dataType: "JSON",
                data: data,
                            
                beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token '+localStorage.getItem('token'));},
                success: function (response) {
                    // var responseText = jQuery.parseJSON(response);   
                    //sessionStorage.setItem("token", response['token'])
                    window.location.href = "http://192.168.1.65:8000/basicpref/"
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


