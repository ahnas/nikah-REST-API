$(document).ready(function () {
    $.ajax({
        url: "http://192.168.1.65:8000/api/user/userImageUpload/",
        type: 'GET',
        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token '+localStorage.getItem('token'));},
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            const obj = JSON.parse(JSON.stringify(response));
            
            $("#viewImageId").attr("src", obj[0].image['medium_square_crop']);
            $("#viewImageIdtwo").attr("src", obj[0].image_two['medium_square_crop']);
            $("#viewImageIdthree").attr("src", obj[0].image_three['medium_square_crop']);
            $("#imageId").val(obj[0].id);
        },
        error: function(){
        },
      });
    $("#imgup-popup").hide();
  });
  
  $("document").ready(function () {
    $("#image1").change(function () {
      if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $("#viewImageId").attr("src", e.target.result);
        };
        reader.readAsDataURL(this.files[0]);
      }
    });
  });
  
  $("document").ready(function () {
    $("#image_two").change(function () {
        if (this.files && this.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e) {
            $("#viewImageIdtwo").attr("src", e.target.result);
          };
          reader.readAsDataURL(this.files[0]);
        }
    });
  });
  
  $(document).ready(function () {
    $("#image_three").change(function () {
        if (this.files && this.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e) {
            $("#viewImageIdthree").attr("src", e.target.result);
          };
          reader.readAsDataURL(this.files[0]);
        }
      
    });
  });
  