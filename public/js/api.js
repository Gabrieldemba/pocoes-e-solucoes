/*
  Este arquivo concentra as chamadas para o backend.

  Assim, se a URL da API mudar no futuro, você altera apenas aqui.
*/

const API_URL = "/api/potions";

/*
  Busca todas as poções cadastradas.
*/
async function getPotions() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Erro ao buscar poções.");
  }

  return response.json();
}

/*
  Cadastra uma nova poção.
*/
async function createPotion(potion) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(potion),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao cadastrar poção.");
  }

  return data;
}

/*
  Remove uma poção pelo ID.
*/
async function deletePotion(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao remover poção.");
  }

  return data;
}