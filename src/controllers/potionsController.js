import Potion from "../models/Potion.js";

/*
  Controller responsável pelas operações das poções.

  A ideia do controller é separar a lógica da aplicação das rotas.
  Assim, as rotas ficam mais limpas e o código fica mais organizado.
*/

/*
  GET /api/potions

  Lista todas as poções cadastradas.
*/
export async function listPotions(req, res, next) {
  try {
    const potions = await Potion.findAll({
      order: [["id", "ASC"]],
    });

    return res.status(200).json(potions);
  } catch (error) {
    next(error);
  }
}

/*
  POST /api/potions

  Cadastra uma nova poção.
*/
export async function createPotion(req, res, next) {
  try {
    const { name, description, image, price } = req.body;

    /*
      Validação simples.

      Antes de salvar no banco, verificamos se todos os campos obrigatórios
      foram enviados.
    */
    if (!name || !description || !image || price === undefined) {
      return res.status(400).json({
        message: "Nome, descrição, imagem e preço são obrigatórios.",
      });
    }

    /*
      Convertendo o preço para número.

      Como dados vindos de formulário podem chegar como texto,
      fazemos essa conversão para garantir que o preço será numérico.
    */
    const numericPrice = Number(price);

    if (Number.isNaN(numericPrice) || numericPrice <= 0) {
      return res.status(400).json({
        message: "O preço deve ser um número maior que zero.",
      });
    }

    const potion = await Potion.create({
      name,
      description,
      image,
      price: numericPrice,
    });

    return res.status(201).json(potion);
  } catch (error) {
    next(error);
  }
}

/*
  DELETE /api/potions/:id

  Remove uma poção pelo ID.
*/
export async function deletePotion(req, res, next) {
  try {
    const { id } = req.params;

    const potion = await Potion.findByPk(id);

    if (!potion) {
      return res.status(404).json({
        message: "Poção não encontrada.",
      });
    }

    await potion.destroy();

    return res.status(200).json({
      message: "Poção removida com sucesso.",
    });
  } catch (error) {
    next(error);
  }
}