const botao = document.getElementById("btnPesquisar");
const resultado = document.getElementById("resultado");
const campoPesquisa = document.getElementById("nomeJogo");
const filtroAvaliacao = document.getElementById("filtroAvaliacao");
const tituloSecao = document.getElementById("tituloSecao");

const modal = document.getElementById("modal");
const fecharModal = document.getElementById("fecharModal");

let jogosArmazenados = [];
let requisicaoAtual = 0;

campoPesquisa.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        botao.click();
    }
});

filtroAvaliacao.addEventListener("change", function () {
    exibirJogos();
});

fecharModal.addEventListener("click", function () {
    modal.style.display = "none";
});

botao.addEventListener("click", async function () {
    const nomeJogo = campoPesquisa.value.trim();

    if (nomeJogo === "") {
        resultado.textContent = "Por favor, digite o nome de um jogo.";
        return;
    }

    const numeroRequisicao = ++requisicaoAtual;

    tituloSecao.textContent = "Resultados da pesquisa";
    resultado.textContent = "Pesquisando...";
    jogosArmazenados = [];

    try {
        const resposta = await fetch(
            "/api/games?nome=" + encodeURIComponent(nomeJogo)
        );

        if (!resposta.ok) {
            throw new Error("Erro HTTP: " + resposta.status);
        }

        const dados = await resposta.json();

        if (numeroRequisicao !== requisicaoAtual) {
            return;
        }

        jogosArmazenados = dados.results || [];

        if (jogosArmazenados.length === 0) {
            resultado.textContent = "Nenhum jogo encontrado.";
            return;
        }

        exibirJogos();

    } catch (erro) {
        if (numeroRequisicao !== requisicaoAtual) {
            return;
        }

        resultado.textContent = "Erro ao consultar o servidor.";
        console.error(erro);
    }
});

function obterJogosOrdenados() {
    const avaliacaoMinima = Number(filtroAvaliacao.value);

    const jogos = [...jogosArmazenados];

    if (avaliacaoMinima === 0) {
        return jogos;
    }

    return jogos
        .filter(function (jogo) {
            return jogo.rating >= avaliacaoMinima;
        })
        .sort(function (a, b) {
            return a.rating - b.rating;
        });
}

