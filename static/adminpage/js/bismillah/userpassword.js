$(document).ready(function(){
    $.ajax({
        url: "http://127.0.0.1:8000/api/user/getUserPasswords",
        type: "GET",
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            "Token " + localStorage.getItem("admin_token")
          );
        },
        success: function (response) {
            drawTable(response);

            function drawTable(data) {
                for (var i = 0; i < data.length; i++) {
                    drawRow(data[i]);
                }

            }
            function drawRow(rowData) {
                var row = $("<tr />")
                $("#userPasswordTable").append(row);
                row.append($("<td>" + rowData["user"] + "</td>"));
                row.append($("<td>" + rowData["password"] + "</td>"));

            }
          },
      });
    });


    //   $(function() {
    //     $(this).bind("contextmenu", function(e) {
    //         e.preventDefault();
    //     });
    // }); 
    