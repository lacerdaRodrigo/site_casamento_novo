// Scripts dinâmicos para o site de casamento - Versão Corrigida 3.1

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Carregar todos os dados do site via JSON
    // Se estiver rodando localmente sem servidor, o catch será acionado.
    fetch('assets/data/content.json')
        .then(response => {
            if (!response.ok) throw new Error('Falha ao carregar JSON');
            return response.json();
        })
        .then(data => {
            populateSiteContent(data);
        })
        .catch(error => {
            console.warn('Usando conteúdo estático (JSON inacessível):', error);
            // Preenchimento manual mínimo caso o JSON falhe
            setDefaultContent();
        });

    function populateSiteContent(data) {
        if (!data) return;

        // Configurações Gerais
        if (document.getElementById('page-title')) document.getElementById('page-title').innerText = data.settings.pageTitle;
        if (document.getElementById('footer-text')) document.getElementById('footer-text').innerText = data.settings.footerText;
        
        const rsvpForm = document.getElementById('rsvp-form');
        if (rsvpForm && data.settings.rsvpEmailId) {
            rsvpForm.action = `https://formspree.io/f/${data.settings.rsvpEmailId}`;
        }

        // Hero
        if (document.getElementById('hero-title')) document.getElementById('hero-title').innerText = data.hero.title;
        if (document.getElementById('hero-subtitle')) document.getElementById('hero-subtitle').innerText = data.hero.subtitle;
        if (document.getElementById('wedding-date')) document.getElementById('wedding-date').innerText = data.hero.weddingDate;

        // História
        if (document.getElementById('story-title')) document.getElementById('story-title').innerText = data.story.title;
        const storyContent = document.getElementById('story-content');
        if (storyContent) {
            storyContent.innerHTML = ''; // Limpa
            data.story.paragraphs.forEach(text => {
                const p = document.createElement('p');
                p.innerText = text;
                storyContent.appendChild(p);
            });
        }

        // Galeria
        const galleryGrid = document.getElementById('gallery-grid');
        if (galleryGrid) {
            galleryGrid.innerHTML = '';
            data.gallery.forEach(item => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.innerHTML = `
                    <img src="${item.url}" alt="${item.description}" loading="lazy">
                    <div class="gallery-overlay">
                        <h3>${item.location}</h3>
                        <p>${item.date}</p>
                    </div>
                `;
                
                galleryItem.addEventListener('click', () => {
                    const imageModal = document.getElementById('image-modal');
                    const modalImg = document.getElementById('modal-img');
                    const modalCaption = document.getElementById('modal-caption');
                    if (imageModal && modalImg) {
                        imageModal.style.display = "block";
                        modalImg.src = item.url;
                        modalCaption.innerHTML = `<strong>${item.location} (${item.date})</strong><br>${item.description}`;
                    }
                });
                galleryGrid.appendChild(galleryItem);
            });
        }

        // Traje
        if (document.getElementById('traje-title')) document.getElementById('traje-title').innerText = data.traje.title;
        if (document.getElementById('traje-description')) document.getElementById('traje-description').innerHTML = data.traje.description;
        if (document.getElementById('traje-mulheres')) document.getElementById('traje-mulheres').innerHTML = data.traje.dicaMulheres;
        if (document.getElementById('traje-homens')) document.getElementById('traje-homens').innerHTML = data.traje.dicaHomens;

        // FAQ
        if (document.getElementById('faq-title')) document.getElementById('faq-title').innerText = data.faq.title || "Perguntas Frequentes";
        const faqGrid = document.getElementById('faq-grid');
        if (faqGrid) {
            faqGrid.innerHTML = '';
            data.faq.forEach(item => {
                const faqItem = document.createElement('div');
                faqItem.className = 'faq-item';
                faqItem.innerHTML = `
                    <h4 style="color: #d4af37; margin-bottom: 10px;">${item.question}</h4>
                    <p>${item.answer}</p>
                `;
                faqGrid.appendChild(faqItem);
            });
        }

        // RSVP
        if (document.getElementById('rsvp-title')) document.getElementById('rsvp-title').innerText = data.rsvp.title;
        if (document.getElementById('rsvp-intro')) {
            document.getElementById('rsvp-intro').innerText = `${data.rsvp.intro} Por favor, confirme até o dia ${data.rsvp.limitDate}.`;
        }

        // Presentes
        if (document.getElementById('gift-shopee')) document.getElementById('gift-shopee').href = data.gifts.shopee;
        if (document.getElementById('gift-ml')) document.getElementById('gift-ml').href = data.gifts.mercadolivre;

        // Local
        if (document.getElementById('local-title')) document.getElementById('local-title').innerText = data.location.title;
        if (document.getElementById('venue-name')) document.getElementById('venue-name').innerText = data.location.venue;
        if (document.getElementById('venue-address')) document.getElementById('venue-address').innerText = data.location.address;
        if (document.getElementById('venue-city')) document.getElementById('venue-city').innerText = data.location.city;
        if (document.getElementById('maps-link')) document.getElementById('maps-link').href = data.location.mapsLink;
        if (document.getElementById('map-iframe')) document.getElementById('map-iframe').src = data.location.embedUrl;
    }

    function setDefaultContent() {
        // Fallback básico para o site não ficar em branco caso abra sem servidor
        if (document.getElementById('footer-text')) document.getElementById('footer-text').innerText = "© 2026 Rodrigo & Jennifer.";
        if (document.getElementById('map-iframe')) document.getElementById('map-iframe').src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.5654512967265!2d-43.998393!3d-19.939223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa697a8731d6159%3A0x868b417e13768826!2sR.+Aguanil%2C+Belo+Horizonte+-+MG!5e0!3m2!1spt-BR!2sbr!4v1710860000000!5m2!1spt-BR!2sbr";
    }

    // --- Lógica de Modais, Menu e Formulários ---
    
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navList.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navList.classList.remove('active');
            });
        });
    }

    const affiliateModal = document.getElementById('affiliate-modal');
    const rsvpSuccessModal = document.getElementById('rsvp-success-modal');
    const closeRsvpSuccessBtn = document.getElementById('close-rsvp-success');
    const confirmAffiliateBtn = document.getElementById('confirm-affiliate');
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const imageModal = document.getElementById('image-modal');
    const closeBtn = document.querySelector('.modal-close');
    
    let pendingAffiliateUrl = '';

    // Links de Afiliados
    document.body.addEventListener('click', (e) => {
        const giftBtn = e.target.closest('.gift-btn');
        if (giftBtn) {
            e.preventDefault();
            pendingAffiliateUrl = giftBtn.href;
            if (affiliateModal) affiliateModal.style.display = 'block';
        }
    });

    if (confirmAffiliateBtn) {
        confirmAffiliateBtn.addEventListener('click', () => {
            if (pendingAffiliateUrl && pendingAffiliateUrl !== '#' && !pendingAffiliateUrl.endsWith('#')) {
                window.open(pendingAffiliateUrl, '_blank');
                if (affiliateModal) affiliateModal.style.display = 'none';
                pendingAffiliateUrl = '';
            } else {
                // Se o JSON não carregou, o link pode estar como '#'
                if (affiliateModal) affiliateModal.style.display = 'none';
                alert('O link está sendo carregado. Por favor, tente novamente em instantes ou recarregue a página.');
            }
        });
    }

    // Formulário RSVP
    const rsvpForm = document.getElementById('rsvp-form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(rsvpForm);
            const submitBtn = rsvpForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Enviando...';
            submitBtn.disabled = true;

            try {
                const response = await fetch(rsvpForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    if (rsvpSuccessModal) rsvpSuccessModal.style.display = 'block';
                    rsvpForm.reset();
                } else {
                    alert('Erro ao enviar. Tente novamente mais tarde.');
                }
            } catch (error) {
                alert('Erro ao enviar. Verifique sua conexão.');
            } finally {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // Cookies
    if (cookieBanner && !localStorage.getItem('cookies-accepted')) {
        cookieBanner.style.display = 'block';
    }
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookies-accepted', 'true');
            cookieBanner.style.display = 'none';
        });
    }

    // Fechar modais
    if (closeBtn) closeBtn.onclick = () => imageModal.style.display = "none";
    if (closeRsvpSuccessBtn) closeRsvpSuccessBtn.onclick = () => rsvpSuccessModal.style.display = "none";

    window.onclick = (event) => {
        if (event.target == imageModal) imageModal.style.display = "none";
        if (event.target == affiliateModal) affiliateModal.style.display = "none";
        if (event.target == rsvpSuccessModal) rsvpSuccessModal.style.display = "none";
    };

    // Scroll Suave
    document.querySelectorAll('header nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
