export default class Login{
  static login(){ 
    const form = document.querySelector('form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault()
      console.log("submitting form");
      console.log($("#username").val());
      console.log($("#password").val());
      this.sendRequest();
    });
  }

  static sendRequest(){
    $.ajax({
      type: "POST",
      url: '/user/login',
      data:{
        username: $("#username").val(),
        password: $("#password").val()
      },
      success: function(response){
          console.log("RESPONSE  FROM SERVER:");
          console.log(response);
          window.location.href ='/admin';
      },   error: function(error) {
            console.log("ERROR  FROM SERVER:");
            console.log(error);
            console.log(error.responseJSON.message);
            var div = document.createElement("div");
            div.id= "test1"
            div.innerHTML = `
              <br>
              <div class="alert ${error.responseJSON.flash_type}">
              ${error.responseJSON.message}.
              <button type="button" class="close btn-close" data-bs-dismiss="alert" aria-label="Close" style="float:right;">
  
              </button>
              </div>
              `;
            $("#flashAlert").prepend(div);
            console.log(div);
      }
  });   
  }
} 
