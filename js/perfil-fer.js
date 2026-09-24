document.addEventListener('DOMContentLoaded', () => {
    // --- 1. LÓGICA DE LOS DISCOS ---
    const discos = document.querySelectorAll('.discos-list li');

    discos.forEach((disco) => {
        const extra = disco.querySelector('.disco-extra');

        if (extra) {
            extra.style.display = 'none';
        }

        disco.style.cursor = 'pointer';
        disco.setAttribute('tabindex', '0');
        disco.setAttribute('aria-expanded', 'false');

        const toggle = () => {
            const expandido = disco.getAttribute('aria-expanded') === 'true';

            if (expandido) {
                if (extra) extra.style.display = 'none';
                disco.setAttribute('aria-expanded', 'false');
            } else {
                if (extra) extra.style.display = 'inline';
                disco.setAttribute('aria-expanded', 'true');
            }
        };

        disco.addEventListener('click', toggle);
        disco.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
            }
        });
    });

    // --- 2. EFECTO DE GIRO Y RECTÁNGULO PARA LA FOTO ---
    const profilePhoto = document.querySelector('.profile-photo');

    if (profilePhoto) {
        let container = profilePhoto.parentElement;
        if (!container.classList.contains('profile-photo-container')) {
            container = document.createElement('div');
            profilePhoto.parentNode.insertBefore(container, profilePhoto);
            container.appendChild(profilePhoto);
            container.className = 'profile-photo-container';
        }

        container.style.transition = 'transform 0.4s ease';
        container.style.cursor = 'pointer';
        container.title = 'Hacé clic para ver el mensaje!';

        const fotoHTML = profilePhoto.outerHTML;

        const textoHTML = `<div class="profile-photo-flip-message">Pase nomás! Sientese como en casa y salú! 🍷</div>`;

        let mostrandoTexto = false;

        container.addEventListener('click', () => {
            container.style.transform = 'rotateY(90deg) scale(0.95)';

            setTimeout(() => {
                mostrandoTexto = !mostrandoTexto;

                if (mostrandoTexto) {
                    container.innerHTML = textoHTML;
                } else {
                    container.innerHTML = fotoHTML;
                }

                container.style.transform = 'rotateY(0deg) scale(1)';
            }, 200);
        });
    }
});