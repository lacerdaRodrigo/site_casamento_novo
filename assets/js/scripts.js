// Scripts para o site de casamento de Rodrigo & Jennifer

document.addEventListener('DOMContentLoaded', () => {
    console.log('Site de Rodrigo & Jennifer carregado com sucesso!');
    
    // Elementos Compartilhados
    const imageModal = document.getElementById('image-modal');
    const affiliateModal = document.getElementById('affiliate-modal');
    const rsvpSuccessModal = document.getElementById('rsvp-success-modal');
    const closeRsvpSuccessBtn = document.getElementById('close-rsvp-success');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const closeBtn = document.querySelector('.modal-close');
    const confirmAffiliateBtn = document.getElementById('confirm-affiliate');
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    
    let pendingAffiliateUrl = '';

    // 1. Carregar Galeria
    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
        fetch('assets/data/gallery.json')
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {
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
                        imageModal.style.display = "block";
                        modalImg.src = item.url;
                        modalCaption.innerHTML = `<strong>${item.location} (${item.date})</strong><br>${item.description}`;
                    });

                    galleryGrid.appendChild(galleryItem);
                });
            })
            .catch(error => console.error('Erro ao carregar galeria:', error));
    }

    // 2. Links de Afiliados com Confirmação
    const giftLinks = document.querySelectorAll('.gift-btn');
    giftLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            pendingAffiliateUrl = link.href;
            affiliateModal.style.display = 'block';
        });
    });

    if (confirmAffiliateBtn) {
        confirmAffiliateBtn.addEventListener('click', () => {
            if (pendingAffiliateUrl) {
                window.open(pendingAffiliateUrl, '_blank');
                affiliateModal.style.display = 'none';
                pendingAffiliateUrl = '';
            }
        });
    }

    // 3. Formulário RSVP
    const rsvpForm = document.getElementById('rsvp-form');
    const formStatus = document.getElementById('form-status');

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = new FormData(rsvpForm);
            
            // Alterar o estado do botão
            const submitBtn = rsvpForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Enviando...';
            submitBtn.disabled = true;

            try {
                const response = await fetch(rsvpForm.action, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Exibir o popup de sucesso
                    rsvpSuccessModal.style.display = 'block';
                    rsvpForm.reset();
                    if (formStatus) formStatus.style.display = 'none';
                } else {
                    const result = await response.json();
                    if (Object.hasOwn(result, 'errors')) {
                        formStatus.innerText = result.errors.map(error => error.message).join(", ");
                    } else {
                        formStatus.innerText = 'Ops! Ocorreu um erro ao enviar. Tente novamente mais tarde.';
                    }
                    formStatus.className = 'form-status status-error';
                    formStatus.style.display = 'block';
                }
            } catch (error) {
                formStatus.innerText = 'Ops! Ocorreu um erro ao enviar. Verifique sua conexão.';
                formStatus.className = 'form-status status-error';
                formStatus.style.display = 'block';
            } finally {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // 4. Lógica de Cookies (LGPD)
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
    if (closeBtn) {
        closeBtn.onclick = () => {
            imageModal.style.display = "none";
        };
    }

    if (closeRsvpSuccessBtn) {
        closeRsvpSuccessBtn.onclick = () => {
            rsvpSuccessModal.style.display = "none";
        };
    }

    window.onclick = (event) => {
        if (event.target == imageModal) {
            imageModal.style.display = "none";
        }
        if (event.target == affiliateModal) {
            affiliateModal.style.display = "none";
        }
        if (event.target == rsvpSuccessModal) {
            rsvpSuccessModal.style.display = "none";
        }
    };

    // 5. Scroll Suave para links do menu
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
