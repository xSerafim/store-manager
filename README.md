# Store-Manager

A ideia do projeto é criar uma API para um sistema de gerenciamento de vendas, onde é possível criar, visualizar, deletar e atualizar produtos e vendas.

## Habilidades

As habilidades que procurei desenvolver através deste projeto foram:
- Aplicar conceitos de arquitetura MSC;
- Melhorar manutenibilidade e reusabilidade do seu código;
- Entender e aplicar os padrões REST;
- Aplicar validações para as requisições através do JOI;
- Cobrir as camadas Model, Service e Controller com Testes unitários.


---

## Desenvolvimento

- 100% das camadas Model, Service e Controller, foram cobertas com Testes unitários, tecnologias utilizadas para os testes foram: Mocha, Chai, Sinon.

- Endpoints para a rota `products`

  - O endpoint para listar, criar, adicionar e deletar produtos é acessível através do caminho (/products) e (/products/:id).

- Endpoints para a rota `sales`

  - O endpoint para listar, criar, adicionar e deletar vendas é acessível através do caminho (/sales) e (/sales/:id).

- Foram criados middlewares de validação para as rotas /products e /sales
