$(document).ready(function(){

    // Trava se o usuario nao estiver logado
    var usuario = sessionStorage.getItem('usuario');
    //console.log(usuario);
    if(usuario==null){ 
        location.href="login.html";
    }

    // Atualiza data hora
    function exibeData(){

        console.log("altera data");

        var dia = new Date();

        var mes = dia.getMonth()+1;

        var dataFormatada = dia.getDate()+"/"+mes+"/"+dia.getFullYear()+" "+dia.getHours()+":"+dia.getMinutes()+":"+dia.getSeconds();

        $("#data-hora").html(dataFormatada); // equivalente ao innerHTML
    
    }
    setInterval(exibeData,500);

    // Botao logout
    $("#btn-logout").click(function(){
        sessionStorage.setItem("logado","erro");
        sessionStorage.clear();
        location.href="login.html";
    });

});


