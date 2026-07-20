# Flora Mil Flores 🌸

Landing page / catálogo de flores. **Não é um ecommerce com pagamento** — o cliente
monta a sacola e o pedido é enviado finalizado para o **WhatsApp** da loja.

## Como rodar

É um site estático (HTML/CSS/JS puro). Basta abrir o `index.html` no navegador.
Para testar com servidor local (recomendado):

```bash
# Python 3
python3 -m http.server 5500
# depois abra http://localhost:5500
```

## O que editar

| Quero mudar... | Arquivo |
|---|---|
| **Número do WhatsApp**, nome da loja, endereço, taxa de entrega, Instagram | `js/config.js` |
| Produtos (nome, preço, descrição, categoria) | `js/products.js` |
| Ocasiões, **Depoimentos** e FAQ | `js/app.js` (arrays `OCCASIONS`, `TESTIMONIALS`, `FAQ`) |
| **Fotos reais** dos produtos e do Instagram | pasta `assets/` → veja `assets/LEIA-ME.md` |
| Animações (GSAP) e efeitos de scroll | `js/animations.js` |
| Cores, fontes, layout | `css/styles.css` |
| Textos da página (hero, sobre, rodapé) | `index.html` |

### 📸 Fotos reais

As fotos ficam na pasta `assets/` com nomes fixos (um por produto + 6 do
Instagram). Enquanto não existirem, o site usa imagens de exemplo automaticamente.
A lista completa de nomes está em **`assets/LEIA-ME.md`**.

### Feed AO VIVO do Instagram (sem pesar no site)

A prévia atual ("No nosso Instagram") é montada com os produtos do catálogo.
Para mostrar o **feed real, ao vivo** (fotos e vídeos do perfil, atualizando
sozinho), use um widget de incorporação. Importante: **a mídia não é baixada
nem hospedada no site** — ela continua nos servidores do Instagram e é carregada
sob demanda, então **vídeos/reels não pesam** no seu site.

Passo a passo (grátis, ~3 min):
1. Acesse **lightwidget.com** ou **snapwidget.com** e conecte o
   `@flora1000flores_contagem`.
2. Gere o widget (escolha layout em grade) e copie o código (um `<iframe>`).
3. Cole esse código dentro de `<div id="instaWidget">` no `index.html`
   (há um exemplo pronto comentado bem ali).

Assim que houver um código no slot, a grade de exemplo **some automaticamente**
e o feed ao vivo assume o lugar.

> Por que precisa de widget? O Instagram não permite mais ler o feed
> anonimamente — qualquer prévia ao vivo passa por um widget/serviço com login.
> O widget resolve isso e mantém tudo leve.

### ⚠️ Configure o WhatsApp

Em `js/config.js`, troque `whatsappNumber` pelo número real:

```js
whatsappNumber: "5511999998888", // 55 (país) + 11 (DDD) + número, só dígitos
```

### Trocar as fotos dos produtos

Por enquanto cada produto usa uma imagem de exemplo gerada automaticamente.
Coloque suas fotos na pasta `assets/` e aponte no produto:

```js
{ id: "buque-primavera", name: "Buquê Primavera", image: "assets/buque-primavera.jpg", ... }
```

## Seções do site

Hero → frase de impacto → vitrine imersiva → **como funciona** → coleções →
catálogo → **ocasiões** → sobre → **depoimentos** → **FAQ** → **contato (com mapa)**
→ chamada final → prévia do Instagram → rodapé. Mais a **sacola** lateral e o
**quick-view** (detalhe do produto ao clicar em um card).

> ⚠️ Os **depoimentos** (`TESTIMONIALS` em `js/app.js`) são exemplos —
> substitua pelos comentários reais dos seus clientes antes de publicar.

## Estrutura

```
index.html        Página
css/styles.css    Estilos
js/config.js      Configurações da loja (WhatsApp, nome, etc.)
js/products.js    Catálogo de produtos
js/app.js         Sacola + checkout + WhatsApp
assets/           (coloque aqui as fotos reais)
```

## Hospedagem

Por ser estático, sobe direto em **Netlify**, **Vercel** ou **GitHub Pages** —
é só arrastar a pasta.
