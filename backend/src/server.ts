import express from 'express';
import './database/connection';

const app = express();

app.use(express.json());

//Rota = conjunto
//Recurso = usuario
//Metodos http = GET, POST, PUT, DELETE
//Parâmetros

//GET = Buscar uma informação
//POST = Criando uma informação nova
//PUT = Editando uma informação
//DELETE = Deletando uma informação 

app.get("/users", (req, res) => {
    return res.json({"error": "Não sei"})
});

app.listen(3333);