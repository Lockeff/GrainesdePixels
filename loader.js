// Liste des images à précharger
const imagesToLoad = [
    'Public/2EtoilesMain.png',
    'Public/MainBackgroundTop.png',
    'Public/Background.png',
    'Public/BtnContact.png',
    'Public/Btn_Envoyer.png',
    'Public/Arrow.png',
    'Public/Kelc2.png',
    'Public/Kelc3.png',
    'Public/KelcMain.png',
    'Public/Kelc1.png',
    'Public/GdP-Logo.png',
    'Public/GdP-Logo sans fond.png',
    'Public/iconAbout.png'
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

// Fonction principale de chargement
async function loadAllImages() {
    const totalImages = imagesToLoad.length;
    let loadedImages = 0;

    try {
        // Charger toutes les images en parallèle
        await Promise.all(imagesToLoad.map(async (src) => {
            await preloadImage(src);
            loadedImages++;
            updateProgress(loadedImages, totalImages);
        }));

        // Une fois tout chargé, masquer le loader
        const loader = document.getElementById('loader');
        loader.classList.add('fade-out');
        
        // Supprimer complètement le loader après l'animation
        setTimeout(() => {
            loader.remove();
        }, 500);

    } catch (error) {
        console.error('Erreur lors du chargement des images:', error);
        document.querySelector('.loader-text').textContent = 'Erreur de chargement...';
    }
}

// Démarrer le chargement quand la page est prête
document.addEventListener('DOMContentLoaded', loadAllImages); 