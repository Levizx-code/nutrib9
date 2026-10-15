const vitaminas = [
  {
    nome: "Vitamina B1",
    nomeCompleto: "Tiamina",
    icone: "🌾",
    categorias: ["energia", "sistema nervoso"],
    funcao: "Ajuda a transformar alimentos em energia e contribui para o funcionamento do sistema nervoso.",
    fontes: "Cereais integrais, feijão, sementes e carne suína.",
    deficiencia: "A deficiência pode causar cansaço e alterações neurológicas.",
    observacao: "Uma alimentação variada ajuda a fornecer tiamina."
  },
  {
    nome: "Vitamina B2",
    nomeCompleto: "Riboflavina",
    icone: "🥛",
    categorias: ["energia"],
    funcao: "Participa do metabolismo energético e de diversas reações celulares.",
    fontes: "Leite, ovos, carnes, amêndoas e vegetais verdes.",
    deficiencia: "Pode causar rachaduras nos cantos da boca e alterações na pele.",
    observacao: "A deficiência é mais provável em algumas situações de alimentação inadequada."
  },
  {
    nome: "Vitamina B3",
    nomeCompleto: "Niacina",
    icone: "🥜",
    categorias: ["energia", "sistema nervoso"],
    funcao: "Contribui para a produção de energia e o funcionamento das células.",
    fontes: "Frango, peixe, amendoim, carnes e cereais integrais.",
    deficiencia: "A deficiência grave pode causar pelagra, com alterações na pele, diarreia e sintomas neurológicos.",
    observacao: "Suplementos em doses elevadas podem causar efeitos adversos."
  },
  {
    nome: "Vitamina B5",
    nomeCompleto: "Ácido pantotênico",
    icone: "🍄",
    categorias: ["energia"],
    funcao: "Ajuda no metabolismo de gorduras, proteínas e carboidratos.",
    fontes: "Ovos, carnes, cogumelos, leguminosas e cereais integrais.",
    deficiencia: "A deficiência é rara, mas pode estar associada a cansaço e sensações anormais.",
    observacao: "Está presente em muitos alimentos."
  },
  {
    nome: "Vitamina B6",
    nomeCompleto: "Piridoxina",
    icone: "🍌",
    categorias: ["energia", "sistema nervoso"],
    funcao: "Participa do metabolismo das proteínas, da formação da hemoglobina e de substâncias do sistema nervoso.",
    fontes: "Banana, batata, peixe, frango e grão-de-bico.",
    deficiencia: "Pode causar anemia, alterações na pele e sintomas neurológicos.",
    observacao: "Doses elevadas de suplementos por períodos prolongados podem lesionar os nervos."
  },
  {
    nome: "Vitamina B7",
    nomeCompleto: "Biotina",
    icone: "🥚",
    categorias: ["energia"],
    funcao: "Ajuda enzimas envolvidas no metabolismo de gorduras, carboidratos e proteínas.",
    fontes: "Ovos cozidos, castanhas, sementes, carnes e leguminosas.",
    deficiencia: "É rara; pode causar queda de cabelo e alterações na pele.",
    observacao: "Suplementos de biotina podem interferir em alguns exames laboratoriais."
  },
  {
    nome: "Vitamina B9",
    nomeCompleto: "Folato / ácido fólico",
    icone: "🥬",
    categorias: ["energia"],
    funcao: "É necessária para a formação do DNA e das células sanguíneas.",
    fontes: "Folhas verdes, feijão, lentilha, abacate e farinhas enriquecidas.",
    deficiencia: "Pode causar anemia. Durante a gestação, a deficiência aumenta o risco de defeitos do tubo neural.",
    observacao: "Quem planeja engravidar deve buscar orientação sobre ácido fólico."
  },
  {
    nome: "Vitamina B12",
    nomeCompleto: "Cobalamina",
    icone: "🐟",
    categorias: ["energia", "sistema nervoso"],
    funcao: "Contribui para a formação das células sanguíneas, a produção de DNA e a saúde dos nervos.",
    fontes: "Peixes, carnes, ovos, leite e alimentos fortificados com B12.",
    deficiencia: "Pode causar anemia, formigamento e alterações neurológicas.",
    observacao: "Pessoas veganas precisam de uma fonte confiável de B12, como alimentos fortificados ou suplementação orientada."
  }
];

const lista = document.getElementById("lista-vitaminas");
const pesquisa = document.getElementById("pesquisa");
const botoes = document.querySelectorAll(".filter");

let filtroAtual = "todas";

function criarCartao(vitamina, indice) {
  return `
    <article class="card">
      <div class="card-icon">${vitamina.icone}</div>

      <h3>${vitamina.nome}</h3>
      <p><strong>${vitamina.nomeCompleto}</strong></p>

      <p>
        <strong>Função:</strong>
        ${vitamina.funcao}
      </p>

      <p>
        <strong>Fontes alimentares:</strong>
        ${vitamina.fontes}
      </p>

      <button
        class="more-btn"
        type="button"
        aria-expanded="false"
        aria-controls="detalhes-${indice}"
        data-indice="${indice}"
      >
        Ver mais informações +
      </button>

      <div class="details" id="detalhes-${indice}" hidden>
        <p>
          <strong>Possíveis sinais de deficiência:</strong>
          ${vitamina.deficiencia}
        </p>

        <p>
          <strong>Observação:</strong>
          ${vitamina.observacao}
        </p>
      </div>
    </article>
  `;
}

function renderizarVitaminas() {
  const termo = pesquisa.value
    .trim()
    .toLocaleLowerCase("pt-BR");

  const encontradas = vitaminas.filter((vitamina) => {
    const texto = [
      vitamina.nome,
      vitamina.nomeCompleto,
      vitamina.funcao,
      vitamina.fontes,
      vitamina.deficiencia,
      vitamina.observacao
    ].join(" ").toLocaleLowerCase("pt-BR");

    const correspondeBusca = texto.includes(termo);

    const correspondeFiltro =
      filtroAtual === "todas" ||
      vitamina.categorias.includes(filtroAtual);

    return correspondeBusca && correspondeFiltro;
  });

  if (encontradas.length === 0) {
    lista.innerHTML = `
      <div class="empty">
        Nenhuma vitamina encontrada.
        Tente pesquisar outro termo.
      </div>
    `;
    return;
  }

  lista.innerHTML = encontradas
    .map((vitamina) => {
      const indice = vitaminas.indexOf(vitamina);
      return criarCartao(vitamina, indice);
    })
    .join("");
}

botoes.forEach((botao) => {
  botao.addEventListener("click", () => {
    filtroAtual = botao.dataset.filter;

    botoes.forEach((item) => {
      item.classList.toggle("active", item === botao);
    });

    renderizarVitaminas();
  });
});

pesquisa.addEventListener("input", renderizarVitaminas);

lista.addEventListener("click", (evento) => {
  const botao = evento.target.closest(".more-btn");

  if (!botao) return;

  const indice = botao.dataset.indice;
  const detalhes = document.getElementById(`detalhes-${indice}`);

  detalhes.hidden = !detalhes.hidden;

  botao.setAttribute(
    "aria-expanded",
    String(!detalhes.hidden)
  );

  botao.textContent = detalhes.hidden
    ? "Ver mais informações +"
    : "Ocultar informações −";
});

renderizarVitaminas();