
$(document).ready(function(){
$.ajax({
    url: "http://127.0.0.1:8000/api/user/deletedrecordviewadmin",
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
            var feedback=obj[i].not_satisfied_reason
            var marriedOut=obj[i].got_married_out
            var marriedWithNM=obj[i].got_married_with_serv
            var notSatisfied=obj[i].not_satisfied

            var marriedwith=''
            if (marriedWithNM){
                marriedwith='Married With Nikah Malabar'
            }
            else if(marriedOut){
                marriedwith='Got Married from other source'
            }
            if (notSatisfied){
                marriedwith='Married With Nikah Malabar'
            }
            var html=''
            html+="<div class='col-md-3 grid-margin stretch-card'>"
            html+="<div class='card p-3'>"
            html+="<div class='card-body'>"
            html+="  <div class=''>"
            html+="  <div class=''>"
            html+=" <div class=' mt-xl-0 '>"
            html+="<h6 class='text-success'>"+obj[i].name+"</h6>"
            html+="<h6 class='mb-0'>"+obj[i].gender+"</h6>"
            html+="<p class='text-muted mb-1 ph-num'>"+obj[i].phoneNumber+"</p>"
            html+="<p class='text-muted mb-1 ph-num'>"+marriedwith+"</p>"
            
            if(notSatisfied){
                html+="<p class='text-muted mb-1 ph-num'> Not Satisfied With Nikah Malabar</p>"
            }
            html+="<p class='text-muted mb-1 ph-num'>"+obj[i].not_satisfied_reason+"</p>"
            html+="</div>"
            html+="</div>"
            html+="</div>"
            html+="</div>"
            html+="</div>"

            $('#deletedProfiles').append(html)
        }    
    },
    error: function (jqXHR,responseText) {
      if (jqXHR.status == 403) {
        
      } else {
      }
    },
  });});

