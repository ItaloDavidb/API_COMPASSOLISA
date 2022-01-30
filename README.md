<img src='https://media.discordapp.net/attachments/769301246720475181/937445435004583946/Compasso_Lisa.png'>
<h1 align="center">
      <a href="#" alt="Compasso_Lisa"> 🚘 Compasso_Lisa🚩</a>
</h1>

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="">Documentação</a> •
 <a href="#-como-usar-a-API">Como usar a API</a> •
 <a href="#-teste-das-rotas">Funcionalidades</a> •  
 <a href="#-tecnologias">Tecnologias</a> • 
 <a href="#-agradecimentos">Agradecimentos</a> • 
 <a href="#-autores">Autores</a> • 
</p>

<h4 align="center">
	🚧   Concluido 🚀 🚧
</h4>

## Sobre o Projeto 

<h3 align="center">
  Carros de luxo e semi-luxo para Alugar 
</h3>




## Como usar a API ❓

### Pré-requisitos ❗️

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[MongoDB](https://www.mongodb.com), [Node.js](https://nodejs.org/en/) e pode ser utilizado o [Postman](https://www.postman.com) para testar as rotas,
não esquecer de criar a pasta ".env' seguindo o exemp.
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


### REQUEST - (DELETE)

> Para deletar um Veiculo .

> DELETE - `http://localhost:3000/api/v1/car/:car_id`



### REQUEST - (POST) 
> Para cadastrar uma Pessoa.

> Use: POST - `http://localhost:3000/api/v1/peoaple`

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

> Use: GET - `http://localhost:3000/api/v1/peoaple`

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

> Use: PUT - `http://localhost:3000/api/v1/peoaple/:people_id`

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

> Use: DELETE - `http://localhost:3000/api/v1/peoaple/:people_id``

### REQUEST - (POST) 
> Para Autenticar uma Pessoa.

> Use: POST - `http://localhost:3000/api/v1/people/autenticate`

```json
{

"email": "joazinho@email.com",
"senha": "123456"

}
```


### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [mongoose](https://mongoosejs.com)
- [Node.js](https://nodejs.org/en/)
- [Postman](https://pt-br.reactjs.org/)
- [Swagger](https://swagger.io)
- [MongoDb](https://www.mongodb.com)

# 🦸Agradecimentos
 Obrigado por incentivar, por cada conselho ,"puxão de orelha" e por estar sempre por perto dando apoio e tirando todas nossas dúvidas!!

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
