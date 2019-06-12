function login(){
    var formData = JSON.stringify({email: $('#email').val(), password: $('#password').val()});
  
    $.post({
        type: 'POST',
        url: '/login',
        data: formData,
        success:function(data){
          $( "html" ).html( data );
        },
        dataType: 'json',
        contentType : 'application/json'})
};