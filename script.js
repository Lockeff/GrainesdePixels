document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('nav ul li a, a[href^="#"]'); // Sélectionne les liens de navigation et internes
  const sections = document.querySelectorAll('.content-section');
  const projectDetailsSection = document.getElementById('project-details');
  const headerHeight = document.querySelector('header').offsetHeight; // Récupère la hauteur du bandeau

  // Fonction pour gérer les \n dans les descriptions
  function processLineBreaks(text) {
    return text.replace(/\n/g, '<br>');
  }

  // Fonction pour scroller avec un offset
  function scrollToSectionWithOffset(section) {
    const additionalOffset = 20; // Ajoute un espace supplémentaire de 20px
    const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - headerHeight - additionalOffset;
    window.scrollTo({ top: sectionTop, behavior: 'smooth' });
  }

  // Navigation entre les sections
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      // Masque toutes les sections
      sections.forEach(section => section.classList.add('hidden'));

      // Affiche la section cible
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.remove('hidden');
        scrollToSectionWithOffset(targetSection); // Utilise le défilement avec offset
      }
    });
  });

  // Gestion des projets
  const projects = document.querySelectorAll('.project');
  projects.forEach(project => {
    project.addEventListener('click', () => {
      const title = project.getAttribute('data-title');
      const description = processLineBreaks(project.getAttribute('data-description'));
      const missions = project.getAttribute('data-missions').split(',');
      const images = project.getAttribute('data-images').split(',');
      const buttons = JSON.parse(project.getAttribute('data-buttons') || '[]');

      // Mise à jour des détails du projet
      document.getElementById('project-title').textContent = title;
      document.getElementById('project-description').innerHTML = description;

      const missionList = document.getElementById('project-missions');
      missionList.innerHTML = '';
      missions.forEach(mission => {
        const li = document.createElement('li');
        li.textContent = mission.trim();
        missionList.appendChild(li);
      });

      const imagesContainer = document.getElementById('project-images');
      imagesContainer.innerHTML = '';
      images.forEach(image => {
        const img = document.createElement('img');
        img.src = image.trim();
        img.alt = `Image ${title}`;
        imagesContainer.appendChild(img);
      });

      const linksContainer = document.getElementById('project-links');
      linksContainer.innerHTML = '';
      buttons.forEach(button => {
        const linkButton = document.createElement('a');
        linkButton.href = button.url;
        linkButton.textContent = button.text;
        linkButton.target = '_blank';
        linkButton.classList.add('project-button');
        linksContainer.appendChild(linkButton);
      });

      // Masque toutes les sections et affiche les détails du projet
      sections.forEach(section => section.classList.add('hidden'));
      projectDetailsSection.classList.remove('hidden');
      scrollToSectionWithOffset(projectDetailsSection); // Utilise le défilement avec offset
    });
  });

  // Gestion du formulaire de contact avec EmailJS
  const form = document.getElementById('contact-form');
  const spinner = document.getElementById('loading-spinner');

  // Assurez-vous que le spinner est masqué au chargement
  spinner.classList.add('hiddenspinner');

  // Gestion du formulaire de contact
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