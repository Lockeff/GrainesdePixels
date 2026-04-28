window.currentLang = localStorage.getItem('lang') || 'fr';

window.translations = {
  fr: {
    'loader-text': 'Chargement...',
    'loader-error': 'Erreur de chargement...',
    'nav-accueil': 'ACCUEIL',
    'nav-about': 'QUI SOMMES-NOUS ?',
    'nav-projects': 'NOS JEUX',
    'nav-contact': 'CONTACTS',
    'hero-title': 'NOUS CREEONS DES EMOTIONS, PIXEL PAR PIXEL',
    'hero-p': `Découvrez nos <strong><a href="#mes-projets" style="text-decoration: none; color: inherit;">projets, nos jeux</a></strong> et n'hesitez pas à <strong><a href="#contact" style="text-decoration: none; color: inherit;">nous contacter</a></strong> pour créer <strong><a href="#qui-suis-je" style="text-decoration: none; color: inherit;">ensemble</a></strong> des jeux extraordinaires !`,
    'news-title': 'DERNIERES ACTUALITEES',
    'news1-title': 'Mars 2025 : Deux Etoiles sont nées',
    'news1-p': `Le projet <strong>Deux Etoiles sont nées</strong> est maintenant lancé et devient notre priorité pour cette année 2025. Beaucoup de jalons sont à mettre en place et le premier a pour objectif de figer le Game Concept du jeu. Le détail du jeu dans <a href="#mes-projets" style="text-decoration: none; color: inherit;color: #e09eff;">Nos projets</a> !`,
    'news2-title': "Janvier 2025 : Prototype de Kelc'h AR Viya",
    'news2-p': `Le prototype de notre projet d'action/RPG narratif d'exploration spatiale est en cours de réalisation et avance bien. Quand il sera prêt, vous pourrez vous rendre dans la section <a href="#mes-projets" style="text-decoration: none; color: inherit;color: #e09eff;">Nos projets</a> pour le tester. Bientôt du nouveau !`,
    'news3-title': 'Décembre 2024 : Le site grainesdepixels.fr est en ligne !',
    'news3-p': `Et voila, l'aventure commence pour le studio Graines de pixels.<br> La première étape etait la création de notre site et le voilà maintenant en ligne !<br> Bon surf.`,
    'about-title': 'A PROPOS',
    'about-intro': `Graines de pixels, c'est un studio de jeux vidéo né d'une volonté de <strong>fusionner des compétences complémentaires d'éducation et technique</strong> pour créer des expériences vidéoludiques uniques, captivantes et innovantes. Nous croyons au pouvoir du jeu vidéo non seulement pour divertir, mais aussi pour éduquer et inspirer.`,
    'about-who': 'Qui sommes-nous ?',
    'about-ronan': `<strong>Game designer récemment certifié et développeur</strong>, Ronan Menguy développe sur Unreal Engine 5 depuis plus de 4 années divers projets. Il assure ainsi les productions du studio en allant du game design aux développements sur Unreal Engine 5 (Blueprint & C++) et les technologies comme Python et JavaScript.`,
    'about-virginia': `<strong>Gérante du studio</strong>, Virginia Menguy met à profit ses compétences pour gérer le studio, piloter les relations clients et assurer un suivi administratif précis.`,
    'about-partners': `<strong>Pour nous accompagner</strong> : Nous faisons régulièrement appel aux services de <a href="https://www.bymedesign.fr/" target="_blank" rel="noopener noreferrer">https://www.bymedesign.fr/</a> et de <a href="https://www.artstation.com/andreaguilar" target="_blank" rel="noopener noreferrer">https://www.artstation.com/andreaguilar</a>`,
    'about-btn': 'CONTACTEZ-NOUS',
    'projects-title': 'PRODUCTIONS DU STUDIO',
    'missions-title': 'Nos missions :',
    'project-2etoiles-name': '2 étoiles sont nées',
    'project-2etoiles-quote': "Deux étoiles sont nées est un jeu d'aventure/plateforme coopératif en 3D. Le joueur contrôlera deux personnages (ou deux joueurs contrôleront un personnage chacun) qui devront évoluer dans un univers étrange et brumeux où la gravité dépend des sentiments. Chaque personnage aura des pouvoirs propres (voler, téléportation, …) qui leur permettront d'avancer dans les niveaux.",
    'project-kelch-name': "Kelc'h AR Viya",
    'project-kelch-quote': "Un Action/RPG d'exploration narratif mettant en scène des combats épiques et exploration spatiale. Nous sommes en 2150 et le joueur incarne un personnage qu'il crée et personnalise, Terrien(ne), enrôlé dans une coalition terrienne/éraiée. Le but de cette organisation est d'explorer l'espace pour trouver des alliés face aux Tosieas.",
    'contact-title': 'CONTACT',
    'contact-subject': 'Objet :',
    'contact-email': 'Adresse e-mail :',
    'contact-message': 'Message :',
    'contact-btn': 'ENVOYER',
    'alert-success': 'Message envoyé avec succès !',
    'alert-error': "Une erreur est survenue lors de l'envoi.",
  },
  en: {
    'loader-text': 'Loading...',
    'loader-error': 'Loading error...',
    'nav-accueil': 'HOME',
    'nav-about': 'ABOUT US',
    'nav-projects': 'OUR GAMES',
    'nav-contact': 'CONTACT',
    'hero-title': 'WE CREATE EMOTIONS, PIXEL BY PIXEL',
    'hero-p': `Discover our <strong><a href="#mes-projets" style="text-decoration: none; color: inherit;">projects, our games</a></strong> and feel free to <strong><a href="#contact" style="text-decoration: none; color: inherit;">contact us</a></strong> to create <strong><a href="#qui-suis-je" style="text-decoration: none; color: inherit;">together</a></strong> extraordinary games!`,
    'news-title': 'LATEST NEWS',
    'news1-title': 'March 2025: Two Stars Were Born',
    'news1-p': `The project <strong>Two Stars Were Born</strong> is now launched and has become our priority for 2025. Many milestones are to be set, the first one aiming to finalize the Game Concept. Check out the details in <a href="#mes-projets" style="text-decoration: none; color: inherit;color: #e09eff;">Our Projects</a>!`,
    'news2-title': "January 2025: Kelc'h AR Viya Prototype",
    'news2-p': `The prototype for our narrative action/RPG spatial exploration project is being developed and progressing well. When it's ready, you'll be able to visit the <a href="#mes-projets" style="text-decoration: none; color: inherit;color: #e09eff;">Our Projects</a> section to test it. More news coming soon!`,
    'news3-title': 'December 2024: The grainesdepixels.fr website is live!',
    'news3-p': `And here we go, the adventure begins for Graines de Pixels studio.<br> The first step was creating our website, and here it is, now online!<br> Happy surfing.`,
    'about-title': 'ABOUT',
    'about-intro': `Graines de Pixels is a video game studio born from a desire to <strong>merge complementary educational and technical skills</strong> to create unique, captivating and innovative gaming experiences. We believe in the power of video games not only to entertain, but also to educate and inspire.`,
    'about-who': 'Who are we?',
    'about-ronan': `<strong>Recently certified game designer and developer</strong>, Ronan Menguy has been developing on Unreal Engine 5 for more than 4 years across various projects. He handles the studio's productions, from game design to development on Unreal Engine 5 (Blueprint & C++) and technologies like Python and JavaScript.`,
    'about-virginia': `<strong>Studio manager</strong>, Virginia Menguy applies her skills to manage the studio, handle client relations and ensure precise administrative oversight.`,
    'about-partners': `<strong>Our collaborators</strong>: We regularly work with <a href="https://www.bymedesign.fr/" target="_blank" rel="noopener noreferrer">https://www.bymedesign.fr/</a> and <a href="https://www.artstation.com/andreaguilar" target="_blank" rel="noopener noreferrer">https://www.artstation.com/andreaguilar</a>`,
    'about-btn': 'CONTACT US',
    'projects-title': 'STUDIO PRODUCTIONS',
    'missions-title': 'Our missions:',
    'project-2etoiles-name': '2 Stars Were Born',
    'project-2etoiles-quote': "Two Stars Were Born is a cooperative 3D adventure/platformer game. The player will control two characters (or two players will each control one character) who must evolve in a strange, misty universe where gravity depends on feelings. Each character will have unique powers (flying, teleportation, …) to help them progress through the levels.",
    'project-kelch-name': "Kelc'h AR Viya",
    'project-kelch-quote': "A narrative exploration Action/RPG featuring epic battles and space exploration. Set in 2150, the player embodies a customizable character, an Earthling enrolled in an Earth/Eraïan coalition. The goal of this organization is to explore space to find allies against the Tosieas.",
    'contact-title': 'CONTACT',
    'contact-subject': 'Subject:',
    'contact-email': 'Email address:',
    'contact-message': 'Message:',
    'contact-btn': 'SEND',
    'alert-success': 'Message sent successfully!',
    'alert-error': 'An error occurred while sending the message.',
  }
};

window.setLanguage = function(lang) {
  window.currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;

  const t = window.translations[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  const btn = document.getElementById('lang-toggle');
  if (btn) btn.textContent = lang === 'fr' ? 'EN' : 'FR';

  if (window.updateCarouselContent) window.updateCarouselContent();
};

document.addEventListener('DOMContentLoaded', () => {
  window.setLanguage(window.currentLang);

  const btn = document.getElementById('lang-toggle');
  if (btn) {
    btn.addEventListener('click', () => {
      window.setLanguage(window.currentLang === 'fr' ? 'en' : 'fr');
    });
  }
});
