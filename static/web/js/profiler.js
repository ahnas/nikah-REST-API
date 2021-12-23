var globalarray = []
function selcetedLanguage(a) {
    if ($(a).prop('checked')) {
        globalarray.push($(a).val())
    }
    else {
        globalarray.pop($(a).val())
    }

}



$(document).ready(function () {
    
    $("#ocupationFather").html('<input id="fatherOccupation" name="fatherOccupation" placeholder="Father Occupation" type="text" class="form-control" onfocus="fatherInputToselect()">')
    $("#ocupationMother").html('<input id="motherOccupation" name="motherOccupation" placeholder="Mother Occupation" type="text" class="form-control" onfocus="motherInputToselect()">')


    $.ajax({
        url: "http://127.0.0.1:8000/api/user/userdetailsFillCheck/",
        type: 'GET',
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('token')); },
        success: function (response) {
            if (response['userProperties'] == true) {
                $.ajax({
                    url: "http://127.0.0.1:8000/api/user/properties/",
                    type: 'GET',
                    dataType: "JSON",

                    beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('token')); },
                    success: function (response) {
                        $('#profileCreated').val(response[0]['profileCreated']);
                        $('#name').val(response[0]['name']);
                        $('#gender').val(response[0]['gender']);
                        $('#community').val(response[0]['community']);
                        $('#moblie').val(response[0]['moblie']);
                        $('#preferredProfile').val(response[0]['preferredProfile']);
                        $('#dateOfBirth').val(response[0]['dateOfBirth']);
                        $('#relegion').val(response[0]['relegion']);
                        $('#nationality').val(response[0]['nationality']);
                        $('#height').val(response[0]['height']);
                        $('#weight').val(response[0]['weight']);
                        $('#martialStatus').val(response[0]['martialStatus']);
                        $('#childrens').val(response[0]['childrens']);
                        $('#complexion').val(response[0]['complexion']);
                        $('#ethnicGroup').val(response[0]['ethnicGroup']);
                        $('#bodyType').val(response[0]['bodyType']);
                        $('#physicalStatus').val(response[0]['physicalStatus']);
                        $('#motherTongue').val(response[0]['motherTongue']);
                        $('#fatherOccupation').val(response[0]['fatherOccupation']);
                        $('#motherOccupation').val(response[0]['motherOccupation']);
                        $('#numberofsiblings').val(response[0]['numberofsiblings']);
                        $('#elderBrothers').val(response[0]['elderBrothers']);
                        $('#marriedBrothers').val(response[0]['marriedBrothers']);
                        $('#youngerSisters').val(response[0]['youngerSisters']);
                        $('#marriedSisters').val(response[0]['marriedSisters']);
                        $('#brothers').val(response[0]['brothers']);
                        $('#sisters').val(response[0]['sisters']);
                        
                        languagespoken = response[0]['languagespoken'];
                        globalarray=languagespoken.split(",");
                        const myArray = languagespoken.split(",");
                        for (let i = 0; i < myArray.length; ++i) {
                            $("#" + myArray[i]).prop('checked', true);
                        }
                        $('#financialStatus').val(response[0]['financialStatus']);
                        $('#smoking').val(response[0]['smoking']);
                        $('#drinking').val(response[0]['drinking']);
                        $('#whenmarry').val(response[0]['whenmarry']);
                    },
                    error: function (jqXHR) {
                    }
                });

            }
        },
        error: function (jqXHR) {
        }
    });

    $("form[name='profiler']").validate({ // initialize the plugin
        rules: {
            profileCreated: {
                required: true,
            },
            name: {
                required: true,
            },
            gender: {
                required: true,
            },
            community: {
                required: true,
            },
            moblie: {
                required: true,
            },
            preferredProfile: {
                required: true,
            },
            dateOfBirth: {
                required: true,
            },
            relegion: {
                required: true,
            },
            nationality: {
                required: true,
            },
            height: {
                required: true,
            },
            weight: {
                required: true,
            },
            martialStatus: {
                required: true,
            },
            complexion: {
                required: true,
            },
            ethnicGroup: {
                required: true,
            },
            complexion: {
                required: true,
            },
            bodyType: {
                required: true,
            },
            physicalStatus: {
                required: true,
            },
            motherTongue: {
                required: true,
            },
            fatherOccupation: {
                required: true,
            },
            motherOccupation: {
                required: true,
            },
            brothers: {
                required: true,
            },
            sisters: {
                required: true,
            },
            financialStatus: {
                required: true,
            },
            smoking: {
                required: true,
            },
            drinking: {
                required: true,
            }

        },
        messages: {

            nationality: "This Field Is Required",


        },


        submitHandler: function () {
            event.preventDefault();
            var csrf_token1 = $('[name="csrfmiddlewaretoken"]').val();
            var profileCreated = $('#profileCreated').val();
            var name = $('#name').val();
            var gender = $('#gender').val();
            var community = $('#community').val();
            var moblie = $('#moblie').val();
            var preferredProfile = $('#preferredProfile').val();
            var dateOfBirth = $('#dateOfBirth').val();
            var relegion = $('#relegion').val();
            var nationality = $('#nationality').val();
            var height = $('#height').val();
            var weight = $('#weight').val();
            var martialStatus = $('#martialStatus').val();
            var numberofChildresn = $('#childrens').val();
            var complexion = $('#complexion').val();
            var ethnicGroup = $('#ethnicGroup').val();
            var bodyType = $('#bodyType').val();
            var physicalStatus = $('#physicalStatus').val();
            var motherTongue = $('#motherTongue').val();
            var fatherOccupation = $('#fatherOccupation').val();
            var motherOccupation = $('#motherOccupation').val();
            var numberofsiblings = $('#numberofsiblings').val();
            var elderBrothers = $('#elderBrothers').val();
            var marriedBrothers = $('#marriedBrothers').val();
            var youngerSisters = $('#youngerSisters').val();
            var marriedSisters = $('#marriedSisters').val();
            var brothers = $('#brothers').val();
            var sisters = $('#sisters').val();
            var languagespoken = globalarray.toString()
            var financialStatus = $('#financialStatus').val();
            var smoking = $('#smoking').val();
            var yongerBrother=$('#yongerBrother').val()
            var elderSister=$('#elderSister').val()
            var drinking = $('#drinking').val();
            var whenmarry = $('#whenmarry').val();
            data = {
                "profileCreated": profileCreated,
                "name": name,
                "gender": gender,
                "community": community,
                "moblie": moblie,
                "preferredProfile": preferredProfile,
                "dateOfBirth": dateOfBirth,
                "relegion": relegion,
                "nationality": nationality,
                "height": height,
                "weight": weight,
                "martialStatus": martialStatus,
                "complexion": complexion,
                "ethnicGroup": ethnicGroup,
                "bodyType": bodyType,
                "physicalStatus": physicalStatus,
                "motherTongue": motherTongue,
                "fatherOccupation": fatherOccupation,
                "motherOccupation": motherOccupation,
                "brothers": brothers,
                "sisters": sisters,
                "financialStatus": financialStatus,
                "smoking": smoking,
                "drinking": drinking,
                "numberofChildresn": numberofChildresn,
                "numberofsiblings": numberofsiblings,
                "elderBrothers": elderBrothers,
                "marriedBrothers": marriedBrothers,
                "youngerSisters": youngerSisters,
                "marriedSisters": marriedSisters,
                "elderSister":elderSister,
                "yongerBrother":yongerBrother,
                "languagespoken": languagespoken,
                "whenmarry": whenmarry,
            }
            var total_siblings = parseInt(elderBrothers) + parseInt(marriedBrothers) + parseInt(youngerSisters) + parseInt(marriedSisters)+parseInt(elderSister)+parseInt(yongerBrother)
            if (parseInt(numberofsiblings) != 0 && parseInt(total_siblings) == 0) {
                return siblingError();
            }

            $.ajax({
                url: "http://127.0.0.1:8000/api/user/properties/",
                type: 'POST',
                dataType: "JSON",
                data: data,

                beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('token')); },
                success: function (response) {
                    window.location.href = "http://127.0.0.1:8000/profilerB/"
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
