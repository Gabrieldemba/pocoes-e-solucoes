/*
  Este arquivo controla a página administrativa.

  Aqui fazemos:
  - listagem das poções;
  - cadastro de nova poção;
  - remoção de poção.
*/

const potionForm = document.getElementById("potion-form");
const adminPotionsList = document.getElementById("admin-potions-list");
const adminMessage = document.getElementById("admin-message");

/*
  Mostra mensagens de sucesso ou erro na tela.
*/
function showMessage(text, type = "success") {
  adminMessage.textContent = text;
  adminMessage.className = `admin-message ${type}`;

  setTimeout(() => {
    adminMessage.textContent = "";
    adminMessage.className = "admin-message";
  }, 3500);
}

/*
  Formata o preço para exibição.
*/
function formatPrice(price) {
  return `${Number(price).toLocaleString("pt-BR")} moedas`;
}

/*
  Carrega as poções na tabela administrativa.
*/
async function loadAdminPotions() {
  try {
    const potions = await getPotions();

    adminPotionsList.innerHTML = "";

    if (potions.length === 0) {
      adminPotionsList.innerHTML = `
        <tr>
          <td colspan="5">Nenhuma poção cadastrada.</td>
        </tr>
      `;
      return;
    }

    potions.forEach((potion) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>
          <img src="${potion.image}" alt="Imagem da ${potion.name}" class="admin-thumb">
        </td>
        <td>${potion.name}</td>
        <td>${potion.description}</td>
        <td>${formatPrice(potion.price)}</td>
        <td>
          <button class="danger-button" type="button" data-id="${potion.id}">
            Remover
          </button>
        </td>
      `;

      adminPotionsList.appendChild(row);
    });

    /*
      Depois que as linhas são criadas, adicionamos o evento de clique
      em todos os botões de remover.
    */
    const deleteButtons = document.querySelectorAll(".danger-button");

   deleteButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const id = button.dataset.id;

    /*
      Agora a remoção acontece diretamente, sem abrir a confirmação padrão do navegador.
    */
    try {
      await deletePotion(id);
      showMessage("Poção removida com sucesso!", "success");
      await loadAdminPotions();
    } catch (error) {
      showMessage(error.message, "error");
    }
  });
});
  } catch (error) {
    showMessage("Erro ao carregar poções.", "error");
  }
}

/*
  Captura o envio do formulário de cadastro.
*/
potionForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(potionForm);

  const potion = {
    name: formData.get("name").trim(),
    description: formData.get("description").trim(),
    image: formData.get("image").trim(),
    price: Number(formData.get("price")),
  };

  /*
    Validação no frontend.
    O backend também valida, mas validar no frontend melhora a experiência.
  */
  if (!potion.name || !potion.description || !potion.image || !potion.price) {
    showMessage("Preencha todos os campos.", "error");
    return;
  }

  if (potion.price <= 0) {
    showMessage("O preço deve ser maior que zero.", "error");
    return;
  }

  try {
    await createPotion(potion);

    showMessage("Poção cadastrada com sucesso!", "success");

    potionForm.reset();

    await loadAdminPotions();
  } catch (error) {
    showMessage(error.message, "error");
  }
});

loadAdminPotions();