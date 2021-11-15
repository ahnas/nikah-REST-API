$(document).ready(function () {
    $("#imgup-popup").hide();
  });
  
  $("document").ready(function () {
    $("#image1").change(function () {
      if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $("#viewImageId").attr("src", e.target.result);
          $("#viewImageId").removeClass("dyimg");
          $("#imgup-popup").show();
          $("#btnNotNow").attr("id", "btnFormSubmit");
          $("#btnFormSubmit").html("Submit");
        };
        reader.readAsDataURL(this.files[0]);
      }
    });
  });
  
  $("document").ready(function () {
    $("#image_two").change(function () {
      var imageOne = $("#image1").val();
      if (imageOne == "") {
        $("#viewImageId").addClass("dyimg");
        $("#image_two").val("");
        $("#image_three").val("");
      } else {
        if (this.files && this.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e) {
            $("#viewImageIdtwo").attr("src", e.target.result);
            $("#viewImageId").removeClass("dyimg");
            $("#viewImageIdtwo").removeClass("dyimg");
          };
          reader.readAsDataURL(this.files[0]);
        }
      }
    });
  });
  
  $(document).ready(function () {
    $("#image_three").change(function () {
      var img1 = $("#image1").val();
      var img2 = $("#image_two").val();
      if (img1 == "") {
        $("#viewImageId").addClass("dyimg");
      } else if (img2 == "") {
        $("#viewImageIdtwo").addClass("dyimg");
      } else {
        if (this.files && this.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e) {
            $("#viewImageIdthree").attr("src", e.target.result);
            $("#viewImageIdtwo").addClass("dyimg");
            $("#viewImageId").addClass("dyimg");
            $("#viewImageIdtwo").removeClass("dyimg");
            $("#viewImageId").removeClass("dyimg");
            $("#imgup-popup").show();
            $("#fileUploadDiv").hide();
          };
          reader.readAsDataURL(this.files[0]);
        }
      }
    });
  });
  
  $(document).ready(function () {
    $("form").submit(function (e) {

      var formData = new FormData(document.getElementById("propicUpload"));
      var csrf_token1 = $('[name="csrfmiddlewaretoken"]').val();
      formData.append("image", $("#image1")[0].files[0]);
      formData.append("image_two", $("#image_two")[0].files[0]);
      formData.append("image_three", $("#image_three")[0].files[0]);
      formData.append("csrfmiddlewaretoken", csrf_token1);
      $.ajax({
        url: "http://127.0.0.1:8000/api/user/userImageUpload/",
        type: $(this).attr("method"),
        data: formData,
        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token '+localStorage.getItem('token'));},
        cache: false,
        contentType: false,
        processData: false,
        success: function () {
          window.location="http://127.0.0.1:8000/pending/";
        },
        error: function(){
        },
      });
      return false;
    });
  });
  
  $("#btnNotNow").click(function () {
    $('#propicUpload').submit();
  });
  