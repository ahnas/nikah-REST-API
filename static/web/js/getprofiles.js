
var pageURL = $(location).attr("href");
$(document).ready(function () {
    if (pageURL != "http://127.0.0.1:8000/pending/" && pageURL != "http://127.0.0.1:8000/delete/") {
    getdatas('');
    }
});
function getdatas(nmid){
    var url="";
    if($('#search').val()=='true'){
        url="http://127.0.0.1:8000/api/user/collectproperties/?search=true/";
    }
    else{
        url="http://127.0.0.1:8000/api/user/collectproperties/";
    }
    if(nmid!=''){
        url="http://127.0.0.1:8000/api/user/collectproperties/?NMID="+nmid;
    }
    
    

    $.ajax({
        url: url,
        type: 'GET',
        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token '+localStorage.getItem('token'));},
        success: function (response) {
            const obj = JSON.parse(JSON.stringify(response));
            $('#membersList').empty()
            for(let i = 0; i < obj.length && i<=200; i++){
                var age= new Date().getFullYear()-new Date(obj[i]['profile'].dateOfBirth).getFullYear();
                var html=''
                    html+=`<div class="col-lg-4 col-md-6 col-sm-12 col-12 col-pad-md" >
                    <div class="pcard bord-rad-down">

                    <img class="position-relative" width="100%" src=`+obj[i].image['medium_square_crop']+` alt="" onclick='profileview(`+obj[i].id+`)'>

                    <div class="position-absolute pcard-det bord-rad-down">  
                    <h5>`+obj[i]['profile'].name+`</h5>
                    <h6>`+obj[i].nmId+`</h6>

                    <ul class="d-flex justify-content-space-between">
                    <li>`+age+` Years |&nbsp</li> 
                    <li>`+obj[i]['profile'].height+` cm |&nbsp</li> 
                    <li>`+obj[i]['profile'].martialStatus+`</li>  </ul>

                    <ul class="d-flex justify-content-space-between">
                    <li>`+obj[i]['education'].workingas+` |&nbsp</li> 
                    <li>`+obj[i]['profile'].relegion+` |&nbsp</li> 
                    <li>`+ obj[i]['education'].nativeCity+` ...</li>  
                    </ul>
                    <div class="margin-top10">
                    <a class="heartt" id="buttonn">
                    <i id=`+obj[i]['user']+` class="icofont-ui-love float-left" onclick='likeProfile(`+obj[i]['user']+`)'></i></a>
                    <i class="icofont-ui-text-chat float-right chta" onclick='ChatWithUser(`+obj[i]['user']+`)'></i> 

                    </div>
                    </div>
                    </div>
                    </div>`
                    $('#membersList').append(html)
                }
        },
        error: function (jqXHR) {
            if (jqXHR.status == 404) { 
                window.location.href = "http://127.0.0.1:8000/pending"
                var responseText = jQuery.parseJSON(jqXHR.responseText);
            } else {
                $('#username').html("<a href='http://127.0.0.1:8000/signup/' class='get-started-btnn'>Sign Up</a>");
            }
        }
    }); 
}


