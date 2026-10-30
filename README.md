# Game Explorer

Aplicação web desenvolvida com **Java 21, Spring Boot e JavaScript**, que permite pesquisar jogos, consultar informações detalhadas, filtrar resultados por avaliação e explorar informações sobre diferentes títulos por meio da integração com a API RAWG.

O projeto foi desenvolvido com o objetivo de aplicar conceitos de **desenvolvimento full-stack, APIs REST, integração com serviços externos e manipulação dinâmica de interfaces web**.

## Tecnologias utilizadas

### Backend

* Java 21
* Spring Boot 4
* Spring Web
* Spring RestClient
* Maven

### Frontend

* HTML5
* CSS3
* JavaScript
* Fetch API

### Integração

* RAWG Video Games Database API
* HTTP
* JSON

## Funcionalidades

* Pesquisa de jogos por nome.
* Exibição automática de jogos em destaque na página inicial.
* Filtragem de jogos por avaliação mínima.
* Ordenação dos jogos por avaliação.
* Exibição de imagens, gêneros e plataformas.
* Consulta de informações detalhadas dos jogos.
* Exibição de desenvolvedoras e datas de lançamento.
* Galeria de screenshots.
* Interface dinâmica sem necessidade de recarregar a página.
* Armazenamento temporário dos resultados no navegador para evitar requisições desnecessárias durante a filtragem.
* Integração entre frontend e backend por meio de endpoints REST.

## Demonstração da aplicação

### Página inicial

Ao acessar o Game Explorer, o usuário encontra uma seleção inicial de jogos.

![Página inicial do Game Explorer](screenshots/game-explorer%20inicio.png)

### Pesquisa de jogos

O usuário pode pesquisar jogos pelo nome e visualizar informações como imagem, avaliação, gênero, plataformas e data de lançamento.

![Pesquisa de jogos](screenshots/game-explorer%20pesquisa.png)

### Filtro por avaliação

Os resultados podem ser filtrados por avaliação mínima e organizados em ordem crescente, permitindo visualizar primeiro os jogos com menores avaliações dentro do filtro selecionado.

![Filtro por avaliação](screenshots/game-explorer%20filtro.png)

## Arquitetura da aplicação

O projeto utiliza uma arquitetura simples, separando as responsabilidades entre frontend, controller e service.

O **Spring Boot** disponibiliza endpoints REST responsáveis por receber as requisições do frontend.

O **GameService** utiliza o RestClient para consultar a API RAWG e retornar os dados dos jogos.

O **JavaScript** realiza as requisições ao backend utilizando Fetch API e atualiza dinamicamente os elementos da interface.

### Fluxo de comunicação

```text
Frontend
HTML + CSS + JavaScript
          |
          | Fetch API
          v
GameController
Spring Boot REST API
          |
          v
GameService
Spring RestClient
          |
          v
RAWG Video Games Database API
          |
          v
Resposta JSON
          |
          v
Renderização dinâmica dos jogos
```

## Endpoints da API

| Método | Endpoint                      | Descrição                                  |
| ------ | ----------------------------- | ------------------------------------------ |
| GET    | `/api/games?nome={nome}`      | Pesquisa jogos pelo nome                   |
| GET    | `/api/games/{id}`             | Consulta informações detalhadas de um jogo |
| GET    | `/api/games/{id}/screenshots` | Retorna capturas de tela de um jogo        |

## Estrutura do projeto

```text
game-explorer/
│
├── screenshots/
│   ├── inicio.png
│   ├── pesquisa.png
│   └── filtro.png
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/felipe/gameexplorer/
│   │   │       ├── GameExplorerApplication.java
│   │   │       ├── GameController.java
│   │   │       └── GameService.java
│   │   │
│   │   └── resources/
│   │       ├── application.properties
│   │       └── static/
│   │           ├── index.html
│   │           ├── css/
│   │           │   └── style.css
│   │           └── js/
│   │               └── script.js
│   │
│   └── test/
│       └── java/com/felipe/gameexplorer/
│           └── GameExplorerApplicationTests.java
│
├── .gitignore
├── .gitattributes
├── pom.xml
├── mvnw
├── mvnw.cmd
└── README.md
```

## Como executar o projeto

### Pré-requisitos

* Java 21
* Git
* Chave de API da RAWG
* Conexão com a internet

O projeto utiliza o Maven Wrapper, portanto não é necessário instalar o Maven separadamente.

### 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd game-explorer
```

### 2. Configurar a chave da API

Para utilizar a aplicação, é necessário obter uma chave de acesso à RAWG.

A chave deve ser configurada por meio da variável de ambiente `RAWG_API_KEY`.

**Windows (PowerShell):**

```powershell
$env:RAWG_API_KEY="SUA_CHAVE_API"
```

**Linux/macOS:**

```bash
export RAWG_API_KEY="SUA_CHAVE_API"
```

O arquivo `application.properties` utiliza as seguintes configurações:

```properties
spring.application.name=game-explorer
rawg.api.key=${RAWG_API_KEY}
rawg.api.url=https://api.rawg.io/api
```

A chave de API não deve ser armazenada diretamente no código-fonte nem publicada no GitHub.

### 3. Executar a aplicação

No Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

No Linux/macOS:

```bash
./mvnw spring-boot:run
```

Após iniciar o servidor, acesse:

**http://localhost:8080**

## Testes automatizados

O projeto possui uma estrutura de testes utilizando as ferramentas de teste do ecossistema Spring Boot.

Para executar os testes:

**Windows:**

```powershell
.\mvnw.cmd test
```

**Linux/macOS:**

```bash
./mvnw test
```

## Build da aplicação

Para compilar e empacotar o projeto:

**Windows:**

```powershell
.\mvnw.cmd clean package
```

**Linux/macOS:**

```bash
./mvnw clean package
```

Após um build bem-sucedido, o arquivo executável `.jar` será gerado na pasta `target/`.

## Conceitos aplicados

Durante o desenvolvimento foram utilizados conceitos como:

* Programação orientada a objetos.
* Desenvolvimento de APIs REST.
* Separação de responsabilidades entre controller e service.
* Consumo de APIs externas.
* Manipulação de respostas JSON.
* Requisições HTTP assíncronas.
* Manipulação do DOM.
* Tratamento de erros.
* Filtragem e ordenação de dados com JavaScript.
* Utilização de variáveis de ambiente para configurações sensíveis.
* Versionamento de código com Git.

## Melhorias futuras

* Implementação de um endpoint dedicado para jogos populares.
* Paginação dos resultados.
* Filtros por gênero e plataforma.
* Ampliação da cobertura de testes automatizados.
* Deploy da aplicação em ambiente de produção.
* Melhorias de acessibilidade e experiência do usuário.

## Objetivo do projeto

O Game Explorer foi desenvolvido como projeto de portfólio para demonstrar habilidades práticas em **Java, Spring Boot, JavaScript e integração de APIs REST**.

A aplicação reúne conceitos de desenvolvimento backend e frontend, proporcionando uma experiência completa de pesquisa e exploração de jogos.

## Fonte dos dados

Os dados dos jogos são fornecidos pela **RAWG Video Games Database API**.