function exibirJogos() {
    const jogosFiltrados = obterJogosOrdenados();

    resultado.innerHTML = "";

    if (jogosFiltrados.length === 0) {
        resultado.textContent = "Nenhum jogo encontrado com essa avaliação.";
        return;
    }

    for (const jogo of jogosFiltrados) {
        const card = document.createElement("div");
        card.className = "card";

        card.addEventListener("click", async function () {
            try {
                const resposta = await fetch("/api/games/" + jogo.id);

                if (!resposta.ok) {
                    throw new Error("Erro HTTP: " + resposta.status);
                }

                const detalhes = await resposta.json();

                const respostaScreenshots = await fetch(
                    "/api/games/" + jogo.id + "/screenshots"
                );

                if (!respostaScreenshots.ok) {
                    throw new Error(
                        "Erro HTTP: " + respostaScreenshots.status
                    );
                }

                const screenshots = await respostaScreenshots.json();

                console.log("Detalhes do jogo:", detalhes);

                const detalhesJogo = document.getElementById("detalhesJogo");

                detalhesJogo.innerHTML = "";

                const titulo = document.createElement("h2");
                titulo.textContent = detalhes.name;

                const imagem = document.createElement("img");
                imagem.src = detalhes.background_image;
                imagem.alt = `Imagem de ${detalhes.name}`;
                imagem.style.width = "100%";

                modal.style.borderRadius = "12px";

                const lancamento = document.createElement("p");
                lancamento.textContent =
                    `Lançamento: ${detalhes.released || "Não informado"}`;

                const avaliacao = document.createElement("p");
                avaliacao.textContent =
                    `Avaliação: ${detalhes.rating ?? "Não informado"}`;

                const desenvolvedores = detalhes.developers
                    ?.map(dev => dev.name)
                    .join(", ") || "Não disponível";

                const desenvolvedoras = document.createElement("p");
                desenvolvedoras.textContent =
                    `Desenvolvedoras: ${desenvolvedores}`;

                const descricao = document.createElement("p");
                descricao.textContent =
                    detalhes.description_raw || "Descrição não disponível.";

                detalhesJogo.appendChild(titulo);

                if (detalhes.background_image) {
                    detalhesJogo.appendChild(imagem);
                }

                detalhesJogo.appendChild(lancamento);
                detalhesJogo.appendChild(avaliacao);
                detalhesJogo.appendChild(desenvolvedoras);
                detalhesJogo.appendChild(descricao);

                const tituloGaleria = document.createElement("h3");
                tituloGaleria.textContent = "Capturas de Tela:";

                const galeria = document.createElement("div");
                galeria.className = "galeria";

                for (const screenshot of screenshots.results || []) {
                    const imagemGaleria = document.createElement("img");

                    imagemGaleria.src = screenshot.image;
                    imagemGaleria.alt =
                        `Captura de tela de ${detalhes.name}`;

                    imagemGaleria.loading = "lazy";

                    galeria.appendChild(imagemGaleria);
                }

                if (galeria.children.length > 0) {
                    detalhesJogo.appendChild(tituloGaleria);
                    detalhesJogo.appendChild(galeria);
                }

                modal.style.display = "flex";

            } catch (erro) {
                console.error("Erro ao buscar detalhes:", erro);
            }
        });

        const conteudo = document.createElement("div");
        conteudo.className = "card-conteudo";

        const generos = jogo.genres
            ?.map(genre => genre.name)
            .join(", ") || "Não disponível";

        const plataformas = jogo.platforms
            ?.map(p => p.platform.name)
            .join(", ") || "Não disponível";

        if (jogo.background_image) {
            const imagem = document.createElement("img");

            imagem.src = jogo.background_image;
            imagem.alt = `Imagem de ${jogo.name}`;
            imagem.loading = "lazy";

            card.appendChild(imagem);
        }

        const titulo = document.createElement("h2");
        titulo.textContent = jogo.name;

        const lancamento = document.createElement("p");
        lancamento.textContent =
            `Lançamento: ${jogo.released || "Não informado"}`;

        const avaliacao = document.createElement("p");
        avaliacao.textContent =
            `Avaliação: ${jogo.rating ?? "Não informado"}`;

        const genero = document.createElement("p");
        genero.textContent = `Gêneros: ${generos}`;

        const plataforma = document.createElement("p");
        plataforma.textContent = `Plataformas: ${plataformas}`;

        conteudo.appendChild(titulo);
        conteudo.appendChild(lancamento);
        conteudo.appendChild(avaliacao);
        conteudo.appendChild(genero);
        conteudo.appendChild(plataforma);

        card.appendChild(conteudo);

        resultado.appendChild(card);
    }
}

async function carregarJogosIniciais() {
    const numeroRequisicao = ++requisicaoAtual;

    tituloSecao.textContent = "Jogos em destaque";
    resultado.textContent = "Carregando jogos em destaque...";
    jogosArmazenados = [];

    try {
        const resposta = await fetch(
            "/api/games?nome=" + encodeURIComponent("2026")
        );

        if (!resposta.ok) {
            throw new Error("Erro HTTP: " + resposta.status);
        }

        const dados = await resposta.json();

        if (numeroRequisicao !== requisicaoAtual) {
            return;
        }

        jogosArmazenados = dados.results || [];

        if (jogosArmazenados.length === 0) {
            resultado.textContent = "Nenhum jogo em destaque encontrado.";
            return;
        }

        exibirJogos();

    } catch (erro) {
        if (numeroRequisicao !== requisicaoAtual) {
            return;
        }

        resultado.textContent = "Erro ao carregar jogos em destaque.";
        console.error(erro);
    }
}

carregarJogosIniciais();