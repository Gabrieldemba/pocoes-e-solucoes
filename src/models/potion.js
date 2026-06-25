import { DataTypes } from "sequelize";
import sequelize from "../database/sequelize.js";

/*
  Este é o model Potion.

  Um model representa uma tabela do banco de dados.
  Neste caso, estamos criando a tabela de poções.

  Cada poção terá:
  - name: nome da poção
  - description: descrição da poção
  - image: URL ou caminho da imagem
  - price: preço da poção
*/
const Potion = sequelize.define(
  "Potion",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "potions",
  }
);

export default Potion;