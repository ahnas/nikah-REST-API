function collectdata() {
            event.preventDefault();
            var csrf_token1 = $('[name="csrfmiddlewaretoken"]').val();
            var got_married_with_serv = $('#got_married_with_serv').prop('checked');
            var got_married_out = $('#got_married_out').prop('checked');
            var no_pro_match = $('#no_pro_match').prop('checked');
            var other_reason = $('#other_reason').prop('checked');
            var not_satisfied = $('#exampleCheck1').prop('checked');
            var not_satisfied_reason = $('#exampleInputPassword1').val();
            data = {
                'got_married_with_serv': got_married_with_serv,
                'got_married_out': got_married_out,
                'no_pro_match': no_pro_match,
                'other_reason': other_reason,
                'not_satisfied': not_satisfied,
                'not_satisfied_reason': not_satisfied_reason,
                csrfmiddlewaretoken: csrf_token1,
            }

            $.ajax({
                url: "http://192.168.1.65:8000/api/user/deletedrecord/",
                type: 'POST',
                dataType: "JSON",
                data: data,
                beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('token')); },
                success: function (response) {

                },

            });
};

