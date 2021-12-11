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
                html += '<div id=div' + data[i].id + ' class="col-md-12 stretch-card">'
                html += '<div class="card">'
                html += '<div class="checkbox-off text-right pt-3 px-4">'
                html += '<input type="checkbox" id="verifyCheckbox" value=' + data[i].id + ' class="input-ch">'
                html += '</div>'
                html += '<div class="card-body">'
                html += '<div class="d-sm-flex flex-row flex-wrap text-center text-sm-left align-items-center">'
                html += '<img src=' + data[i].image['medium_square_crop'] + ' onclick=viewDetails('+data[i].id+') class="img-lg rounded" alt="profile image" />'
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
                html += '<div class="col-md-12 stretch-card d-none '+data[i].id+'">'
                html += '<div class="card">'
                html += '<div class="card-body">'
                html+='<h5>Education and Prof Details</h5><br>'
                html +='<p class="mb-0 text-success font-weight-bold">Email: :<span style="color:black">'+data[i].user['email']+'</span></p>'

                
                html +='<p class="mb-0 text-success font-weight-bold">Eduspezialization: :<span style="color:black">'+data[i].education['EduSpezialization']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Annualincome: :<span style="color:black">'+data[i].education['annualincome']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Att :<span style="color:black">'+data[i].education['att']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Currentcity: :<span style="color:black">'+data[i].education['currentCity']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Currentcountry: :<span style="color:black">'+data[i].education['currentCountry']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Currentstate: :<span style="color:black">'+data[i].education['currentState']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Describe: :<span style="color:black">'+data[i].education['describe']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Highesteducation: :<span style="color:black">'+data[i].education['highestEducation']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Housename: :<span style="color:black">'+data[i].education['houseName']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Id: :<span style="color:black">'+data[i].education['id']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Locality: :<span style="color:black">'+data[i].education['locality']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Madrassaeducation: :<span style="color:black">'+data[i].education['madrassaEducation']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Nativecity: :<span style="color:black">'+data[i].education['nativeCity']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Nativecountry: :<span style="color:black">'+data[i].education['nativeCountry']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Nativestate: :<span style="color:black">'+data[i].education['nativeState']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Performnamaz: :<span style="color:black">'+data[i].education['performNamaz']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Preferedcontact: :<span style="color:black">'+data[i].education['preferedContact']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Primarynumber: :<span style="color:black">'+data[i].education['primaryNumber']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Readquran: :<span style="color:black">'+data[i].education['readQuran']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Relation: :<span style="color:black">'+data[i].education['relation']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Religiousness: :<span style="color:black">'+data[i].education['religiousness']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Secondarynumber: :<span style="color:black">'+data[i].education['secondaryNumber']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">User: :<span style="color:black">'+data[i].education['user']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Userproperties: :<span style="color:black">'+data[i].education['userProperties']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Workingas: :<span style="color:black">'+data[i].education['workingas']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Workingwith: :<span style="color:black">'+data[i].education['workingwith']+'</span></p>'
                html +='<h5>Profiles</h5>'
                html +='<p class="mb-0 text-success font-weight-bold">Bodytype :<span style="color:black">'+data[i].profile['bodyType']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Community :<span style="color:black">'+data[i].profile['community']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Complexion :<span style="color:black">'+data[i].profile['complexion']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Dateofbirth :<span style="color:black">'+data[i].profile['dateOfBirth']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Drinking :<span style="color:black">'+data[i].profile['drinking']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Elderbrothers :<span style="color:black">'+data[i].profile['elderBrothers']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Eldersister :<span style="color:black">'+data[i].profile['elderSister']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Ethnicgroup :<span style="color:black">'+data[i].profile['ethnicGroup']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Familytype :<span style="color:black">'+data[i].profile['familyType']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Fatheroccupation :<span style="color:black">'+data[i].profile['fatherOccupation']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Financialstatus :<span style="color:black">'+data[i].profile['financialStatus']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Gender :<span style="color:black">'+data[i].profile['gender']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Height :<span style="color:black">'+data[i].profile['height']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Id :<span style="color:black">'+data[i].profile['id']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Languagespoken :<span style="color:black">'+data[i].profile['languagespoken']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Marriedbrothers :<span style="color:black">'+data[i].profile['marriedBrothers']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Marriedsisters :<span style="color:black">'+data[i].profile['marriedSisters']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Martialstatus :<span style="color:black">'+data[i].profile['martialStatus']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Moblie :<span style="color:black">'+data[i].profile['moblie']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Motheroccupation :<span style="color:black">'+data[i].profile['motherOccupation']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Mothertongue :<span style="color:black">'+data[i].profile['motherTongue']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Name :<span style="color:black">'+data[i].profile['name']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Nationality :<span style="color:black">'+data[i].profile['nationality']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Numberofchildresn :<span style="color:black">'+data[i].profile['numberofChildresn']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Numberofsiblings :<span style="color:black">'+data[i].profile['numberofsiblings']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Physicalstatus :<span style="color:black">'+data[i].profile['physicalStatus']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Preferredprofile :<span style="color:black">'+data[i].profile['preferredProfile']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Profilecreated :<span style="color:black">'+data[i].profile['profileCreated']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Relegion :<span style="color:black">'+data[i].profile['relegion']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Smoking :<span style="color:black">'+data[i].profile['smoking']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">User :<span style="color:black">'+data[i].profile['user']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Weight :<span style="color:black">'+data[i].profile['weight']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Whenmarry :<span style="color:black">'+data[i].profile['whenmarry']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Yongerbrother :<span style="color:black">'+data[i].profile['yongerBrother']+'</span></p>'
                html +='<p class="mb-0 text-success font-weight-bold">Youngersisters :<span style="color:black">'+data[i].profile['youngerSisters']+'</span></p>'

                html += '</div>'
                html += '</div>'
                html += '</div>'
                html += '</div>'

                divId.append(html)
            });
        },
        error: function (jqXHR, responseText) {
            window.location="/official/"
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
    if($('.'+id).hasClass( "d-block" )){
        $('.'+id).removeClass('d-block');
        $('.'+id).addClass('d-none');

    }
    else{
    $('.'+id).removeClass('d-none');
    $('.'+id).addClass('d-block');
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
              $('.'+id).fadeOut();
              $('.'+id).removeClass('d-block');
              $('.'+id).addClass('d-none');
            },
          },

        
    });
}