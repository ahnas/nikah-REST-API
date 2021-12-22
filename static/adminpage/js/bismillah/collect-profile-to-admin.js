
function calculateAge(dob) {
  var str = dob.split('-');
  var firstdate = new Date(str[0], str[1], str[2]);
  var today = new Date();
  var dayDiff = Math.ceil(today.getTime() - firstdate.getTime()) / (1000 * 60 * 60 * 24 * 365);
  var age = parseInt(dayDiff);
  return (age)
}

function genderbasedprofile(gender) {
$.ajax({
    url: "http://192.168.1.65:8000/api/user/adminsdashboard/?gender="+gender,
    type: "GET",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Token " + localStorage.getItem("admin_token")
      );
    },
    success: function (response) {
      console.log(response)
        const obj = JSON.parse(JSON.stringify(response))
       
        for(let i =0;i<obj.length;i++)
        {
          age = age = calculateAge(obj[i].profile['dateOfBirth'])
           $('#femaleMembers').append( "<div class='col-md-3 grid-margin stretch-card'>\
						<div class='card p-3'>\
                            <img class='card-img-top rounded img-size mx-auto' src='"+obj[i].image["medium_square_crop"]+"' alt='Card image cap'>\
							<div class='card-body'>\
								<div class=''>\
                                    <div class=' mt-xl-0 '>\
										<h6 class='text-success'>"+obj[i].nmId+"</h6>\
										<h6 class='mb-0'>"+obj[i].profile['name']+"</h6> \
										<p class='text-muted mb-1 ph-num'> "+obj[i].profile['moblie']+" </p>\
										<p class='text-muted mb-1 ph-num'>"+obj[i].user['email']+"</p>\
										<p class='mb-0 text-success font-weight-bold'>"+age+"</p>\
										<p class='mb-0 text-success font-weight-bold'>"+obj[i].profile['martialStatus']+"</p>\
										<p class='mb-0 text-success font-weight-bold'>"+obj[i].education['highestEducation']+"</p>\
										<p class='mb-0 text-success font-weight-bold'>"+obj[i].education['workingas']+"</p>\
										<p class='mb-0 text-success font-weight-bold'>"+obj[i].education['nativeCity']+"</p>\
									</div>\
								</div>\
							</div>\
						</div>\
					</div>")
        }    
    },
    error: function (jqXHR,responseText) {
      if (jqXHR.status == 403) {
        
      } else {
      }
    },
  });
}




$("#searchbox2").keyup(function() {
  // Retrieve the input field text and reset the count to zero
  var filter = $(this).val(),

    count = 0;

  // Loop through the comment list
  $('#femaleMembers div').each(function() {

    // If the list item does not contain the text phrase fade it out
    if ($(this).text().search(new RegExp(filter, "i")) < 0) {
      $(this).hide();  // MY CHANGE

      // Show the list item if the phrase matches and increase the count by 1
    } else {
      $(this).show(); // MY CHANGE
      count++;
    }

  });

});


$("#selectbox2").change(function() {
  // Retrieve the input field text and reset the count to zero
  var filter = $(this).val(),

    count = 0;

  // Loop through the comment list
  $('#femaleMembers div').each(function() {

    // If the list item does not contain the text phrase fade it out
    if ($(this).text().search(new RegExp(filter, "i")) < 0) {
      $(this).hide();  // MY CHANGE

      // Show the list item if the phrase matches and increase the count by 1
    } else {
      $(this).show(); // MY CHANGE
      count++;
    }

  });

});




