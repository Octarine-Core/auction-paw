function login(){
    var formData = JSON.stringify({email: $('#email').val(), password: $('#password').val()});
  
    $.ajax({
        type: 'POST',
        url: '/login',
        data: formData,
        success:function(){
          window.location.replace('/me')
        },
        dataType: 'json',
        contentType : 'application/json'})
}