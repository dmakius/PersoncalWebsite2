export default class Register {
  static register(){
    const form = document.querySelector('form')     
    form.addEventListener('submit', async (e) => {
      console.log("submitting form");
      console.log($("#username").val());
      console.log($("#password").val());
      e.preventDefault();
      this.sendRequest();
  });
}
 static sendRequest(){
    $.ajax({
      type: "POST",
      url: '/user/create',
      data:{
        username: $("#username").val(),
        password: $("#password").val()
      },
      success: function(response){
          console.log(response);
          window.location.href ='/admin';
      },   error: function(error) {
            console.log("ERROR");
            console.log("RESPONSE  FROM SERVER:");
            console.log(error.responseJSON.message);
            var div = document.createElement("div");
            div.id= "test1";
            div.innerHTML = `<br>
              <div class="alert ${error.responseJSON.flash_type}">
              ${error.responseJSON.message}.
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" style="float:right;">
              </button>
              </div>`
          
            $("#flashAlert").prepend(div);
            console.log(div);
          
      }});
    }
}