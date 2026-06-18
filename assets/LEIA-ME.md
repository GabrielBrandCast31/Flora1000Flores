# 📸 Como adicionar as fotos reais

Coloque as fotos **dentro desta pasta `assets/`** com os nomes exatos abaixo.
Pode ser `.jpg` (recomendado). Enquanto a foto não existir, o site mostra
automaticamente uma imagem de exemplo — nada quebra.

> Dica: use fotos quadradas (ex.: 1000×1000px) para ficarem perfeitas nos cards
> e na vitrine. Salve direto dos seus posts do Instagram (a conta é de vocês).

## Fotos dos produtos (catálogo + vitrine)

| Produto | Nome do arquivo |
|---|---|
| Buquê Primavera | `assets/buque-primavera.jpg` |
| Buquê 12 Rosas Vermelhas | `assets/buque-rosas-vermelhas.jpg` |
| Buquê de Girassóis | `assets/buque-girassois.jpg` |
| Buquê com Ursinho | `assets/buque-ursinho.jpg` |
| Arranjo de Mesa Elegance | `assets/arranjo-mesa.jpg` |
| Orquídea Phalaenopsis | `assets/arranjo-orquidea.jpg` |
| Trio de Suculentas | `assets/planta-suculentas.jpg` |
| Jiboia em Cachepô | `assets/planta-jiboia.jpg` |
| Muda Frutífera | `assets/planta-frutifera.jpg` |
| Cesta Café da Manhã + Flores | `assets/cesta-cafe.jpg` |
| Cesta Chocolates & Rosas | `assets/cesta-chocolates.jpg` |
| Especial Dia das Mães | `assets/data-dia-das-maes.jpg` |
| Combo Aniversário | `assets/data-aniversario.jpg` |
| Rosas na Caixa de Joias | `assets/rosas-caixa-joias.jpg` |
| Coroa de Condolências | `assets/data-condolencias.jpg` |

## Seção "No nosso Instagram" (prévia do perfil)

Essa prévia (grade 3×3) reaproveita as **mesmas fotos dos produtos** acima —
não precisa de arquivos extras. Para trocar quais produtos aparecem, edite a
lista `INSTA_PRODUCTS` em `js/app.js`.

Os números do perfil (publicações/seguidores/seguindo) ficam em
`js/config.js` → `instagramStats`.

## Quer o feed AO VIVO (atualiza sozinho)?

A grade acima é estática. Para um feed que atualiza sozinho conforme vocês
postam, use um widget gratuito:

1. Acesse **lightwidget.com** (ou Elfsight), conecte o @flora1000flores_contagem
   e gere o código de incorporação (embed).
2. Cole esse código dentro de `<div class="insta__widget" id="instaWidget">`
   no arquivo `index.html`.
3. Pronto — o widget assume o lugar da grade automaticamente.
