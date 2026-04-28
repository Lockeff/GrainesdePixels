// Liste des images à précharger
const imagesToLoad = [
    'public/2EtoilesMain.png',
    'public/MainBackgroundTop.png',
    'public/Background.png',
    'public/BtnContact.png',
    'public/Btn_Envoyer.png',
    'public/Arrow.png',
    'public/Kelc2.png',
    'public/Kelc3.png',
    'public/KelcMain.png',
    'public/Kelc1.png',
    'public/GdP-Logo.png',
    'public/GdP-Logo sans fond.png',
    'public/iconAbout.png'
];

// Fonction pour précharger une image
function preloadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Erreur de chargement de l'image: ${src}`));
    });
}

// Fonction pour mettre à jour la barre de progression
function updateProgress(loaded, total) {
    const progress = (loaded / total) * 100;
    document.querySelector('.loader-bar').style.width = `${progress}%`;
    document.querySelector('.loader-text').textContent = `Chargement... ${Math.round(progress)}%`;
}

// Fonction pour cacher le loader
function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => loader.remove(), 500);
    }
}

// Fonction principale de chargement
async function loadAllImages() {
    const totalImages = imagesToLoad.length;
    let loadedImages = 0;

    // Sécurité : masquer le loader quoi qu'il arrive après 5 secondes
    const securityTimeout = setTimeout(hideLoader, 5000);

    try {
        // Charger toutes les images en parallèle
        await Promise.all(imagesToLoad.map(src => 
            preloadImage(src)
                .then(() => {
                    loadedImages++;
                    updateProgress(loadedImages, totalImages);
                })
                .catch(err => console.warn(err.message)) // On ignore les erreurs d'images pour ne pas bloquer
        ));

        clearTimeout(securityTimeout);
        hideLoader();

    } catch (error) {
        console.error('Erreur lors du chargement des images:', error);
        hideLoader();
    }
}

// Démarrer le chargement quand la page est prête
document.addEventListener('DOMContentLoaded', loadAllImages); 