/*
  Este arquivo controla a página inicial.

  Quando a página abre, buscamos as poções no backend
  e criamos os cards dinamicamente com JavaScript.
*/

const potionsContainer = document.getElementById("potions-container");
const loadingMessage = document.getElementById("loading-message");

/*
  Formata o preço para aparecer com o texto "moedas".
*/
function formatPrice(price) {
  return `${Number(price).toLocaleString("pt-BR")} moedas`;
}

/*
  Cria o HTML de um card de poção.
*/
function createPotionCard(potion) {
  const card = document.createElement("article");
  card.classList.add("potion-card");

  card.innerHTML = `
    <div class="potion-image-wrapper">
      <img src="${potion.image}" alt="Imagem da ${potion.name}" class="potion-image">
    </div>

    <div class="potion-content">
      <h3>${potion.name}</h3>
      <p>${potion.description}</p>

      <div class="potion-footer">
        <strong>${formatPrice(potion.price)}</strong>
        <button class="buy-button" type="button">Comprar</button>
      </div>
    </div>
  `;

  /*
    a funcionalidade de compra não foi implementada.
    Então coloquei apenas uma mensagem simples.
  */
  const buyButton = card.querySelector(".buy-button");

  buyButton.addEventListener("click", () => {
    alert(`A compra de "${potion.name}" estará disponível em breve!`);
  });

  return card;
}


 // Renderiza todas as poções na tela.

async function loadPotions() {
  try {
    const potions = await getPotions();

    potionsContainer.innerHTML = "";

    potions.forEach((potion) => {
      const card = createPotionCard(potion);
      potionsContainer.appendChild(card);
    });
  } catch (error) {
    potionsContainer.innerHTML = `
      <p class="error-message">
        Não foi possível carregar as poções. Tente novamente mais tarde.
      </p>
    `;
  } finally {
    loadingMessage.style.display = "none";
  }
}

loadPotions();