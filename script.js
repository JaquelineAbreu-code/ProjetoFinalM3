document.getElementById("buscar").addEventListener("click", () => {
  const cep = document.getElementById("cep").value.trim();
  const resultado = document.getElementById("resultado");

  resultado.innerHTML = ""; // limpa antes de exibir novo resultado

  if (!cep || cep.length !== 8 || isNaN(cep)) {
    mostrarMensagem("CEP inválido. Digite apenas números (8 dígitos).", true);
    return;
  }

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(res => res.json())
    .then(data => {
      if (data.erro) {
        mostrarMensagem("CEP não encontrado.", true);
      } else {
        const dados = [
          { label: "Endereço", valor: data.logradouro },
          { label: "Bairro", valor: data.bairro },
          { label: "Cidade", valor: `${data.localidade} - ${data.uf}` },
          { label: "CEP", valor: data.cep }
        ];

        dados.forEach(info => {
          const p = document.createElement("p");
          p.classList.add("info");
          p.textContent = `${info.label}: ${info.valor}`;
          resultado.appendChild(p);
        });
      }
    })
    .catch(() => {
      mostrarMensagem("Erro ao buscar dados. Tente novamente.", true);
    });
});

function mostrarMensagem(texto, erro = false) {
  const resultado = document.getElementById("resultado");
  const p = document.createElement("p");
  p.className = "mensagem";
  p.style.color = erro ? "red" : "green";
  p.textContent = texto;
  resultado.appendChild(p);
}
