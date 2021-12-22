
$(document).ready(function () {

    $("form[name='password_reset']").validate({ // initialize the plugin
        rules: {
            inputPassword: {
                required: true,
                minlength: 6,
            },
            newpass: {
                required: true,
                minlength: 6,
            },
            newpassconf: {
                required: true,
                minlength: 6,
                equalTo: newpass,
            },
        },
        messages: {
            inputPassword: {
                required: "Enter the Password",
                minlength: "Minimum 6 Charecters",
            },
            newpass: {
                required: "Enter the Password",
                minlength: "Minimum 6 Charecters",
                equalTo: "Password Missmatch",
            },
            newpassconf: {
                required: "Enter the Password",
                minlength: "Minimum 6 Charecters",
                equalTo: "Password Missmatch",
            },
        },
        submitHandler: function () {
            event.preventDefault();
            var csrf_token1 = $('[name="csrfmiddlewaretoken"]').val();
            var inputPassword = $('#inputPassword').val();
            var newpass = $('#newpass').val();

            data = { 'password': inputPassword, 'newPassword': newpass, csrfmiddlewaretoken: csrf_token1 }

            $.ajax({
                url: "http://127.0.0.1:8000/api/user/ResetPasswordView/",
                type: 'POST',
                dataType: "JSON",
                data: data,
                beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('token')); },
                success: function (response) {
                    localStorage.removeItem('token');
                    window.location.href = "http://127.0.0.1:8000/";
                },
                error: function (jqXHR) {
                    $('#error').html("Invalid Password");
                }
            });
        }
    });

});
