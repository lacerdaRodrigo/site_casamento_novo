# Documentação do Site de Casamento (Data-Driven & Ultra Responsive)

## Introdução
Este projeto é um site de casamento moderno, **totalmente dinâmico** e com **design responsivo de alta precisão**, otimizado para dispositivos móveis de última geração (como Moto Edge 50 Pro).

---

## Arquitetura de Dados (✅ Data-Driven v3.1)
O site utiliza uma arquitetura onde **100% do conteúdo** é injetado dinamicamente a partir de um arquivo de configuração central:
- **Arquivo de Configuração:** `assets/data/content.json`
- **Controle Centralizado:** Nomes, história, galeria, links de afiliados, RSVP, mapas e até os títulos de SEO são editados em um único lugar.
- **Segurança de Carregamento:** O sistema possui *fallbacks* (proteções) para garantir que o site funcione mesmo se o JSON falhar.

---

## Funcionalidades e Design

### 1. Navegação Horizontal Sequencial (Exclusivo Mobile)
- **Design Moderno:** Substituímos o menu hambúrguer por uma barra de navegação horizontal compacta de **40px**.
- **Otimização de Espaço:** Fontes e espaçamentos calculados milimetricamente para exibir os 8 itens de menu (Início até Local) em uma única linha, sem cortes, em qualquer tela de celular.

### 2. Monetização & AdSense (✅ Otimizado)
- **Layout Limpo:** Remoção de anúncios "acima da dobra" (topo) para acelerar a aprovação do Google.
- **Conteúdo Rico:** Seções de Traje e FAQ expandidas via JSON para evitar a reprovação por "Baixo Valor de Conteúdo".

### 3. Galeria e RSVP
- **Galeria:** Grid adaptável que muda de 3 colunas (Web) para 1 coluna (Mobile).
- **RSVP:** Formulário integrado com Formspree e feedback instantâneo via modal de sucesso.

---

## Tecnologias Utilizadas
- **Frontend:** HTML5, CSS3 (com Flexbox e Clamp), JavaScript Vanilla.
- **Gestão de Dados:** JSON.
- **Status Final:** 100% Responsivo e Pronto para Revenda (v3.1).
