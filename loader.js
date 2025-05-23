// Liste des images à précharger
const imagesToLoad = [
    // Images principales
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
    'Public/iconAbout.png',
    
    // Images des projets DeuxEtoiles
    'Public/Projets/DeuxEtoiles/BigSizes/DeuxPix1.png',
    'Public/Projets/DeuxEtoiles/BigSizes/DeuxPix2.png',
    'Public/Projets/DeuxEtoiles/BigSizes/DeuxPix3.png',
    'Public/Projets/DeuxEtoiles/BigSizes/DeuxPix4.png',
    'Public/Projets/DeuxEtoiles/BigSizes/DeuxPix5.png',
    'Public/Projets/DeuxEtoiles/BigSizes/DeuxPix6.png',
    'Public/Projets/DeuxEtoiles/BigSizes/DeuxPix7.png',
    'Public/Projets/DeuxEtoiles/BigSizes/DeuxPix8.png',
    'Public/Projets/DeuxEtoiles/Minias/Dark/DeuxPix1DarkMinia.png',
    'Public/Projets/DeuxEtoiles/Minias/Dark/DeuxPix2DarkMinia.png',
    'Public/Projets/DeuxEtoiles/Minias/Dark/DeuxPix3DarkMinia.png',
    'Public/Projets/DeuxEtoiles/Minias/Dark/DeuxPix4DarkMinia.png',
    'Public/Projets/DeuxEtoiles/Minias/Dark/DeuxPix5DarkMinia.png',
    'Public/Projets/DeuxEtoiles/Minias/Dark/DeuxPix6DarkMinia.png',
    'Public/Projets/DeuxEtoiles/Minias/Dark/DeuxPix7DarkMinia.png',
    'Public/Projets/DeuxEtoiles/Minias/Dark/DeuxPix8DarkMinia.png',
    'Public/Projets/DeuxEtoiles/Minias/Glow/DeuxPix1GlowMinia.png',
    'Public/Projets/DeuxEtoiles/Minias/Glow/DeuxPix2GlowMinia.png',
    'Public/Projets/DeuxEtoiles/Minias/Glow/DeuxPix3GlowMinia.png',
    'Public/Projets/DeuxEtoiles/Minias/Glow/DeuxPix4GlowMinia.png',
    'Public/Projets/DeuxEtoiles/Minias/Glow/DeuxPix5GlowMinia.png',
    'Public/Projets/DeuxEtoiles/Minias/Glow/DeuxPix6GlowMinia.png',
    'Public/Projets/DeuxEtoiles/Minias/Glow/DeuxPix7GlowMinia.png',
    'Public/Projets/DeuxEtoiles/Minias/Glow/DeuxPix8GlowMinia.png',
    
    // Images des projets Kelch
    'Public/Projets/Kelch/BannerKelch.png',
    'Public/Projets/Kelch/BigSizes/KelchPix1.png',
    'Public/Projets/Kelch/BigSizes/KelchPix2.png',
    'Public/Projets/Kelch/BigSizes/KelchPix3.png',
    'Public/Projets/Kelch/BigSizes/KelchPix4.png',
    'Public/Projets/Kelch/Minias/Dark/KelchPix1DarkMinia.png',
    'Public/Projets/Kelch/Minias/Dark/KelchPix2DarkMinia.png',
    'Public/Projets/Kelch/Minias/Dark/KelchPix3DarkMinia.png',
    'Public/Projets/Kelch/Minias/Dark/KelchPix4DarkMinia.png',
    'Public/Projets/Kelch/Minias/Glow/KelchPix1GlowMinia.png',
    'Public/Projets/Kelch/Minias/Glow/KelchPix2GlowMinia.png',
    'Public/Projets/Kelch/Minias/Glow/KelchPix3GlowMinia.png',
    'Public/Projets/Kelch/Minias/Glow/KelchPix4GlowMinia.png',
    
    // Images des projets DROP
    'Public/Projets/DROP/BannerDROP.png',
    'Public/Projets/DROP/BigSizes/DROPPix1.png',
    'Public/Projets/DROP/Minias/Dark/DROPPix1DarkMinia.png',
    'Public/Projets/DROP/Minias/Glow/DROPPix1GlowMinia.png',
    
    // Images du carrousel
    'Public/Carroussel/SlideDeuxEtoilesSontNees.png',
    'Public/Carroussel/SlideDeuxEtoilesSontNeesHover.png',
    'Public/Carroussel/SlideLePetitSecouriste.png',
    'Public/Carroussel/SlideLePetitSecouristeHover.png',
    'Public/Carroussel/SlideKech.png',
    'Public/Carroussel/SlideKelchHover.png',
    'Public/Carroussel/SlideDROP.png',
    'Public/Carroussel/SlideDROPHover.png',
    
    // Boutons des projets
    'Public/Projets/BtnPageEpic.png',
    'Public/Projets/BtnPageEpicOverlay.png',
    'Public/Projets/BtnPageStudio.png',
    'Public/Projets/BtnPageStudioOverlay.png'
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
            
            // Si on atteint 90%, on affiche le site
            if (loadedImages / totalImages >= 0.9) {
                const loader = document.getElementById('loader');
                loader.classList.add('fade-out');
                setTimeout(() => {
                    loader.remove();
                }, 500);
            }
        }));

    } catch (error) {
        console.error('Erreur lors du chargement des images:', error);
        document.querySelector('.loader-text').textContent = 'Erreur de chargement...';
    }
}

// Démarrer le chargement quand la page est prête
document.addEventListener('DOMContentLoaded', loadAllImages); 