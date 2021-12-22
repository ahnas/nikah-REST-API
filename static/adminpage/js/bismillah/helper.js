$(document).ready(function(){
  if (localStorage.getItem("admin_token")== null){
    window.location="/official/"
  }
  else{
    $.ajax({
      url: "http://127.0.0.1:8000/api/user/test_auth/",
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


  $.ajax({
    url: "http://127.0.0.1:8000/api/user/getprofilescounts/",
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
      $('#todaysCount').html(response.todaysRegister)
      $('#matchedCount').html(response.matched)
      $('#maleProfiles').html(response.males)
      $('#femaleProfiles').html(response.females)
      $('#pveridicationc').html(response.notverified)
      $('#Verifiedc').html(response.verified)
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
