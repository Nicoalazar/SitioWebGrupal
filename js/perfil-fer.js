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
        
        const textoHTML = `
            <div style="width: 100%; height: 100%; min-height: 120px; display: flex; align-items: center; justify-content: center; text-align: center; padding: 20px; font-size: 0.95rem; background-color: #1a1a2e; color: #00ffcc; border-radius: 12px; box-sizing: border-box; border: 2px solid #00ffcc;">
                Pase nomás! Sientese como en casa y salú! 🍷
            </div>
        `;

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

    // --- 3. CREAR E INYECTAR BOTONES DE NAVEGACIÓN ABAJO ---
    const navContainer = document.createElement('div');
    navContainer.style.display = 'flex';
    navContainer.style.justifyContent = 'space-between';
    navContainer.style.margin = '35px auto';
    navContainer.style.width = '100%';
    navContainer.style.padding = '0';

    navContainer.innerHTML = `
        <a href="laura-blanco.html" style="background-color: white; color: #1a1a2e; padding: 12px 24px; border-radius: 30px; text-decoration: none; font-weight: bold; font-size: 0.9rem; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">← Perfil anterior (Laura Blanco)</a>
        <a href="laura-olivera.html" style="background-color: white; color: #1a1a2e; padding: 12px 24px; border-radius: 30px; text-decoration: none; font-weight: bold; font-size: 0.9rem; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">Siguiente perfil (Laura Olivera) →</a>
    `;

    let enlaceVolver = null;
    document.querySelectorAll('a').forEach(a => {
        if (a.textContent.includes('Volver al equipo')) {
            enlaceVolver = a;
        }
    });

    if (enlaceVolver && enlaceVolver.parentNode) {
        enlaceVolver.parentNode.insertBefore(navContainer, enlaceVolver);
    } else {
        document.body.appendChild(navContainer);
    }
});