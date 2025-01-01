document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('.content-section');
    const projectDetailsSection = document.getElementById('project-details');
  
    // Fonction pour gérer les \n dans les descriptions
    function processLineBreaks(text) {
      return text.replace(/\n/g, '<br>');
    }
  
    // Navigation entre les sections
    links.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        sections.forEach(section => section.classList.add('hidden'));
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) targetSection.classList.remove('hidden');
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
  
        sections.forEach(section => section.classList.add('hidden'));
        projectDetailsSection.classList.remove('hidden');
      });
    });
  
    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const subject = document.getElementById('subject').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        window.location.href = `mailto:lockeff@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}&reply-to=${encodeURIComponent(email)}`;
      });
    }
  });