# Documentação do Site de Casamento: Rodrigo & Jennifer

## Introdução
Este documento descreve as funcionalidades e requisitos técnicos do site de casamento de Rodrigo & Jennifer. O projeto foi desenvolvido com foco em uma experiência romântica e moderna, utilizando tecnologias leves e de fácil manutenção.

---

## Funcionalidades Principais

### 1. Página Principal (✅ Implementado)
- **Nome do Casal:** Destaque para "Rodrigo & Jennifer" com tipografia romântica.
- **Layout:** Header fixo, seção hero, história do casal e rodapé.
- **Design:** Responsivo com tons de rosa, branco e dourado.

### 2. Galeria de Momentos (✅ Implementado)
- **Conteúdo:** Grid responsivo que carrega fotos dinamicamente via JSON (`assets/data/gallery.json`).
- **Interatividade:** Efeito hover para exibir local/data e modal de ampliação com descrição completa.

### 3. Links de Afiliados (✅ Implementado)
- **Integração:** Botões para Shopee e Mercado Livre.
- **Confirmação:** Modal de aviso obrigatório sobre comissões antes do redirecionamento.

### 4. Formulário de Confirmação - RSVP (✅ Implementado)
- **Campos:** Nome, Telefone, Email e Mensagem (opcional).
- **Envio:** Submissão assíncrona (Fetch API) integrada ao Formspree.
- **Confirmação:** Popup (modal) de sucesso interativo após o envio.
- **Privacidade:** Checkbox de consentimento de dados (LGPD).

### 5. Local do Casamento (✅ Implementado)
- **Endereço:** Igreja Batista Lagoinha Vista Alegre - Rua Aguanil, 100, BH-MG.
- **Mapa:** Google Maps integrado com link direto para navegação.

### 6. Monetização (✅ Implementado)
- **AdSense:** Três slots estratégicos (Topo, Meio e Rodapé) prontos para receber o código de anúncios.

### 7. Requisitos Técnicos e SEO (✅ Implementado)
- **SEO:** Meta tags e Open Graph configurados para compartilhamento em redes sociais.
- **Privacidade:** Banner de cookies integrado (LGPD).
- **Performance:** Carregamento preguiçoso (*lazy loading*) de imagens.

---

## Orientações para Edição
Para instruções detalhadas de como editar fotos, links e configurar e-mails, consulte o arquivo:
👉 **[guia_rodrigo.md](guia_rodrigo.md)**

---

## Tecnologias Utilizadas
- **Frontend:** HTML5, CSS3, JavaScript Vanilla.
- **Backend:** Formspree.
- **Status Final:** 100% Desenvolvido.
