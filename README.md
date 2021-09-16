# Squad7-Hackaton-FCamara-Backend
Projeto do Squad 7 para o Programa de Formação FCamara 2021.


Integrantes: [Daiane Vieira](https://github.com/Daiane-Vieira) |
[Vinicius Oliveira](https://github.com/vinioliv) |


## Descrição do projeto
Justificativa do projeto: Fundada em 2008, com o intuito de ser uma empresa com poucos consultores especializada em performance de aplicações web e treinamento técnico, o premiado grupo Fcamara hoje é líder em desenvolvimento de soluções digitais. Com a pandemia do covid-19, muitos profissionais precisaram aderir ao home office e com os consultores da Fcamara não foi diferente; agora com uma parte da população vacinada, e com a liberação (pelo estado de SP) de 40% da capacidade total dos locais, surgiu a necessidade de um sistema MVP de agendamento para os consultores que desejam voltar ao trabalho presencial, respeitando o limite de espaço, e o distanciamento social.

Objetivos e descrição: Os objetivos desse sistema(MVP) é resolver a problemática da necessidade do grupo Fcamara em realizar agendamentos presenciais de seus consultores, de forma ágil, simples e intuitiva, nas sedes da empresa em Santos-SP, e São Paulo-SP.


# Setup

## 1) Clonar o repositório
```
git clone https://github.com/vinioliv/Squad7-Hackaton-FCamara-Backend.git
```

## 2) Baixar as dependências do back-end
Navegue até o diretório server e baixe as dependências:
```
cd backend
yarn install
```
## 3) Edite as variáveis de ambiente do arquivo .env para se conectar ao banco de dados

Exemplo: 

DB_HOST=localhost
DB_USER=root
DB_PASS=root

## 4) Iniciar o script de criação do banco

```
yarn typeorm migration:run

```

## 5) Iniciar o projeto

```
yarn dev

```
## Tecnologias Utilizadas

**Front-end: React.js**

**Back-end: TypeScript**

**Database: MySQL**

## Links

Protótipo UX do projeto: https://www.figma.com/file/qnjeRM6oO5TG8xgXUWYsRs/telas-squad-07?node-id=49%3A5

Conteúdo UX do projeto: https://drive.google.com/drive/folders/1kAmIa0hBwNxK8VWX9mY24Nv5E7FP8MEm

Trello Squad#7: https://trello.com/b/vFAOM8K4/squad7-hackaton-fcamara

Repositório FrontEnd: https://github.com/vinioliv/Squad7-Hackaton-FCamara-Frontend

