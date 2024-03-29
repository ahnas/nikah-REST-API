function ChatWithUser(id) {
  getchat(id);
}
function getchat(id) {
  $.ajax({
    url: "http://127.0.0.1:8000/api/user/getchats/?chatuser=" + id,
    type: "GET",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Token " + localStorage.getItem("token")
      );
    },
    statusCode: {
      404: function (response) {
        createChat(id);
      },
      200: function (response) {
        window.location = "http://127.0.0.1:8000/chat-direct/?id=" + id;
      },
    },
  });
}

function createChat(id){
  data={
    "chat_user_two":id,
  }
$.ajax({
  url: "http://127.0.0.1:8000/api/user/getchats/",
  type: "POST",
  data: data,
  beforeSend: function (xhr) {
    xhr.setRequestHeader(
      "Authorization",
      "Token " + localStorage.getItem("token")
    );
  },
  statusCode: {
    400: function (response) { 
    },
    500: function (response) { 
      window.location = "http://127.0.0.1:8000/chat-direct/?id=" + id;  
    },
    201: function (response) {
      window.location = "http://127.0.0.1:8000/chat-direct/?id=" + id;
    },
  },
});
}
