# mfe-buildings

## Descrição

Este microfrontend é reponsável pelas funcionaliades de edifícios. Ele faz parte da arquitetura de micro-front-ends da aplicação principal via `root-config` utilizando o `single-spa`.

## Como rodar localmente

### Pré-requisitos

- Node.js
- Gerenciador de pacotes
- root-config rodando em paralelo

### Passos

```
# Instale as dependências
npm install

# Inicie a aplicação
npm start
```

Após iniciar a aplicação, acesse no navegador:

```
http://localhost:9000/buildings
```

## Integração com o root-config

- Nome do microfrontend registrado: `@mfe/buildings`
- Caminho da rota configurada: `/buildings`
