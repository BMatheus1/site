# Cantinho do Luiz — Landing Page

Landing page oficial, mobile-first, criada com React, Vite, TypeScript, Tailwind CSS e Lucide React. O projeto é estático, sem backend, pronto para Cloudflare Pages.

## Executar localmente

```bash
npm install
npm run dev
```

O Vite exibirá o endereço local. Para conferir a versão de produção:

```bash
npm run build
npm run preview
```

## Conteúdo centralizado

Todas as informações comerciais ficam em `src/config/restaurant.ts`. Edite esse arquivo para alterar nome, frase principal, WhatsApp, endereço, cardápio, Instagram, horários e informações adicionais.

- `instagram`: mantenha vazio para ocultar o botão; informe uma URL completa para exibi-lo.
- `openingHours`: mantenha a lista vazia para ocultar horários; adicione apenas informações confirmadas.
- `extraInfo`: use para estacionamento, acessibilidade, reservas, pagamentos e avisos confirmados.

## Trocar fotografias

1. Coloque os novos arquivos otimizados em `public/images/`.
2. Atualize `logoImage`, `shareImage` ou `gallery` em `src/config/restaurant.ts`.
3. Informe descrições `alt` objetivas e as dimensões reais de cada imagem.
4. Prefira WebP ou AVIF com largura máxima adequada ao uso.

A galeria aceita qualquer quantidade de imagens. O layout atual foi composto com as fotografias reais fornecidas pelo restaurante.

## Atualizar o cardápio

Substitua `public/cardapio.pdf` pelo novo arquivo mantendo o mesmo nome. Se alterar o caminho, atualize `menuUrl` em `src/config/restaurant.ts`.

## Publicar gratuitamente no Cloudflare Pages

1. Crie um repositório no GitHub e envie este projeto.
2. No painel da Cloudflare, abra **Workers & Pages** e escolha **Create application > Pages > Connect to Git**.
3. Selecione o repositório.
4. Use `npm run build` como comando de build.
5. Use `dist` como diretório de saída.
6. Salve e aguarde a primeira publicação.

Para um domínio personalizado, abra o projeto no Cloudflare Pages, entre em **Custom domains**, escolha **Set up a custom domain** e siga a validação de DNS. Novas atualizações são publicadas ao enviar commits para a branch configurada.

## Verificações

```bash
npm run check
npm run build
```

O site deve ser validado principalmente em 320, 375, 390, 430, 768, 1024 e 1440 pixels. Teste também o PDF, WhatsApp, Google Maps, navegação por teclado da galeria e preferência de movimento reduzido.

