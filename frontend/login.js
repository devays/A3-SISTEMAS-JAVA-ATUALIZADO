const form = document.querySelector("form");
const emailInput = document.getElementById("email");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailInput.value;

  // Enviar a solicitação POST para o backend
  const response = await fetch("http://localhost:8080/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (data.exists) {
    // E-mail existe no banco de dados, redirecionar para a página index.html
    window.location.href = "index.html";
  } else {
    // E-mail não encontrado, exibir alerta de erro
    alert("E-mail não encontrado.");
  }
});