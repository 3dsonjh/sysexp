const express = require('express')
const app = express()
const port = 3000
const csv = require('node-csv').createParser();

var cors = require('cors')

app.use(cors())


//Conectando no MongoDB
const mongodb = require('mongodb');

const url_mongo = "mongodb+srv://3dsonjh:saidai@cluster0.zdu5eur.mongodb.net/?retryWrites=true&w=majority";

// criando variável da conexão
const conexao = new mongodb.MongoClient(url_mongo);

// criando variável com a collection
const estoque = conexao.db("sysexp").collection("estoque");

// importando modulo ObjectId
const ObjectId = mongodb.ObjectId; // ou require("mongodb").ObjectId;

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
    
    const resultado = await estoque.find({}).toArray(); // await
    res.json(resultado);
});


app.get('/estoque/:id', async function(req,res){
    const id = new ObjectId(req.params.id);
    //const resultado = await estoque.find({_id: id}).toArray();
    const resultado = await estoque.findOne({_id: id});
    res.json(resultado); 
});


app.listen(port, () => {
    console.log(`Rodando o servidor na porta ${port}`)
})

/*
var abc = function () {
    //funcao
}
// ou

var abc = () => {
    //funcao
}
*/