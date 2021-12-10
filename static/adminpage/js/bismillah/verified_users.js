$(document).ready(function(){
    $.ajax({
        url:"http://127.0.0.1:8000/api/user/pendingverification/?status=True",
        type:"GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
              "Authorization",
              "Token " + localStorage.getItem("admin_token")
            );
          },
        success:function(response){
            var data = [];
            data = response
            $.each(data, function (i) {
                divId = $("#verifiedUsers")
                html = ''
                html += '<div id=div' + data[i].id + ' class="col-md-4 grid-margin stretch-card">'
                html += '<div class="card">'
                html += '<div class="checkbox-off text-right pt-3 px-4">'
                html += '<input type="checkbox" id="verifyCheckbox" value=' + data[i].id + ' class="input-ch" checked>'
                html += '</div>'
                html += '<div class="card-body">'
                html += '<div class="d-sm-flex flex-row flex-wrap text-center text-sm-left align-items-center">'
                html += '<img src=' + data[i].image['medium_square_crop'] + ' class="img-lg rounded" alt="profile image" />'
                html += '<div class="ml-sm-3 ml-md-0 ml-xl-3 mt-2 mt-sm-0 mt-md-2 mt-xl-0">'
                html += '<h6 class="mb-0">My Name</h6>'
                html += '<p class="text-muted mb-1 ph-num">9656248731</p>'
                html += '<p class="mb-0 text-success font-weight-bold">Developer</p>'
                html += '<p class="mb-0 text-success font-weight-bold">21-10-1998</p>'
                html += '<p class="mb-0 text-success font-weight-bold">Calicut</p>'
                html += '<p id="updateStatus' + data[i].id + '"></p>'
                html += '</div>'
                html += '</div>'
                html += '</div>'
                html += '</div>'
                html += '</div>'
                divId.append(html)
            });
        },
        
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


function verifyUser(id) {
    var csrf_token = $('[name="csrfmiddlewaretoken"]').val();
    data ={
        'is_verified':false,
        csrfmiddlewaretoken:csrf_token
    }
    $.ajax({
        url: "http://127.0.0.1:8000/api/user/removeVerification/"+id+"/",
        type: "GET",
        data: data,
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