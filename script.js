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
  const links = document.querySelectorAll('nav ul li a');
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

  // Gestion des liens du menu
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      nav.classList.remove('nav-active');
      burger.classList.remove('active');
      // Enlever le flou quand on clique sur un lien
      contentSections.forEach(section => {
        section.classList.remove('blur');
      });
      sections.forEach(section => section.classList.add('hidden'));
      const targetId = link.getAttribute('href').substring(1);
      document.getElementById(targetId).classList.remove('hidden');
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
      thumbnailsContainer.innerHTML = '';

      // Afficher la première image par défaut
      if (diapoImages.length > 0) {
        currentImage.src = diapoImages[0].big;
        
        // Créer les miniatures
        diapoImages.forEach((img, index) => {
          const thumbnail = document.createElement('img');
          thumbnail.src = img.glow;
          thumbnail.alt = `Miniature ${index + 1}`;
          thumbnail.classList.add('thumbnail');
          if (index === 0) thumbnail.classList.add('active');
          
          thumbnail.addEventListener('click', () => {
            // Mettre à jour l'image principale
            currentImage.src = img.big;
            
            // Mettre à jour l'état actif des miniatures
            document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
            thumbnail.classList.add('active');
          });
          
          thumbnailsContainer.appendChild(thumbnail);
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
});