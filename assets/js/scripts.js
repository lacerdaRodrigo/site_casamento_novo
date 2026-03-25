// Scripts dinâmicos em Português para o site de casamento

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Carregar todos os dados do site via JSON
    fetch('assets/data/content.json')
        .then(resposta => {
            if (!resposta.ok) throw new Error('Falha ao carregar o arquivo de conteúdo');
            return resposta.json();
        })
        .then(dados => {
            preencherConteudoSite(dados);
        })
        .catch(erro => {
            console.warn('Usando conteúdo de reserva (JSON inacessível):', erro);
            definirConteudoPadrao();
        });

    function preencherConteudoSite(dados) {
        if (!dados) return;

        // Configurações Gerais
        if (document.getElementById('titulo-aba')) document.getElementById('titulo-aba').innerText = dados.configuracoes.tituloPagina;
        if (document.getElementById('texto-rodape')) document.getElementById('texto-rodape').innerText = dados.configuracoes.textoRodape;
        
        const formularioRSVP = document.getElementById('formulario-rsvp');
        if (formularioRSVP && dados.configuracoes.idEmailRSVP) {
            formularioRSVP.action = `https://formspree.io/f/${dados.configuracoes.idEmailRSVP}`;
        }

        // Seção Início (Hero)
        if (document.getElementById('inicio-titulo')) document.getElementById('inicio-titulo').innerText = dados.inicio.titulo;
        if (document.getElementById('inicio-subtitulo')) document.getElementById('inicio-subtitulo').innerText = dados.inicio.subtitulo;
        if (document.getElementById('data-casamento')) document.getElementById('data-casamento').innerText = dados.inicio.dataCasamento;

        // Seção História
        if (document.getElementById('historia-titulo')) document.getElementById('historia-titulo').innerText = dados.historia.titulo;
        const conteudoHistoria = document.getElementById('historia-conteudo');
        if (conteudoHistoria) {
            conteudoHistoria.innerHTML = ''; 
            dados.historia.paragrafos.forEach(texto => {
                const p = document.createElement('p');
                p.innerText = texto;
                conteudoHistoria.appendChild(p);
            });
        }

        // Seção Galeria
        const gradeGaleria = document.getElementById('grade-galeria');
        if (gradeGaleria) {
            gradeGaleria.innerHTML = '';
            dados.galeria.forEach(item => {
                const itemGaleria = document.createElement('div');
                itemGaleria.className = 'item-galeria';
                itemGaleria.innerHTML = `
                    <img src="${item.url}" alt="${item.descricao}" loading="lazy">
                    <div class="sobreposicao-galeria">
                        <h3>${item.local}</h3>
                        <p>${item.data}</p>
                    </div>
                `;
                
                itemGaleria.addEventListener('click', () => {
                    const modalImagem = document.getElementById('modal-imagem');
                    const imgModal = document.getElementById('img-modal');
                    const legendaModal = document.getElementById('legenda-modal');
                    if (modalImagem && imgModal) {
                        modalImagem.style.display = "block";
                        imgModal.src = item.url;
                        legendaModal.innerHTML = `<strong>${item.local} (${item.data})</strong><br>${item.descricao}`;
                    }
                });
                gradeGaleria.appendChild(itemGaleria);
            });
        }

        // Seção Traje
        if (document.getElementById('traje-titulo')) document.getElementById('traje-titulo').innerText = dados.traje.titulo;
        if (document.getElementById('traje-descricao')) document.getElementById('traje-descricao').innerHTML = dados.traje.descricao;
        if (document.getElementById('traje-mulheres')) document.getElementById('traje-mulheres').innerHTML = dados.traje.dicaMulheres;
        if (document.getElementById('traje-homens')) document.getElementById('traje-homens').innerHTML = dados.traje.dicaHomens;

        // Seção Dúvidas (FAQ)
        if (document.getElementById('duvidas-titulo')) document.getElementById('duvidas-titulo').innerText = dados.configuracoes.tituloDuvidas || "Dúvidas Frequentes";
        const gradeDuvidas = document.getElementById('grade-duvidas');
        if (gradeDuvidas) {
            gradeDuvidas.innerHTML = '';
            dados.duvidas.forEach(item => {
                const itemDuvida = document.createElement('div');
                itemDuvida.className = 'item-duvida';
                itemDuvida.innerHTML = `
                    <h4 style="color: #d4af37; margin-bottom: 10px;">${item.pergunta}</h4>
                    <p>${item.resposta}</p>
                `;
                gradeDuvidas.appendChild(itemDuvida);
            });
        }

        // Seção Dicas (Artigos/Blog) - NOVO para AdSense
        const containerArtigos = document.getElementById('container-artigos');
        if (containerArtigos && dados.artigos) {
            containerArtigos.innerHTML = '';
            dados.artigos.forEach(artigo => {
                const itemArtigo = document.createElement('article');
                itemArtigo.className = 'item-artigo';
                itemArtigo.style.backgroundColor = '#fff';
                itemArtigo.style.padding = '25px';
                itemArtigo.style.borderRadius = '10px';
                itemArtigo.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
                itemArtigo.innerHTML = `
                    <h3 style="color: #d4af37; font-family: 'Playfair Display', serif; margin-bottom: 15px;">${artigo.titulo}</h3>
                    <p style="font-weight: 600; font-size: 0.9em; margin-bottom: 15px; color: #555;">${artigo.resumo}</p>
                    <p style="font-size: 0.95em; line-height: 1.6; color: #666;">${artigo.conteudo}</p>
                `;
                containerArtigos.appendChild(itemArtigo);
            });
        }

        // Seção Confirmação (RSVP)
        if (document.getElementById('confirmacao-titulo')) document.getElementById('confirmacao-titulo').innerText = dados.confirmacao.titulo;
        if (document.getElementById('confirmacao-introducao')) {
            document.getElementById('confirmacao-introducao').innerText = `${dados.confirmacao.introducao} Por favor, confirme até o dia ${dados.confirmacao.dataLimite}.`;
        }

        // Seção Presentes
        if (document.getElementById('presente-shopee')) document.getElementById('presente-shopee').href = dados.presentes.shopee;
        if (document.getElementById('presente-ml')) document.getElementById('presente-ml').href = dados.presentes.mercadolivre;

        // Seção Localização
        if (document.getElementById('local-titulo')) document.getElementById('local-titulo').innerText = dados.localizacao.titulo;
        if (document.getElementById('nome-local')) document.getElementById('nome-local').innerText = dados.localizacao.nomeLocal;
        if (document.getElementById('endereco-local')) document.getElementById('endereco-local').innerText = dados.localizacao.endereco;
        if (document.getElementById('cidade-local')) document.getElementById('cidade-local').innerText = dados.localizacao.cidade;
        if (document.getElementById('link-mapa')) document.getElementById('link-mapa').href = dados.localizacao.linkMapa;
        if (document.getElementById('iframe-mapa')) document.getElementById('iframe-mapa').src = dados.localizacao.urlMapaIncorporado;
    }

    function definirConteudoPadrao() {
        if (document.getElementById('texto-rodape')) document.getElementById('texto-rodape').innerText = "© 2026 Rodrigo & Jennifer.";
        if (document.getElementById('iframe-mapa')) document.getElementById('iframe-mapa').src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.5654512967265!2d-43.998393!3d-19.939223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa697a8731d6159%3A0x868b417e13768826!2sR.+Aguanil%2C+Belo+Horizonte+-+MG!5e0!3m2!1spt-BR!2sbr!4v1710860000000!5m2!1spt-BR!2sbr";
    }

    // --- Lógica de Modais e Navegação ---
    
    const modalAfiliado = document.getElementById('modal-afiliado');
    const modalSucessoRSVP = document.getElementById('modal-sucesso-rsvp');
    const btnFecharSucesso = document.getElementById('btn-fechar-sucesso');
    const btnConfirmarAfiliado = document.getElementById('btn-confirmar-afiliado');
    const bannerCookies = document.getElementById('banner-cookies');
    const btnAceitarCookies = document.getElementById('btn-aceitar-cookies');
    const modalImagem = document.getElementById('modal-imagem');
    const btnFecharModal = document.querySelector('.fechar-modal');
    
    let urlAfiliadoPendente = '';

    // Links de Afiliados
    document.body.addEventListener('click', (e) => {
        const btnPresente = e.target.closest('.btn-presente');
        if (btnPresente) {
            e.preventDefault();
            urlAfiliadoPendente = btnPresente.href;
            if (modalAfiliado) modalAfiliado.style.display = 'block';
        }
    });

    if (btnConfirmarAfiliado) {
        btnConfirmarAfiliado.addEventListener('click', () => {
            if (urlAfiliadoPendente && urlAfiliadoPendente !== '#' && !urlAfiliadoPendente.endsWith('#')) {
                window.open(urlAfiliadoPendente, '_blank');
                if (modalAfiliado) modalAfiliado.style.display = 'none';
                urlAfiliadoPendente = '';
            } else {
                if (modalAfiliado) modalAfiliado.style.display = 'none';
                alert('O link está sendo carregado. Por favor, tente novamente ou recarregue a página.');
            }
        });
    }

    // Formulário RSVP
    const formularioRSVP = document.getElementById('formulario-rsvp');
    if (formularioRSVP) {
        formularioRSVP.addEventListener('submit', async (e) => {
            e.preventDefault();
            const dadosForm = new FormData(formularioRSVP);
            const btnEnviar = formularioRSVP.querySelector('button[type="submit"]');
            const textoOriginalBtn = btnEnviar.innerText;
            btnEnviar.innerText = 'Enviando...';
            btnEnviar.disabled = true;

            try {
                const resposta = await fetch(formularioRSVP.action, {
                    method: 'POST',
                    body: dadosForm,
                    headers: { 'Accept': 'application/json' }
                });
                if (resposta.ok) {
                    if (modalSucessoRSVP) modalSucessoRSVP.style.display = 'block';
                    formularioRSVP.reset();
                } else {
                    alert('Erro ao enviar. Tente novamente mais tarde.');
                }
            } catch (erro) {
                alert('Erro ao enviar. Verifique sua conexão.');
            } finally {
                btnEnviar.innerText = textoOriginalBtn;
                btnEnviar.disabled = false;
            }
        });
    }

    // Banner de Cookies
    if (bannerCookies && !localStorage.getItem('cookies-aceitos')) {
        bannerCookies.style.display = 'block';
    }
    if (btnAceitarCookies) {
        btnAceitarCookies.addEventListener('click', () => {
            localStorage.setItem('cookies-aceitos', 'true');
            bannerCookies.style.display = 'none';
        });
    }

    // Fechar Modais
    if (btnFecharModal) btnFecharModal.onclick = () => modalImagem.style.display = "none";
    if (btnFecharSucesso) btnFecharSucesso.onclick = () => modalSucessoRSVP.style.display = "none";

    window.onclick = (evento) => {
        if (evento.target == modalImagem) modalImagem.style.display = "none";
        if (evento.target == modalAfiliado) modalAfiliado.style.display = "none";
        if (evento.target == modalSucessoRSVP) modalSucessoRSVP.style.display = "none";
    };

    // Scroll Suave (Navegação Horizontal)
    document.querySelectorAll('header nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            const idAlvo = this.getAttribute('href');
            if (idAlvo.startsWith('#')) {
                e.preventDefault();
                const elementoAlvo = document.querySelector(idAlvo);
                if (elementoAlvo) {
                    window.scrollTo({
                        top: elementoAlvo.offsetTop - 40,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
