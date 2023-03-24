$(function() { // ou $(document).ready(function(){

    // click btn-carregar
    //$("#btn-carregar").click(function(){
    //console.log("clicou");
    var url = "http://localhost:3000/estoque";
    $.getJSON(url,function(dados){
        console.log(dados);
        //$("#listagem").html("");
        $("#listagem").empty();
        dados.forEach(function(item,index){
            var linha = "<tr>";
            //linha += "<td>"+item._id+"</td>";
            linha += "<td>"+(index+1)+"</td>";
            linha += "<td>"+item.nota+"</td>";
            linha += "<td>"+item.produto+"</td>";
            linha += "<td>"+item.quantidade+"</td>";
            linha += "<td>"+item.destino+"</td>";
            linha += '<td><a href="http://localhost:3000/estoque-del/'+item._id+'" class="btn btn-danger btn-sm"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16"><path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/></svg></a></td>';
            linha += "</tr>";
            //$("#listagem").html($("#listagem").html()+linha);
            //adiciona linha no html
            $("#listagem").append(linha);
        });
    });

    //});
    // fim click btn-carregar

    $("#btn-exportar").tooltip();


});