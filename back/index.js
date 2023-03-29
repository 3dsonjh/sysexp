const express = require('express')
const app = express()
const port = 3000
const csv = require('node-csv').createParser();

const sha1 = require('sha1');


const multer = require('multer');
const upload = multer({ dest: 'fotos/' })

var cors = require('cors')
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extension:true}));

//Conectando no MongoDB
const mongodb = require('mongodb');
const { json } = require('express');

const url_mongo = "mongodb+srv://3dsonjh:abc12345678@cluster0.zdu5eur.mongodb.net/?retryWrites=true&w=majority";

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


// Exportando um CSV
app.get('/estoque-csv', async function(req,res){
    const resultado = await estoque.find({}).toArray(); // await
    //res.json(resultado);

    let arquivoCSV = "id,nota,destino,produto,quantidade\n";

    resultado.forEach(function(item){
        arquivoCSV += item._id+","+item.nota+","+item.destino+","+item.produto+","+item.quantidade+"\n";
    });
    
    res.append("content-type","text/csv");
    res.send(arquivoCSV);
});

// Adicionando Registros no Banco
app.post('/estoque-add', upload.single('fotos') ,async function(req,res){

    res.json(req.file);

    const resultado = await estoque.insertOne(req.body)
    //res.json(req.body); // imprime variaveis
    //res.json(resultado); // imprime resultado
    const origem = req.get('Referer');
    res.redirect(origem);
});

// Alterando Registros no Banco
app.post("/estoque-up", async function(req,res){
    //res.json(req.body);
    const codigo = new ObjectId(req.body.codigo);
    const dados={
        $set : {
            nota:       req.body.nota,
            produto:    req.body.produto,
            quantidade: req.body.quantidade,
            destino:    req.body.destino
        }
    };
    const resultado = await estoque.updateOne({_id: codigo}, dados);
    const origem = req.get('Referer');
    res.redirect(origem);
});

// Apagando do banco
app.get('/estoque-del/:id',async function(req,res){
    const id = new ObjectId(req.params.id);
    const resultado = await estoque.deleteOne({_id: id});
    //res.json(resultado); 
    const origem = req.get('Referer');
    res.redirect(origem);
});


app.get('/estoque/:id', async function(req,res){
    const id = new ObjectId(req.params.id);
    //const resultado = await estoque.find({_id: id}).toArray();
    const resultado = await estoque.findOne({_id: id});
    res.json(resultado); 
});


app.post('/login', async function(req,res){

    var usuario = req.body.email;
    var senha = req.body.senha;

    var hash = sha1(senha);

    //res.send(hash);

    const usuarios = conexao.db("sysexp").collection("usuarios");

    var logado = await usuarios.findOneAndUpdate(
    {
        _id: usuario,
        senha: hash 
    }
    ,{
        $currentDate : {ultimo_login:true}
    });

    //res.json(logado);

    if (logado.value != null) { 
        res.send({ status: "ok"}); 
    }
    else {
        res.send({ status: "erro", "mensagem": "usuario ou senha não encontrados"}); 
    }
    

    /*if (usuario=='edir' && senha=='123'){
        res.send({status:"ok"});
    } else {
        res.send({status:"erro","mensagem":"Usuário ou senha não encontrados"});
    }*/

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