$(document).ready(function () {
    $.ajax({
        url: "http://127.0.0.1:8000/api/user/pendingverification/?status=False",
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("admin_token")
            );
        },
        success: function (response) {
            var data = [];
            data = response
            console.log(response)
            $.each(data, function (i) {
                divId = $("#pendingVerificationDetailsDiv")
                html = ''
                html = '<div class="col-md-4 row grid-margin">'
                html += '<div id=div' + data[i].id + ' class="col-md-12 stretch-card" onclick=viewDetails('+data[i].id+')>'
                html += '<div class="card">'
                html += '<div class="checkbox-off text-right pt-3 px-4">'
                html += '<input type="checkbox" id="verifyCheckbox" value=' + data[i].id + ' class="input-ch">'
                html += '</div>'
                html += '<div class="card-body">'
                html += '<div class="d-sm-flex flex-row flex-wrap text-center text-sm-left align-items-center">'
                html += '<img src=' + data[i].image['medium_square_crop'] + ' class="img-lg rounded" alt="profile image" />'
                html += '<div class="ml-sm-3 ml-md-0 ml-xl-3 mt-2 mt-sm-0 mt-md-2 mt-xl-0">'
                html += '<h6 class="mb-0">My Name</h6>'
                html += '<p class="text-muted mb-1 ph-num">'+data[i].profile['moblie']+'</p>'
                html += '<p class="mb-0 text-success font-weight-bold">'+data[i].education['workingas']+'</p>'
                html += '<p class="mb-0 text-success font-weight-bold">'+data[i].profile['dateOfBirth']+'</p>'
                html += '<p class="mb-0 text-success font-weight-bold">'+data[i].education['nativeCity']+'</p>'
                html += '<p id="updateStatus' + data[i].id + '"></p>'
                html += '</div>'
                html += '</div>'
                html += '</div>'
                html += '</div>'
                html += '</div>'
                html += '<div class="col-md-12 stretch-card d-none" id='+data[i].id+'>'
                html += '<div class="card">'
                html += '<div class="card-body">'
                html +='<p class="mb-0 text-success font-weight-bold">Email: :'+data[i].user['email']+'</p>'

                html+='<h5>Education and Prof Details</h5>'
                html +='<p class="mb-0 text-success font-weight-bold">Eduspezialization: :'+data[i].education['EduSpezialization']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Annualincome: :'+data[i].education['annualincome']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Att :'+data[i].education['att']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Currentcity: :'+data[i].education['currentCity']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Currentcountry: :'+data[i].education['currentCountry']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Currentstate: :'+data[i].education['currentState']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Describe: :'+data[i].education['describe']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Highesteducation: :'+data[i].education['highestEducation']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Housename: :'+data[i].education['houseName']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Id: :'+data[i].education['id']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Locality: :'+data[i].education['locality']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Madrassaeducation: :'+data[i].education['madrassaEducation']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Nativecity: :'+data[i].education['nativeCity']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Nativecountry: :'+data[i].education['nativeCountry']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Nativestate: :'+data[i].education['nativeState']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Performnamaz: :'+data[i].education['performNamaz']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Preferedcontact: :'+data[i].education['preferedContact']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Primarynumber: :'+data[i].education['primaryNumber']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Readquran: :'+data[i].education['readQuran']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Relation: :'+data[i].education['relation']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Religiousness: :'+data[i].education['religiousness']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Secondarynumber: :'+data[i].education['secondaryNumber']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">User: :'+data[i].education['user']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Userproperties: :'+data[i].education['userProperties']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Workingas: :'+data[i].education['workingas']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Workingwith: :'+data[i].education['workingwith']+'</p>'
                html +='<h5>Profiles</h5>'
                html +='<p class="mb-0 text-success font-weight-bold">Bodytype :'+data[i].profile['bodyType']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Community :'+data[i].profile['community']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Complexion :'+data[i].profile['complexion']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Dateofbirth :'+data[i].profile['dateOfBirth']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Drinking :'+data[i].profile['drinking']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Elderbrothers :'+data[i].profile['elderBrothers']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Eldersister :'+data[i].profile['elderSister']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Ethnicgroup :'+data[i].profile['ethnicGroup']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Familytype :'+data[i].profile['familyType']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Fatheroccupation :'+data[i].profile['fatherOccupation']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Financialstatus :'+data[i].profile['financialStatus']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Gender :'+data[i].profile['gender']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Height :'+data[i].profile['height']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Id :'+data[i].profile['id']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Languagespoken :'+data[i].profile['languagespoken']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Marriedbrothers :'+data[i].profile['marriedBrothers']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Marriedsisters :'+data[i].profile['marriedSisters']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Martialstatus :'+data[i].profile['martialStatus']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Moblie :'+data[i].profile['moblie']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Motheroccupation :'+data[i].profile['motherOccupation']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Mothertongue :'+data[i].profile['motherTongue']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Name :'+data[i].profile['name']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Nationality :'+data[i].profile['nationality']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Numberofchildresn :'+data[i].profile['numberofChildresn']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Numberofsiblings :'+data[i].profile['numberofsiblings']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Physicalstatus :'+data[i].profile['physicalStatus']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Preferredprofile :'+data[i].profile['preferredProfile']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Profilecreated :'+data[i].profile['profileCreated']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Relegion :'+data[i].profile['relegion']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Smoking :'+data[i].profile['smoking']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">User :'+data[i].profile['user']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Weight :'+data[i].profile['weight']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Whenmarry :'+data[i].profile['whenmarry']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Yongerbrother :'+data[i].profile['yongerBrother']+'</p>'
                html +='<p class="mb-0 text-success font-weight-bold">Youngersisters :'+data[i].profile['youngerSisters']+'</p>'

                html += '</div>'
                html += '</div>'
                html += '</div>'
                html += '</div>'

                divId.append(html)
            });
        },
        error: function (jqXHR, responseText) {
            alert(jqXHR.responseText)

        }
    });
});

$(document).on('change', '[type=checkbox]', function () {
    var id = $(this).val();
    setTimeout(function () {
        $("#updateStatus" + id).html('updated')
        verifyUser(id)
    }, 2000);
    $("#updateStatus" + $(this).val()).html('updating...')
});
function viewDetails(id){
    if($('#'+id).hasClass( "d-block" )){
        $('#'+id).removeClass('d-block');
        $('#'+id).addClass('d-none');

    }
    else{
    $('#'+id).removeClass('d-none');
    $('#'+id).addClass('d-block');
    }   
}
function verifyUser(id) {
    var csrf_token = $('[name="csrfmiddlewaretoken"]').val();
    data ={
        'is_verified':true,
        csrfmiddlewaretoken:csrf_token
    }
    $.ajax({
        url: "http://127.0.0.1:8000/api/user/verifyview/"+id+"/",
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("admin_token")
            );
        },

        statusCode: {
            200: function() {
              $("#div"+id).fadeOut();
            },
          },

        
    });
}