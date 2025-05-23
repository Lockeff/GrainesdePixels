// Liste des images à précharger avec leurs dimensions optimales
const imagesToLoad = [
    { src: '/Public/2EtoilesMain.png', width: 1920, quality: 75 },
    { src: '/Public/MainBackgroundTop.png', width: 1920, quality: 75 },
    { src: '/Public/Background.png', width: 1920, quality: 75 },
    { src: '/Public/BtnContact.png', width: 200, quality: 90 },
    { src: '/Public/Btn_Envoyer.png', width: 200, quality: 90 },
    { src: '/Public/Arrow.png', width: 100, quality: 90 },
    { src: '/Public/Kelc2.png', width: 1920, quality: 75 },
    { src: '/Public/Kelc3.png', width: 1920, quality: 75 },
    { src: '/Public/KelcMain.png', width: 1920, quality: 75 },
    { src: '/Public/Kelc1.png', width: 1920, quality: 75 },
    { src: '/Public/GdP-Logo.png', width: 400, quality: 90 },
    { src: '/Public/GdP-Logo sans fond.png', width: 400, quality: 90 },
    { src: '/Public/iconAbout.png', width: 100, quality: 90 }
];

// Fonction pour obtenir l'URL optimisée de Vercel
function getOptimizedImageUrl(src, width, quality) {
    // Si nous sommes en développement local, utiliser l'URL directe
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return src;
    }
    // En production, utiliser l'URL optimisée de Vercel
    return `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}

// Fonction pour précharger une image
function preloadImage(imageConfig) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const optimizedUrl = getOptimizedImageUrl(imageConfig.src, imageConfig.width, imageConfig.quality);
        img.src = optimizedUrl;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Erreur de chargement de l'image: ${imageConfig.src}`));
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
        await Promise.all(imagesToLoad.map(async (imageConfig) => {
            await preloadImage(imageConfig);
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