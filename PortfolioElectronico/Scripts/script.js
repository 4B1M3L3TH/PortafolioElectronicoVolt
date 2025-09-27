function downloadPDF() {
            // Descargar el archivo PDF que está en la carpeta del proyecto
            const pdfPath = '../Assets/diagrama_clases.pdf'; // Ajusta la ruta según la ubicación real del PDF
            const link = document.createElement('a');
            link.href = pdfPath;
            link.download = 'diagrama_clases.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            console.log('Descarga iniciada del PDF del diagrama de clases');
        }



        function toggleImageExpansion(container) {
            const placeholder = container.querySelector('.image-placeholder');
            const isExpanded = placeholder.classList.contains('expanded');
            
            // Close all other expanded images first
            document.querySelectorAll('.image-placeholder.expanded').forEach(el => {
                if (el !== placeholder) {
                    el.classList.remove('expanded');
                    el.parentElement.classList.remove('expanded');
                }
            });
            
            // Toggle current image
            if (isExpanded) {
                placeholder.classList.remove('expanded');
                container.classList.remove('expanded');
            } else {
                placeholder.classList.add('expanded');
                container.classList.add('expanded');
                
                // Smooth scroll to show the expanded content
                setTimeout(() => {
                    placeholder.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }, 200);
            }
        }

        // Animación de aparición al hacer scroll
        function observeElements() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            // Observar todos los elementos con clase fade-in
            document.querySelectorAll('.fade-in').forEach(el => {
                observer.observe(el);
            });
        }

        // Navegación suave
        function setupSmoothNavigation() {
            document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }

        // Inicializar cuando el DOM esté listo
        document.addEventListener('DOMContentLoaded', function() {
            observeElements();
            setupSmoothNavigation();
            
            // Mostrar el primer elemento inmediatamente
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                heroSection.classList.add('visible');
            }
        });

        // Optimización para dispositivos móviles
        let touchStartY = 0;
        let touchEndY = 0;

        document.addEventListener('touchstart', function(event) {
            touchStartY = event.changedTouches[0].screenY;
        });

        document.addEventListener('touchend', function(event) {
            touchEndY = event.changedTouches[0].screenY;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartY - touchEndY;
            
            if (Math.abs(diff) > swipeThreshold) {
                // Aquí se pueden agregar acciones de swipe si es necesario
                console.log('Swipe detectado:', diff > 0 ? 'arriba' : 'abajo');
            }
        }

        // Prevenir zoom en doble tap en iOS
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function (event) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);