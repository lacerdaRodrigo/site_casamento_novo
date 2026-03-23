# 💍 Guia de Manutenção e Gestão (Rodrigo)

Este guia contém todas as informações para gerenciar o site de casamento de Rodrigo & Jennifer (Versão Ultra Responsiva 3.1).

---

### 1. O Cérebro do Site: `assets/data/content.json`
Todo o conteúdo do site é controlado por este único arquivo. Para mudar textos, fotos ou links, edite os campos do JSON:
- **`settings`**: Títulos e ID do RSVP.
- **`hero`**: Nome principal e data.
- **`story`**: Sua história (parágrafos ilimitados).
- **`gallery`**: Lista de fotos (URL, descrição, data, local).
- **`traje`**: Orientações para convidados.
- **`faq`**: Perguntas frequentes.
- **`gifts`**: Links de afiliados (Shopee e Mercado Livre).
- **`location`**: Detalhes do local e link do mapa.

---

### 2. Design e Responsividade (O Que Saber)
- **Menu Mobile (Horizontal Sequencial):** O site usa uma navegação moderna onde todos os itens aparecem no topo em uma única linha. Não estranhe se no celular as fontes parecerem pequenas; isso foi feito para que todos os 8 itens (Início até Local) caibam perfeitamente na tela do seu celular, sem cortes e sem menu oculto.
- **Header Compacto:** Reduzimos a altura para **40px** para sobrar mais espaço para o conteúdo e as fotos.

---

### 3. Como configurar o RSVP (Confirmação de Presença)
1. Crie uma conta em [formspree.io](https://formspree.io/).
2. Obtenha o seu **ID de formulário** (ex: `mjvnbnrz`).
3. No arquivo `assets/data/content.json`, substitua o valor do campo `"rsvpEmailId"` pelo seu novo ID.

---

### 4. Checklist para Aprovação no AdSense 🟢
1.  **Robots.txt:** Está na raiz, essencial para o Google ler seu site.
2.  **Conteúdo Rico:** Se o Google reclamar de "Baixo Valor", abra o `content.json` e escreva parágrafos maiores na história ou adicione 5 novas perguntas no FAQ.
3.  **Ad Placement:** Removemos o anúncio do topo para acelerar a aprovação (política de *ads above the fold*).

---

### 5. Como testar no computador
Abra o terminal na pasta e execute:
`python3 -m http.server 8000`
Acesse: `http://localhost:8000`

---

### 6. Como Vender como Modelo (Template)
Este site foi desenhado para ser um produto de revenda:
- **Facilidade:** O comprador só edita um arquivo JSON.
- **Design:** Responsividade de alta fidelidade que funciona em celulares modernos.
- **Monetização:** Já estruturado para anúncios do Google.
