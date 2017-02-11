function getQuestion()
{     
     
     $.ajax({
    url: baseUrl+'RecoverPasswordServlet?userName='+$("#username").val(),
    type: 'GET',
    success: function(data){ 
        $("#question").text(data);
    },
    error: function(data) {
        
        var text = data.responseText.split("<")[0];
         $("#question").text(text);
    }
});


};


function resetPassword()
{

     if($("#answer").val() === "" || $("#new_password").val()==="")
     {
         alertDialog("Reset Password", "Password Recovery Answer and New Password are both required");
         return false;
     }
     var success=false;
      $.ajax({
    url: baseUrl+'json?action=recoverpassword&userName='+$("#username").val()+'&newPassword='+$("#new_password").val()+'&pwdQuestion='+$("#question").text()+'&pwdAnswer='+$("#answer").val(),
    type: 'GET',
    success: function(data){ 
        if(data.response === "success")
        {
                alertDialog("Reset Password", "Your password has been changed.  Click Ok to return to the login screen.");
                window.location = "index.html";

            

        }
        else
        {
                alertDialog("Reset Password", "We were unable to change your password.  Please verify your Password Recovery Answer");
        } 
        
    }
    ,
    error: function(data) {
       alertDialog("Reset Password", "We were unable to change your password.  Please verify your Password Recovery Answer");
    }
    
    
});


    

}
