import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/upload";
//Rota = conjunto
//Recurso = usuario
//Metodos http = GET, POST, PUT, DELETE
//Parâmetros

//GET = Buscar uma informação
//POST = Criando uma informação nova
//PUT = Editando uma informação
//DELETE = Deletando uma informação
import OrphanagesController from "./controllers/OrphanagesController";

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/orphanages", OrphanagesController.index);
routes.get("/orphanages/:id", OrphanagesController.show);
routes.post("/orphanages", upload.array("images"), OrphanagesController.create);

export default routes;
