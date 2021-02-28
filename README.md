<div style="background: #000; border-radius: 10px; padding: 15px; opacity: 0.9">
<p align="center">
  <h3 align="center">&#129309; PRODUTOS FAVORITOS DOS CLIENTES</h3>

  <p align="justify">
    API de desafio que constitui em:<br>
    <ul>
    <li>[CLIENTES] Criar, atualizar, visualizar e remover ​Clientes.</li>
    <li>[PRODUTOS FAVORITOS] Possibilitar ao cliente montar lista de produtos favoritos (podendo adicionar ou remover itens). </li>
    <li>[AUTENTICAÇÃO] A API também permite criação de usuários e realização de processo de autenticação e autorização (JWT).</li>
    <ul>
  </p>
</p>
</div>


<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Sumário</h2></summary>
  <ol>
    <li><a href="#tech">Tecnologias Utilizadas</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#docker-installation">Instalação com Docker</a></li>
        <li><a href="#prerequisites">Pre-requisitos</a></li>
        <li><a href="#installation">Instalação Manual</a></li>
        <li><a href="#tests">Testes Automatizados/ Testes de Integração</a></li>
        <li><a href="#contact">Contato</a></li>
      </ul>
    </li>
  </ol>
</details>



<div id="tech"></div>

## &#128190; Tecnologias Utilizadas

* [Node.JS](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)
* [Redis](https://redis.io/)



<div id="getting-started"></div>

## Getting Started

Para instalar na sua máquina e rodar a aplicação siga os passos abaixo


<div id="docker-installation"></div>

### &#128051; Instalação e uso com Docker

1. (No terminal) Clone o repositório
   ```sh
   git clone https://github.com/RodrigoTopan/favorite-products-challenge
   ```

2. (No terminal) Vá até a pasta do projeto e execute
   ```sh
   docker-compose up
   ```

4. Aguarde um pouco e pronto! O projeto está rodando por padrão em http://localhost:8080

5. Você pode consultar a documentação dos serviços através do SWAGGER em http://localhost:8080/doc/

6. Se preferir, também disponibilizei na pasta "contracts", o arquivo dump do Insomnia e do Postman para você poder importa-lo na sua máquina

<div id="prerequisites"></div>

### &#128736; Pré-requisitos (Instalação Manual)

* Instalar o npm ou Yarn

* Instalar o node (a versão utilizada no projeto foi a 12)

* Possuir um servidor mongodb rodando localmente

* Possuir uma instância do redis rodando localmente

<div id="installation"></div>

### &#128640; Instalação Manual e Rodando o Projeto

1. Clone o repositório
   ```sh
   git clone https://github.com/RodrigoTopan/favorite-products-challenge
   ```
2. Instalar dependências
   ```sh
   yarn ou npm install
   ```

3. Verifique se o arquivo .env está apontando corretamente para o MONGO ou redis da sua máquina

4. Executar o projeto
   ```sh
   yarn dev ou npm run dev
   ```

5. O projeto por padrão vai rodar na PORTA 8080

6. Você pode consultar a documentação dos serviços através do SWAGGER em http://localhost:8080/doc/

7. Se preferir, também disponibilizei na pasta "contracts", o arquivo dump do Insomnia e do Postman com os para você poder importá-lo na sua máquina


<div id="tests"></div>

### &#9989; Testes de integração


Para executar os testes automatizados,execute o comando abaixo. O relatório de cobertura dos testes é disponibilizado em tests/coverage
   ```sh
   yarn test ou npm run test
   ```


<div id="contact"></div>

## &#128406; Contato

Rodrigo Garcia Topan Moreira - [@linkedin](https://www.linkedin.com/in/rodrigotopan)

Email: rodrigo.topan.ti@gmail.com
