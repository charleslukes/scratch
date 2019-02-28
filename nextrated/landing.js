//Validating admin Login

$('#landSubmit').click(function(ev){
    ev.preventDefault();
    
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/admin',
        success: function(newData){
        if(newData.email == $('#exampleInputEmail1').val() && newData.password == $('#exampleInputPassword1').val()){
            window.location = "index.html";
        }
        else{
            alert("Incorrect email or password");
        }
        
        },
        error: function(){
            alert("error loading data");
        }
    });
})