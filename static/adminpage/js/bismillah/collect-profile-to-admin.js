
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
    url: "http://127.0.0.1:8000/api/user/adminsdashboard/?gender="+gender,
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
          age = 22
           $('#femaleMembers').append( "<div class='col-md-3 grid-margin stretch-card'>\
						<div class='card p-3'>\
                            <img class='card-img-top rounded img-size mx-auto' src='"+obj[i].image["medium_square_crop"]+"' alt='Card image cap'>\
							<div class='card-body'>\
								<div class=''>\
                                    <div class=' mt-xl-0 '>\
										<h6 class='text-success'>"+obj[i].nmId+"</h6>\
										<h6 class='mb-0'>Edward</h6> \
										<p class='text-muted mb-1 ph-num'> 9656248731 </p>\
										<p class='text-muted mb-1 ph-num'>example@Gmail.com</p>\
										<p class='mb-0 text-success font-weight-bold'>"+age+"</p>\
										<p class='mb-0 text-success font-weight-bold'>Married</p>\
										<p class='mb-0 text-success font-weight-bold'>BSC computer Science</p>\
										<p class='mb-0 text-success font-weight-bold'>Developer</p>\
										<p class='mb-0 text-success font-weight-bold'>Calicut</p>\
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