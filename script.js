document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audioPlayer');
          audioPlayer.volume = 0.5; // Volume par défaut (20 %)
          // Variable pour vérifier si la musique a déjà été lancée
        let musicStarted = false;

        // Fonction pour jouer la musique
        function playMusicOnMouseMove() {
            if (!musicStarted) { // Vérifie si la musique n'a pas encore démarré
                const audioPlayer = document.getElementById('audioPlayer');
                audioPlayer.volume = 0.2; // Volume bas par défaut
                audioPlayer.play(); // Lance la musique
                musicStarted = true; // Empêche de relancer la musique
                console.log("Musique lancée");
            }
        }

        // Écoute l'événement de mouvement de souris
        document.addEventListener("mousemove", playMusicOnMouseMove);
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
  });

  //Gestion email
  document.addEventListener('DOMContentLoaded', () => {
    // Initialisation d'EmailJS
    emailjs.init("txJe8zJfMCZj4vg1n"); // Remplacez par votre clé publique
  
    // Récupérez les éléments du DOM
    const form = document.getElementById("contact-form");
    const spinner = document.getElementById("loading-spinner");
  
    // Assurez-vous que le spinner est masqué au chargement
    spinner.classList.add("hiddenspinner");
  
    // Gestion du formulaire de contact
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Empêche le rechargement de la page
  
      // Affiche le spinner
      spinner.classList.remove("hiddenspinner");
  
      // Récupérez les données du formulaire
      const formData = {
        subject: document.getElementById("subject").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
      };
  
      // Envoyez les données via EmailJS
      emailjs
        .send("service_ydmrfnh", "template_0fk8f5u", formData)
        .then(
          function () {
            // Cache le spinner après succès
            spinner.classList.add("hiddenspinner");
            alert("Message envoyé avec succès !");
            form.reset();
          },
          function (error) {
            // Cache le spinner après échec
            spinner.classList.add("hiddenspinner");
            alert("Une erreur est survenue lors de l'envoi.");
            console.error("EmailJS Error:", error);
          }
        );
    });
  });