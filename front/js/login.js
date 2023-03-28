$(document).ready(function(){

    $("#alert-login").hide();

    $("#btn-entrar").click(function(){

        $("#alert-login").hide();

        var url="http://localhost:3000/login";

        var form = {
            email: $("#email").val(),
            senha: $("#senha").val()
        };

        $.post(url,form, function(retorno){
            console.log(retorno);
            if(retorno.status=="erro"){
                $("#alert-login").show();
            } else {
                sessionStorage.setItem("usuario","logado");
                location.href = "index.html";
            }
        });
    });
});