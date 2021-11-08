

$(document).ready(function () {
    $('#siblingdetails').hide();
});
$('#numberofsiblings').change(function() {
   if(parseInt($('#numberofsiblings').val())>0){
       $('#siblingdetails').show();
   }
   else{
    $('#siblingdetails').hide();
   }

});

function siblingError(){
    $('#siblingError').html("Mismatch in sibling count");
}

$('#profession').change(function() {
    if($('#profession').val()=="Other"){
    }
    else{
    }
 
 });
