import { Router } from "express";
import {
  createPotion,
  deletePotion,
  listPotions,
} from "../controllers/potionsController.js";

/*
  Aqui criamos as rotas relacionadas às poções.

  Cada rota aponta para uma função do controller.
*/
const potionsRoutes = Router();

potionsRoutes.get("/", listPotions);
potionsRoutes.post("/", createPotion);
potionsRoutes.delete("/:id", deletePotion);

export default potionsRoutes;