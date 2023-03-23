$(function() { // ou $(document).ready(function(){

    // click btn-carregar
    $("#btn-carregar").click(function(){
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
                linha += "</tr>";
                //$("#listagem").html($("#listagem").html()+linha);
                $("#listagem").append(linha);
            });
        });

    });
    // fim click btn-carregar

});