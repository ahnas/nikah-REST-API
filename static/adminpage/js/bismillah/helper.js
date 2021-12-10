$(document).ready(function(){
  if (localStorage.getItem("admin_token")== null){
    window.location="/official/"
  }
  else{
    $.ajax({
      url: "http://127.0.0.1:8000/official/api/check_login_user/",
      type: "GET",
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authorization",
          "Token " + localStorage.getItem("admin_token")
        );
      },
      statusCode: {
          401:function() {
            window.location="/official/"
          },
          200:function(response){
            if((response) == false){
              window.location ="/official/"
            }   
          }
      },
      error: function(jqXHR, textStatus, responseText) {
          alert(jqXHR,responseText)
          console.log(textStatus, errorThrown);
        },
  });
  }
});

$("#logout").click(function(){
    $.ajax({
        url: "http://127.0.0.1:8000/official/api/logout/",
        type: "GET",
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            "Token " + localStorage.getItem("admin_token")
          );
        },
        statusCode: {
            403: function(response) {
            },
            200:function(response){                
            },
        },
        success:function(){
            localStorage.removeItem("admin_token")
            window.location="/official/"
        }
    });
});
