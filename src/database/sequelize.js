import { Sequelize } from "sequelize";

/*
  Aqui criamos a conexão com o banco SQLite em memória.

  Como o banco está em memória, ele não salva os dados em arquivo.
  Isso significa que, sempre que o servidor reiniciar, os dados voltam ao estado inicial.
*/
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  logging: false,
});

export default sequelize;