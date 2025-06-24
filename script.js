document.getElementById("buscar").addEventListener("click", () => {
  const cep = document.getElementById("cep").value.trim();
  const resultado = document.getElementById("resultado");

  // Limpa resultado anterior
  resultado.innerHTML = "";

  if (!cep || cep.length !== 8 || isNaN(cep)) {
    resultado.innerHTML = "<p style='color:red;'>CEP inválido. Digite apenas números (8 dígitos).</p>";
    return;
  }

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())
    .then(data => {
      if (data.erro) {
        resultado.innerHTML = "<p style='color:red;'>CEP não encontrado.</p>";
      } else {
        resultado.innerHTML = `
          <p>Endereço: ${data.logradouro}</p>
          <p>Bairro: ${data.bairro}</p>
          <p>Cidade: ${data.localidade} - ${data.uf}</p>
          <p>CEP: ${data.cep}</p>
        `;
      }
    })
    .catch(error => {
      resultado.innerHTML = "<p style='color:red;'>Erro ao buscar dados. Tente novamente.</p>";
    });
});
