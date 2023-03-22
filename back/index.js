const express = require('express')
const app = express()
const port = 3000
const csv = require('node-csv').createParser();


//Conectando no MongoDB
const mongodb = require('mongodb');

const url_mongo = "mongodb+srv://3dsonjh:saidai@cluster0.zdu5eur.mongodb.net/?retryWrites=true&w=majority";

const conexao = new mongodb.MongoClient(url_mongo);


// CRUD
// C-Create (Criar) R-Read (Ler) U-Update (Atualizar) D-Delete (Apagar)

app.post('/entradas', function(req,res){
   
});

app.get('/entradas', function(req,res){
    csv.parseFile('estoque.csv', function(erro, valores) {
        res.json(valores);
    });
});

// Route / Rota
app.get('/estoque', async function(req,res){ // Função Assíncrona
    const estoque = conexao.db("sysexp").collection("estoque");
    const resultado = await estoque.find({}).toArray(); // await
    res.json(resultado);
});


app.get('/estoque/:id', function(req,res){
    res.json(req.params.id)
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})