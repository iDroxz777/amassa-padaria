# AMASSA.

Site institucional de uma padaria artesanal de fermentação lenta em São Paulo.

## Tecnologias

- Next.js
- React
- TypeScript
- CSS responsivo

## Executar localmente

Requer Node.js 22.13 ou superior.

```bash
npm install
npm run dev
```

O projeto estará disponível em `http://localhost:3000`.

## Verificações

```bash
npm run lint
npm test
```

O teste executa o build de produção e valida o HTML, as imagens locais e os
dados estruturados da padaria.

## Estrutura principal

- `app/page.tsx`: conteúdo e estrutura da página
- `app/globals.css`: estilos, responsividade e animações
- `public/products`: fotografias dos produtos
- `public/images`: fotografias institucionais
- `tests`: verificações automatizadas

## Observação

Telefone, domínio, preços e depoimentos presentes nesta demonstração são
fictícios e devem ser substituídos antes do uso comercial.
