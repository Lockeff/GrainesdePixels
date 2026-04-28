document.addEventListener('DOMContentLoaded', () => {
  // === 1) MENU BURGER MOBILE ===
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('nav ul');
  const contentSections = document.querySelectorAll('.content-section');

  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('active');
    
    // Ajouter/supprimer le flou sur toutes les sections de contenu
    contentSections.forEach(section => {
      section.classList.toggle('blur');
    });
  });

  // Fermer le menu et enlever le flou si on clique en dehors
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('nav-active')) {
      nav.classList.remove('nav-active');
      burger.classList.remove('active');
      contentSections.forEach(section => {
        section.classList.remove('blur');
      });
    }
  });

  // === 2) NAVIGATION ENTRE SECTIONS PAR LIENS ===
  const sections = document.querySelectorAll('.content-section');
  const headerHeight = document.querySelector('header').offsetHeight;

  // Fonction pour gérer les \n dans les descriptions
  function processLineBreaks(text) {
    return text.replace(/\n/g, '<br>');
  }

  // Fonction pour scroller avec un offset
  function scrollToSectionWithOffset(section) {
    const sectionTop = section.getBoundingClientRect().top + window.scrollY - (headerHeight + 150);
    window.scrollTo({ top: sectionTop, behavior: 'smooth' });
  }

  // Fonction pour gérer la navigation
  function handleNavigation(targetId) {
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      // Masquer toutes les sections
      sections.forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('blur');
      });

      // Afficher la section cible
      targetSection.classList.remove('hidden');

      // Fermer le menu burger si ouvert
      if (nav.classList.contains('nav-active')) {
        nav.classList.remove('nav-active');
        burger.classList.remove('active');
        // Retirer le blur de toutes les sections lors de la fermeture du menu
        contentSections.forEach(section => {
          section.classList.remove('blur');
        });
      }

      // Scroller vers la section
      scrollToSectionWithOffset(targetSection);

      // Initialiser le carrousel 3D si c'est la section mes-projets
      if (targetId === 'mes-projets') {
        setTimeout(() => initProjectsCarousel(), 100);
      }
    }
  }

  // Gestion des liens de navigation
  document.addEventListener('click', (e) => {
    // Vérifier si le clic est sur un lien avec href="#..."
    if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
      e.preventDefault();
      const targetId = e.target.getAttribute('href').substring(1);
      handleNavigation(targetId);
    }
  });

  // === 3) CARROUSEL 3D PROJETS (Style LOKOSITEWEB) ===
  function initProjectsCarousel() {
    const container = document.getElementById('projectsImageContainer');
    const images = document.querySelectorAll('.project-image');
    const prevBtn = document.getElementById('projectsPrev');
    const nextBtn = document.getElementById('projectsNext');
    const nameEl = document.getElementById('projectsName');
    const quoteEl = document.getElementById('projectsQuote');
    
    if (!container || images.length === 0) return;
    
    let activeIndex = 0;
    let autoplayInterval = null;
    const autoplayDelay = 10000;
    let containerWidth = container.offsetWidth;
    
    // Données des projets
    const projects = [
      { 
        name: '2 étoiles sont nées',
        url: 'https://2etoiles.com',
        quote: 'Deux étoiles sont nées est un jeu d\'aventure/plateforme coopératif en 3D. Le joueur contrôlera deux personnages (ou deux joueurs contrôleront un personnage chacun) qui devront évoluer dans un univers étrange et brumeux où la gravité dépend des sentiments. Chaque personnage aura des pouvoirs propres (voler, téléportation, …) qui leur permettront d\'avancer dans les niveaux.' 
      },
      { 
        name: 'Kelc\'h AR Viya',
        url: 'https://www.lecycledelavia.com/',
        quote: 'Un Action/RPG d\'exploration narratif mettant en scène des combats épiques et exploration spatiale. Nous sommes en 2150 et le joueur incarne un personnage qu\'il crée et personnalise, Terrien(ne), s\'enrôlé dans une coalition terrienne/éraiée. Le but de cette organisation est d\'explorer l\'espace pour trouver des alliés face aux Tosieas.' 
      }
    ];
    
    function calculateGap(width) {
      const minWidth = 1024;
      const maxWidth = 1456;
      const minGap = 60;
      const maxGap = 86;
      if (width <= minWidth) return minGap;
      if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
      return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
    }
    
    function getImageStyle(index) {
      const gap = calculateGap(containerWidth);
      const maxStickUp = gap * 0.8;
      const projectsLength = images.length;
      const offset = (index - activeIndex + projectsLength) % projectsLength;
      const isActive = index === activeIndex;
      const isLeft = (activeIndex - 1 + projectsLength) % projectsLength === index;
      const isRight = (activeIndex + 1) % projectsLength === index;
      
      if (isActive) {
        return {
          zIndex: 3,
          opacity: 1,
          pointerEvents: 'auto',
          transform: 'translateX(0px) translateY(0px) scale(1) rotateY(0deg)',
          transition: 'all 0.8s cubic-bezier(.4,2,.3,1)'
        };
      }
      if (isLeft) {
        return {
          zIndex: 2,
          opacity: 1,
          pointerEvents: 'auto',
          transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
          transition: 'all 0.8s cubic-bezier(.4,2,.3,1)'
        };
      }
      if (isRight) {
        return {
          zIndex: 2,
          opacity: 1,
          pointerEvents: 'auto',
          transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
          transition: 'all 0.8s cubic-bezier(.4,2,.3,1)'
        };
      }
      return {
        zIndex: 1,
        opacity: 0,
        pointerEvents: 'none',
        transition: 'all 0.8s cubic-bezier(.4,2,.3,1)'
      };
    }
    
    function updateImages() {
      images.forEach((img, index) => {
        const style = getImageStyle(index);
        Object.assign(img.style, style);
      });
    }
    
    function animateQuote(text) {
      const words = text.split(' ');
      let html = words.map((word, i) => 
        `<span class="word" style="filter: blur(10px); opacity: 0; transform: translateY(5px); transition: filter 0.22s ease ${0.025 * i}s, opacity 0.22s ease ${0.025 * i}s, transform 0.22s ease ${0.025 * i}s;">${word}</span>`
      ).join(' ');
      
      quoteEl.innerHTML = html;
      
      setTimeout(() => {
        quoteEl.querySelectorAll('.word').forEach(word => {
          word.style.filter = 'blur(0px)';
          word.style.opacity = '1';
          word.style.transform = 'translateY(0px)';
        });
      }, 50);
    }
    
    function updateContent() {
      const project = projects[activeIndex];
      nameEl.textContent = project.name;
      animateQuote(project.quote);
      updateImages();
    }
    
    function handleNext() {
      activeIndex = (activeIndex + 1) % images.length;
      if (autoplayInterval) clearInterval(autoplayInterval);
      updateContent();
      startAutoplay();
    }
    
    function handlePrev() {
      activeIndex = (activeIndex - 1 + images.length) % images.length;
      if (autoplayInterval) clearInterval(autoplayInterval);
      updateContent();
      startAutoplay();
    }
    
    function startAutoplay() {
      if (autoplayInterval) clearInterval(autoplayInterval);
      autoplayInterval = setInterval(handleNext, autoplayDelay);
    }
    
    function handleResize() {
      containerWidth = container.offsetWidth;
      updateImages();
    }
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', handlePrev);
    if (nextBtn) nextBtn.addEventListener('click', handleNext);
    
    window.addEventListener('resize', handleResize);
    
    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    });

    // Swipe tactile (mobile)
    const swipeZone = container.closest('.projects-container');
    if (swipeZone) {
      let touchStartX = 0;
      let touchStartY = 0;
      const minSwipe = 50;
      swipeZone.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }, { passive: true });
      swipeZone.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        if (Math.abs(deltaX) < minSwipe) return;
        if (Math.abs(deltaX) <= Math.abs(deltaY)) return;
        if (deltaX > 0) handlePrev();
        else handleNext();
      }, { passive: true });
    }

    // Click sur les images pour ouvrir l'URL
    images.forEach((img, index) => {
      img.addEventListener('click', () => {
        const project = projects[index];
        if (project && project.url) {
          window.open(project.url, '_blank');
        }
      });
    });
    
     // Initialize
    updateContent();
    startAutoplay();
  }

  // === 4) CONTACT FORM HANDLING ===
  const form = document.getElementById('contact-form');
  const spinner = document.getElementById('loading-spinner');
  // Masquer le spinner au chargement
  spinner.classList.add('hiddenspinner');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    // Affiche le spinner
    spinner.classList.remove('hiddenspinner');

    // Récupérez les données du formulaire
    const formData = {
      subject: document.getElementById('subject').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value,
    };

    // Envoi via EmailJS
    emailjs
      .send('service_ydmrfnh', 'template_0fk8f5u', formData)
      .then(
        function () {
          // Cache le spinner après succès
          spinner.classList.add('hiddenspinner');
          alert('Message envoyé avec succès !');
          form.reset();
        },
        function (error) {
          // Cache le spinner après échec
          spinner.classList.add('hiddenspinner');
          alert('Une erreur est survenue lors de l\'envoi.');
          console.error('EmailJS Error:', error);
        }
      );
  });
});