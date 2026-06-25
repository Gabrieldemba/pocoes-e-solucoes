import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import sequelize from "./database/sequelize.js";
import "./models/Potion.js";
import { seedPotions } from "./seed/potionsSeed.js";
import potionsRoutes from "./routes/potionsRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

/*
  Como estamos usando ES Modules, precisamos dessas duas linhas
  para conseguir trabalhar com caminhos de arquivos.
*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

/*
  Middlewares principais.

  express.json() permite que a API receba JSON no corpo das requisições.
  cors() permite requisições entre frontend e backend.
*/
app.use(cors());
app.use(express.json());

/*
  Servindo arquivos estáticos.

  Tudo que estiver dentro da pasta public poderá ser acessado pelo navegador.
  Exemplo:
  - public/index.html vira http://localhost:3000/
  - public/admin.html vira http://localhost:3000/admin.html
*/
app.use(express.static(path.join(__dirname, "../public")));

/*
  Rotas da API.

  Todas as rotas de poções começam com /api/potions.
*/
app.use("/api/potions", potionsRoutes);

/*
  Middleware de erro.
*/
app.use(errorHandler);

/*
  Função responsável por iniciar banco e servidor.
*/
async function startServer() {
  try {
    /*
      O sync cria as tabelas no banco com base nos models.
    */
    await sequelize.sync({ force: true });

    /*
      Populando o banco inicial.
    */
    await seedPotions();

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
      console.log(`Página pública: http://localhost:${PORT}`);
      console.log(`Admin: http://localhost:${PORT}/admin.html`);
      console.log(`API: http://localhost:${PORT}/api/potions`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
}

startServer();