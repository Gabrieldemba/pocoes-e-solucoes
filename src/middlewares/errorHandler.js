/*
  Middleware de tratamento de erros.

  Se algum erro inesperado acontecer em uma rota,
  ele será tratado aqui para evitar que o servidor quebre sem resposta.
*/
export function errorHandler(error, req, res, next) {
  console.error(error);

  return res.status(500).json({
    message: "Erro interno no servidor.",
  });
}