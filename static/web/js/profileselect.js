function profileview(id){
    window.location.href = "http://192.168.1.65:8000/viewprofile/"+id;
}

function likeProfile(id){
    data = {'liked_by_user':id,'liked_user':id}
            
    $.ajax({
        url: "http://192.168.1.65:8000/api/user/likeprofile/",
        type: 'POST',
        dataType: "JSON",
        data: data,
        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token '+localStorage.getItem('token'));},
               
        // beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token 6660edb56e1809238b3239f9bb8e3c1961e11c6e');},
        success: function (response) {

            if($("#"+id).hasClass("icofont-thumbs-down")){
                $("#"+id).attr("class","icofont-ui-love border-radius-50 float-left");

            }
            
            else{
            $("#"+id).attr("class","icofont-thumbs-down border-radius-50 float-left");
            }
            if($('#mobileLikebutton').hasClass("icofont-thumbs-down")){
                $('#mobileLikebutton').attr("class","icofont-ui-love");

            }
            else{
                $('#mobileLikebutton').attr("class","icofont-thumbs-down");
                }

            loadlikecount();
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


function modify(id){
    window.location.href = "http://192.168.1.65:8000/modify/";
}