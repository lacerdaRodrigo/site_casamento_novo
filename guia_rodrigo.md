# 💍 Guia de Manutenção e Configuração (Rodrigo)

Este guia contém todas as orientações necessárias para você mesmo realizar as edições e atualizações no site de casamento de Rodrigo & Jennifer.

---

### 1. Como adicionar novas fotos na galeria
Para adicionar, remover ou editar fotos, abra o arquivo `assets/data/gallery.json`. 
Cada foto é um "bloco" de código que segue este padrão:

```json
{
    "url": "LINK_DA_FOTO",
    "description": "DESCRIÇÃO",
    "date": "DATA",
    "location": "LOCAL"
}
```

**Dica:** Você pode usar links de fotos que subiu no Google Drive (com link público), Imgur ou qualquer serviço de hospedagem de imagens.

---

### 2. Como receber as confirmações de presença (RSVP) no seu e-mail
O site usa o serviço gratuito **Formspree** para te avisar quando alguém confirmar presença.
1. Crie uma conta gratuita em [formspree.io](https://formspree.io/).
2. Crie um novo formulário (clique em "New Form") e nomeie como "RSVP Casamento".
3. Copie o **ID do formulário** (algo como `mjvnbnrz`) que eles fornecerem.
4. No arquivo `index.html`, procure a linha:
   `<form id="rsvp-form" action="https://formspree.io/f/seu-id-aqui" method="POST">`
5. Substitua `seu-id-aqui` pelo seu novo ID.

---

### 3. Como alterar os links de presentes (Afiliados)
Para ganhar comissão sobre os presentes, você deve usar seus links de afiliado.
1. No arquivo `index.html`, procure pela seção `gifts-grid`.
2. Altere o link dentro das aspas do `href=""` para o seu link oficial da Shopee ou Mercado Livre.
   *Exemplo:* `href="https://shope.ee/seu-link-de-afiliado"`

---

### 4. Como adicionar anúncios (Google AdSense)
Para monetizar as visualizações do site:
1. No arquivo `index.html`, procure pelas `divs` com a classe `ad-container`. 
2. Existem três locais (Topo, Meio e Rodapé). 
3. Substitua o texto "Anúncio Google AdSense..." pelo código (script) que o Google AdSense te fornecer para banners.

---

### 5. Como testar o site localmente (No seu PC)
Como o site carrega dados dinâmicos (a galeria), você precisa rodar um mini servidor local:
1. Abra o terminal na pasta do projeto.
2. Execute o comando:
   ```bash
   python3 -m http.server 8000
   ```
3. No seu navegador, acesse: `http://localhost:8000`

---

### 6. Como publicar o site na internet (Grátis)
Recomendo usar o **GitHub Pages**:
1. Crie um repositório no seu GitHub chamado `casamento`.
2. Suba todos os arquivos para lá.
3. Vá em **Settings > Pages**.
4. Em "Branch", selecione `main` e a pasta `/(root)`.
5. Salve e o site estará no ar em poucos minutos no endereço: `https://seu-usuario.github.io/casamento/`
