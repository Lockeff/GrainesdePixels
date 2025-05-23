document.addEventListener('DOMContentLoaded', () => {
  // === 1) MENU BURGER MOBILE ===
  const burger = document.getElementById('burger-menu');
  const navUl = document.querySelector('nav ul');

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navUl.classList.toggle('nav-active');
  });

  // === 2) NAVIGATION ENTRE SECTIONS PAR LIENS ===
  const links = document.querySelectorAll('nav ul li a, a[href^="#"]');
  const sections = document.querySelectorAll('.content-section');
  const projectDetailsSection = document.getElementById('project-details');
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

  // Au clic sur un lien de nav
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navUl.classList.remove('nav-active');
      burger.classList.remove('active');
      sections.forEach(section => section.classList.add('hidden'));

      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.remove('hidden');
        scrollToSectionWithOffset(targetSection);
      }
    });
  });

  // === 3) CARROUSEL ===
  const track = document.querySelector('.carousel-track');
  const trackTIER = document.querySelector('.carousel-trackTIER');
  
  if (track) {
    const slides = Array.from(track.children);
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    let currentIndex = 0;

    if (leftArrow && rightArrow) {
      // Fonction pour changer de slide
      const updateSlide = (index) => {
        track.style.transform = `translateX(-${index * 100}%)`;
      };

      // Navigation à gauche
      leftArrow.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
        updateSlide(currentIndex);
      });

      // Navigation à droite
      rightArrow.addEventListener('click', () => {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        updateSlide(currentIndex);
      });
    }
  }

  if (trackTIER) {
    const slidesTIER = Array.from(trackTIER.children);
    const leftArrowTIER = document.querySelector('.left-arrowTIER');
    const rightArrowTIER = document.querySelector('.right-arrowTIER');
    let currentIndexTIER = 0;

    if (leftArrowTIER && rightArrowTIER) {
      // Fonction pour changer de slide
      const updateSlideTIER = (index) => {
        trackTIER.style.transform = `translateX(-${index * 100}%)`;
      };

      // Navigation à gauche
      leftArrowTIER.addEventListener('click', () => {
        currentIndexTIER = (currentIndexTIER > 0) ? currentIndexTIER - 1 : slidesTIER.length - 1;
        updateSlideTIER(currentIndexTIER);
      });

      // Navigation à droite
      rightArrowTIER.addEventListener('click', () => {
        currentIndexTIER = (currentIndexTIER < slidesTIER.length - 1) ? currentIndexTIER + 1 : 0;
        updateSlideTIER(currentIndexTIER);
      });
    }
  }

  // Gérer le survol des images
  const carouselImages = document.querySelectorAll('.carousel-slide img');
  carouselImages.forEach((img) => {
    const originalSrc = img.src;
    const hoverSrc = img.dataset.hover;
    if (hoverSrc) {
      img.addEventListener('mouseenter', () => {
        img.src = hoverSrc;
      });
      img.addEventListener('mouseleave', () => {
        img.src = originalSrc;
      });
    }
  });

  // === 4) GESTION DE L'AFFICHAGE DES PROJETS (SECTION #project-details) ===
  const projects = document.querySelectorAll('.project');
  projects.forEach(project => {
    project.addEventListener('click', () => {
      // Récupérer les attributs data-*
      const title = project.getAttribute('data-title') || '';
      const rawDescription = project.getAttribute('data-description') || '';
      const description = processLineBreaks(rawDescription);  // Gérer les \n
      const missionsStr = project.getAttribute('data-missions') || '';
      const bannerSrc = project.getAttribute('data-banner') || '';

      // Boutons
      let buttons = [];
      const buttonsData = project.getAttribute('data-buttons');
      if (buttonsData) {
        try {
          buttons = JSON.parse(buttonsData); // ex: [ {text: "Lien officiel", url: "https://..." } ]
        } catch (e) {
          console.warn('Erreur parse JSON data-buttons:', e);
        }
      }

      // Images du diaporama (Dark/Glow/Big) => JSON
      let diapoImages = [];
      const imagesData = project.getAttribute('data-images') || '[]';
      try {
        diapoImages = JSON.parse(imagesData);
      } catch (e) {
        console.warn('Erreur parse JSON data-images:', e);
      }

      // === Injecter dans la section #project-details ===

      // 1) Bannière
      const projectBanner = document.getElementById('project-banner');
      projectBanner.src = bannerSrc;

      // 2) Titre
      document.getElementById('project-title').textContent = title;

      // 3) Description
      document.getElementById('project-description').innerHTML = description;

      // 4) Missions (séparées par des virgules)
      const missionList = document.getElementById('project-missions');
      missionList.innerHTML = '';
      if (missionsStr.trim() !== '') {
        const missions = missionsStr.split(',');
        missions.forEach(m => {
          const li = document.createElement('li');
          li.textContent = m.trim();
          missionList.appendChild(li);
        });
      }

      // 5) Liens (boutons)
      const linksContainer = document.getElementById('project-links');
      linksContainer.innerHTML = '';
      buttons.forEach(btn => {
        const linkButton = document.createElement('a');
        linkButton.href = btn.url;
        linkButton.textContent = btn.text;
        linkButton.target = '_blank';
        linkButton.classList.add('project-button');
        linksContainer.appendChild(linkButton);
      });

      // 6) Diaporama : grande image (#current-image) + miniatures (#thumbnails-container)
      const currentImage = document.getElementById('current-image');
      const thumbnailsContainer = document.getElementById('thumbnails-container');

      // Vider avant de régénérer
      currentImage.src = '';
      thumbnailsContainer.innerHTML = '';

      if (diapoImages.length > 0) {
        // Par défaut, on affiche la première image en grand
        currentImage.src = diapoImages[0].big;

        // Générer toutes les miniatures
        diapoImages.forEach((imgObj, index) => {
          const thumb = document.createElement('img');
          thumb.classList.add('thumbnail');

          if (index === 0) {
            thumb.classList.add('active');
            thumb.src = imgObj.dark; // La première est active => dark
          } else {
            thumb.src = imgObj.glow; // Les suivantes => glow
          }

          // Stocker les chemins dans le dataset
          thumb.dataset.big = imgObj.big;
          thumb.dataset.dark = imgObj.dark;
          thumb.dataset.glow = imgObj.glow;

          // Gestion du clic sur la miniature
          thumb.addEventListener('click', () => {
            // Mettre à jour la grande image
            currentImage.src = thumb.dataset.big;

            // Réinitialiser toutes les miniatures
            const allThumbs = thumbnailsContainer.querySelectorAll('.thumbnail');
            allThumbs.forEach(t => {
              t.classList.remove('active');
              t.src = t.dataset.glow;
            });

            // Activer celle qu'on vient de cliquer
            thumb.classList.add('active');
            thumb.src = thumb.dataset.dark;
          });

          thumbnailsContainer.appendChild(thumb);
        });
      }

      // === Afficher la section détail, masquer les autres sections ===
      sections.forEach(s => s.classList.add('hidden'));
      projectDetailsSection.classList.remove('hidden');
      scrollToSectionWithOffset(projectDetailsSection);
    });
  });

  // === 5) FORMULAIRE DE CONTACT AVEC EMAILJS ===
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

  // Fonction pour obtenir l'URL optimisée de Vercel
  function getOptimizedImageUrl(src, width = 1920, quality = 75) {
    // Si déjà une URL absolue (http, https, data), ne rien faire
    if (/^(https?:\/\/|data:)/.test(src)) return src;
    // S'assurer que le chemin commence par un slash
    if (!src.startsWith('/')) src = '/' + src.replace(/^\.\//, '');
    // Si nous sommes en développement local, utiliser l'URL directe
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return src;
    }
    // En production, utiliser l'URL optimisée de Vercel
    return `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
  }

  // Fonction pour optimiser toutes les images du site
  function optimizeAllImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Ne pas optimiser les images qui sont déjà optimisées
      if (img.src.includes('/_vercel/image')) return;

      // Déterminer la largeur optimale en fonction de la classe
      let width = 1920; // largeur par défaut
      let quality = 75; // qualité par défaut

      if (img.classList.contains('logoheader') || img.classList.contains('loader-logo')) {
        width = 400;
        quality = 90;
      } else if (img.classList.contains('flechebas') || img.classList.contains('flechedroite') || img.classList.contains('bullet')) {
        width = 100;
        quality = 90;
      } else if (img.classList.contains('news-logo')) {
        width = 800;
        quality = 80;
      }

      // Optimiser l'image source
      img.src = getOptimizedImageUrl(img.src, width, quality);

      // Optimiser l'image de hover si elle existe
      if (img.dataset.hover) {
        img.dataset.hover = getOptimizedImageUrl(img.dataset.hover, width, quality);
      }
    });
  }

  // Appeler la fonction d'optimisation après le chargement de la page
  optimizeAllImages();
});