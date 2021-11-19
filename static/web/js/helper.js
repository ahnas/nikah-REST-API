

$(document).ready(function () {
    $('#siblingdetails').hide();

});
$('#numberofsiblings').change(function () {
    if (parseInt($('#numberofsiblings').val()) > 0) {
        $('#siblingdetails').show();
    }
    else {
        $('#siblingdetails').hide();
    }

});

function siblingError() {
    $('#siblingError').html("Mismatch in sibling count");
}

$('#profession').change(function () {
    if ($('#profession').val() == "Other") {
    }
    else {
    }

});

$(document).ready(function () {
    $('#numberodChildren').hide();
    for (var i = 137; i <= 213; i++) {
        $('#height').append("<option value=" + i + ">" + i + " cm  " + (i * 0.0328084).toFixed(1) + " ft</option>")
        $('#editHeight').append("<option value=" + i + ">" + i + " cm  " + (i * 0.0328084).toFixed(1) + " ft</option>")
        
    }
    for (var i = 30; i <= 140; i++) {
        $('#weight').append("<option value=" + i + ">" + i + " Kg </option>")
        $('#editweight').append("<option value=" + i + ">" + i + " Kg </option>")

    }
    $('#martialStatus').change(function () {
        if ($(this).val() != 'Never Married') {
            $('#numberodChildren').show();
        }
        else {
            $('#numberodChildren').hide();
        }
    });
});
