# 💍 Guia de Manutenção Master (Versão PT-BR 3.2)

Este guia contém as orientações para gerenciar o site de casamento de Rodrigo & Jennifer. Agora, todo o sistema interno está em Português para facilitar sua vida.

---

### 1. Como Editar o Site (Arquivo `content.json`)
Abra o arquivo `assets/data/content.json`. Tudo o que você precisa mudar está lá. As chaves agora são intuitivas:

- **`configuracoes`**: Altere o título da aba e o ID do e-mail (Formspree).
- **`inicio`**: Nomes do casal e data.
- **`historia`**: Adicione quantos parágrafos quiser contando sua jornada.
- **`galeria`**: Adicione novas fotos (URL, descrição, data e local).
- **`traje`**: Mude as dicas de roupas para os convidados.
- **`duvidas`**: Edite as perguntas e respostas do FAQ.
- **`confirmacao`**: Mude o texto de introdução e a data limite do RSVP.
- **`presentes`**: Seus links de afiliado da Shopee e Mercado Livre.
- **`localizacao`**: Nome do local, endereço e links de mapas.

---

### 2. Como Configurar o RSVP (E-mails)
1. Crie uma conta no [formspree.io](https://formspree.io/).
2. Obtenha o seu ID (ex: `mjvnbnrz`).
3. No `content.json`, em `configuracoes`, coloque seu ID em:
   `"idEmailRSVP": "seu-id-aqui"`

---

### 3. Design e Celular
- O menu agora é uma linha horizontal única no topo. 
- Se no celular as palavras parecerem juntas, não se preocupe: isso foi feito para que todos os itens do menu (Início, História, etc.) caibam sem precisar de um menu escondido (hambúrguer).

---

### 4. Checklist AdSense 🟢
- **Robots.txt:** Já configurado na raiz.
- **Anúncios:** O anúncio do topo foi removido para seguir as regras do Google e acelerar sua aprovação. Os anúncios aparecem agora apenas no **Meio** e no **Rodapé**.

---

### 5. Como Testar e Publicar
- **Testar:** No terminal, rode `python3 -m http.server 8000` e acesse `http://localhost:8000`.
- **Publicar:** Suba os arquivos para o **GitHub Pages** (gratuito) e o site estará no ar em minutos.
- **Vender:** O projeto está pronto para ser vendido como um template brasileiro prático e rápido.
