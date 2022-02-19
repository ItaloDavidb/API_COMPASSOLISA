<img src='https://media.discordapp.net/attachments/769301246720475181/937445435004583946/Compasso_Lisa.png'>

<h1 align="center">

 <a href="#" alt="Compasso_Lisa"> 🚘 Compasso_Lisa🚩</a>

</h1>

  

<p align="center">

 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="https://compassolisas.herokuapp.com/api/v1/docs/">Documentação</a> •
 <a href="#-como-usar-a-API">Como usar a API</a> •
 <a href="#-teste-das-rotas">Funcionalidades</a> • 
 <a href="#-tecnologias">Tecnologias</a> •
 <a href="#-agradecimentos">Agradecimentos</a> •
 <a href="#-autores">Autores</a> •

</p>

  
  

## Sobre o Projeto

  

<h3 align="center">

 Carros de luxo e semi-luxo para Alugar

</h3>

## Heroku   <img src="https://cdn-icons-png.flaticon.com/512/873/873120.png" width="25" height="25">
A Api Possui um Deploy no Heroku

-  [Swagger On Heroku](https://compassolisas.herokuapp.com/api/v1/docs/)

## 🛠 Tecnologias

  

As seguintes ferramentas foram usadas na construção do projeto:

  

- [mongoose](https://mongoosejs.com)

- [Node.js](https://nodejs.org/en/)

- [Postman](https://pt-br.reactjs.org/)

- [Swagger](https://swagger.io)

- [MongoDb](https://www.mongodb.com)

  
  
  

## Como usar a API ❓

  

### Pré-requisitos ❗️

  

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas, Ou pode utilizar o [Swagger](https://compassolisas.herokuapp.com/api/v1/docs/)que está no Heroku para testar.

[MongoDB](https://www.mongodb.com), [Node.js](https://nodejs.org/en/) e pode ser utilizado o [Postman](https://www.postman.com) para testar as rotas,

não esquecer de criar a pasta ".env' seguindo o exemplo.

Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

  

### 🎲 Rodando o Back End (servidor)

  

```bash

# Clone este repositório

$ git clone <https://github.com/ItaloDavidb/API_COMPASSOLISA.gitt>

  

# Acesse a pasta do projeto no terminal/cmd

$ cd API_COMPASSOLISA

  

# Instale as dependências

$ npm i

  

# Execute a aplicação

$ npm start

  

# O servidor inciará na porta:3000 - acesse <http://localhost:3000/api/v1>

```

### 📝 Teste de rotas

  

> Sugestões para testar as rotas
>> Lembrar que para se consumir da Rota de Veículos é necessário antes se Autenticar na rota de Autenticação e utilizar o Token Bearer 

### REQUEST - (POST)

> Para Autenticar uma Pessoa.

  

> Use: POST - `http://localhost:3000/api/v1/people/authenticate`

  

```json

{

  

"email": "joazinho@email.com",

"senha": "123456"

  

}

```


### REQUEST - (POST)

> Para cadastrar Veiculos.

  

> POST - ` http://localhost:3000/api/v1/car`

```json

{

"modelo": "GM S10 2.8",

"cor": "branco",

"ano": "2021",

"acessorios": [

{ "descricao": "Ar-condicionado" },

{ "descricao": "Dir. Hidráulica" },

{ "descricao": "Cabine Dupla" },

{ "descricao": "Tração 4x4" },

{ "descricao": "4 portas" },

{ "descricao": "Diesel" },

{ "descricao": "Air bag" },

{ "descricao": "ABS" }

],

"quantidadePassageiros": 5

}

```

  
  

### REQUEST - (GET)

  

> Para listar Veiculos.

  

> GET - `http://localhost:3000/api/v1/car`

  

```json

 //Exemplo de query params

{

"modelo": "GM S10 2.8",

"cor": "branco",

"ano": "2021",

"acessorios": [

{ "descricao": "Ar-condicionado" },

{ "descricao": "Dir. Hidráulica" },

{ "descricao": "Cabine Dupla" },

{ "descricao": "Tração 4x4" },

{ "descricao": "4 portas" },

{ "descricao": "Diesel" },

{ "descricao": "Air bag" },

{ "descricao": "ABS" }

],

"quantidadePassageiros": 5

}

  

```

  
  

### REQUEST - (PUT)

  

> Para atualizar um Veiculo.

  

> PUT - `http://localhost:3000/api/v1/car/:car_id`

  

```json

{

"modelo": "GM S10 2.8",

"cor": "branco",

"ano": "2021",

"acessorios": [

{ "descricao": "Ar-condicionado" },

{ "descricao": "Dir. Hidráulica" },

{ "descricao": "Cabine Dupla" },

{ "descricao": "Tração 4x4" },

{ "descricao": "4 portas" },

{ "descricao": "Diesel" },

{ "descricao": "Air bag" },

{ "descricao": "ABS" }

],

"quantidadePassageiros": 5

}

```
### REQUEST - (PATCH)

  

> Para atualizar um acessorio de algum Veiculo.

  

> PUT - `http://localhost:3000/api/v1/car/:car_id/acessorios/:acessorio_id`

  

```json


{ "descricao": "Ar-condicionado" },



```
  
  

### REQUEST - (DELETE)

  

> Para deletar um Veiculo .

  

> DELETE - `http://localhost:3000/api/v1/car/:car_id`

  
  
  

### REQUEST - (POST)

> Para cadastrar uma Pessoa.

  

> Use: POST - `http://localhost:3000/api/v1/people`

  

```json

{

"nome": "joaozinho ciclano",

"cpf": "131.147.860-49",

"data_nascimento": "03/03/2021",

"email": "joazinho@email.com",

"senha": "123456",

"habilitado": "sim"

}

```

  
  

>habilitado só permite sim ou não

  

### REQUEST - (GET)

> Para listar Pessoas.

  

> Use: GET - `http://localhost:3000/api/v1/people`

  

```json

{

"nome": "joaozinho ciclano",

"cpf": "131.147.860-49",

"data_nascimento": "03/03/2021",

"email": "joazinho@email.com",

"senha": "123456",

"habilitado": "sim"

}

```

### REQUEST - (PUT)

> Para atualizar uma Pessoa.

  

> Use: PUT - `http://localhost:3000/api/v1/people/:people_id`

  

```json

{

"nome": "joaozinho ciclano",

"cpf": "131.147.860-49",

"data_nascimento": "03/03/2021",

"email": "joazinho@email.com",

"senha": "123456",

"habilitado": "sim"

}

```

### REQUEST - (DELETE)

> Para excluir uma Pessoa.

  

> Use: DELETE - `http://localhost:3000/api/v1/people/:people_id``

  


### REQUEST - (POST)

> Para cadastrar Locadoras.

  

> POST - ` http://localhost:3000/api/v1/rental`

```json
{
  "nome": "Condado",
  "cnpj": "00249504000140",
  "atividades": "Festas",
  "endereco": [
    {
      "cep": "29175735",
      "number": "13",
      "isFilial": false
    }
  ]
}
```

  
  

### REQUEST - (GET)

  

> Para listar Locadoras.

  

> GET - `http://localhost:3000/api/v1/rental`

  

```json
{
  "_id": "string",
  "nome": "string",
  "cnpj": "string",
  "atividades": "string",
  "endereco": [
    {
      "cep": "string",
      "logradouro": "string",
      "complemento": "string",
      "bairro": "string",
      "number": 0,
      "localidade": "string",
      "uf": "string",
      "isFilial": "string"
    }
  ]
```

  
  

### REQUEST - (PUT)

  

> Para atualizar um Locadora.

  

> PUT - `http://localhost:3000/api/v1/rental/:loc_id`

  

```json
{
  "nome": "Mordor",
  "cnpj": "25691722000160",
  "atividades": "Morada",
  "endereco": [
    {
      "cep": "49085195",
      "number": "132",
      "isFilial": true
    }
  ]
}
```


  
  

### REQUEST - (DELETE)

  

> Para deletar uma Locadora .

  

> DELETE - `http://localhost:3000/api/v1/rental/:loc_id`

  
  



# 🦸Agradecimentos

 Obrigado por incentivar, por cada conselho ,"puxão de orelha" e por estar sempre por perto dando apoio e tirando todas as dúvidas de Todo o PG!!

  

<table>

 <tr>

 <td><a href="" >Felipe Silva</td>

 <td><a href="" >Bruna Santos</td>

 <td><a href="" >Thais Nicodemus</td>

 </tr>

 <tr>

 <td><a href="" >Diego Bueno</td>

 <td><a href="" >Gabriel Missio</td>

 <td><a href="" >Giovanni Hoffmann</td>

 </tr>

</table>

  

# 👨‍💻Autor

  

 [Italo Alves](https://www.linkedin.com/in/italo-alves-01457a1a6/)

# 📝Licença

  

Esse repositório está licenciado pela **MIT LICENSE**. Para mais informações detalhadas, leia o arquivo [LICENSE](./LICENSE) contido nesse repositório.
