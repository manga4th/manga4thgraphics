document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.category-btn');
  const viewer = document.getElementById('viewer');
  const img = document.getElementById('gallery-img');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const debug = document.getElementById('debug');
  const imageCounter = document.getElementById('image-counter');
  const loadingScreen = document.getElementById('loading-screen');

  const galleries = {
    logo: [
      "AV.png","chillwave.png","gh_cupcake.png","halal.png","Nusham.png",
      "saqi.png","Thirsty.png","twin.png","zarak.png","AKU.png"
    ],
    posters: [
      "Anniversary.png","ayranniv.png","dedication.png","20.png"
    ],
    flyers: [
      "MENU.png","menu33.png","Najah's Henna.png","palm oil.png","randb.png",
      "sud3.png","sudtxt.png","wooden.png","wooden_2.png","zcard.png",
      "2_Miki's Kitchen.png","3_from the millers.png","4_Sudawa Textile.png",
      "5_End of the year sales discount.png","6_Copy of BEST.png","BEST.jpg",
      "business_ari.png","business_ari2.png","easy.png","flch.png","fmasu.png",
      "gurasa.png","hijab.png","mc.png"
    ],
    others: [
      "Left HighTable.png","mar_2.png","noti.png","Save_the_Date.png",
      "yaaya.png","Aborisade.png","Civ_iv_msaid.png","faruk.png"
    ]
  };

  let currentGallery = [];
  let currentIndex = 0;
  let currentCat = '';
  let preloadedIndexes = new Set();

  function preloadFirstImages() {
    Object.keys(galleries).forEach(cat => {
      if (galleries[cat].length > 0) {
        const preloadImg = new Image();
        preloadImg.src = `images/${cat}/${galleries[cat][0]}`;
      }
    });
  }

  function preloadAdjacentImages() {
    if (currentGallery.length <= 1) return;

    const indexesToPreload = [
      (currentIndex - 1 + currentGallery.length) % currentGallery.length,
      (currentIndex + 1) % currentGallery.length
    ];

    indexesToPreload.forEach(index => {
      if (!preloadedIndexes.has(index)) {
        const preloadImg = new Image();
        const file = currentGallery[index];
        preloadImg.src = `images/${currentCat}/${file}`;
        preloadedIndexes.add(index);
      }
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      console.log('Button clicked:', btn.getAttribute('data-cat'));
      
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-cat');
      
      if (!galleries[cat] || galleries[cat].length === 0) {
        debug.textContent = `No images in ${cat} category`;
        viewer.classList.add('hidden');
        return;
      }

      currentCat = cat;
      currentGallery = galleries[cat];
      currentIndex = 0;
      preloadedIndexes.clear();
      preloadedIndexes.add(0);

      viewer.classList.remove('hidden');
      loadImage();
      
      debug.textContent = `Loaded ${currentGallery.length} images from ${cat}`;
    });
  });

  function loadImage() {
    if (currentGallery.length === 0) {
      debug.textContent = 'No images to display';
      imageCounter.textContent = '';
      return;
    }

    const file = currentGallery[currentIndex];
    const path = `images/${currentCat}/${file}`;

    debug.textContent = `Loading: ${file}...`;
    
    img.classList.add('loading');
    img.style.opacity = '0.5';

    const newImg = new Image();
    
    newImg.onload = () => {
      img.src = path;
      img.alt = `Manga4th Graphics - ${file}`;
      img.classList.remove('loading');
      img.style.opacity = '1';
      
      debug.textContent = `✓ ${file} (${currentIndex + 1}/${currentGallery.length})`;
      updateImageCounter();
      
      preloadAdjacentImages();
    };

    newImg.onerror = () => {
      img.classList.remove('loading');
      img.style.opacity = '1';
      debug.textContent = `✗ Failed to load: ${file}`;
      
      setTimeout(() => {
        if (currentGallery.length > 1) {
          navigate(1);
        }
      }, 1500);
    };

    newImg.src = path;
  }

  function updateImageCounter() {
    if (currentGallery.length > 0) {
      imageCounter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
    } else {
      imageCounter.textContent = '';
    }
  }

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navigate(-1);
  });
  
  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navigate(1);
  });

  function navigate(dir) {
    if (currentGallery.length <= 1) return;
    
    currentIndex = (currentIndex + dir + currentGallery.length) % currentGallery.length;
    loadImage();
  }

  document.addEventListener('keydown', (e) => {
    if (viewer.classList.contains('hidden')) return;
    
    if (e.key === 'ArrowLeft') {
      navigate(-1);
    } else if (e.key === 'ArrowRight') {
      navigate(1);
    } else if (e.key === 'Escape') {
      viewer.classList.add('hidden');
    }
  });

  let startX = 0;
  viewer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  viewer.addEventListener('touchend', (e) => {
    if (!startX || currentGallery.length <= 1) return;
    
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) navigate(1);
      else navigate(-1);
    }
    
    startX = 0;
  }, { passive: true });

  viewer.addEventListener('click', (e) => {
    if (e.target === viewer) {
      viewer.classList.add('hidden');
    }
  });

  document.getElementById('year').textContent = new Date().getFullYear();
  
  setTimeout(preloadFirstImages, 1000);
  
  debug.textContent = 'Gallery ready - Click a category to start';

  window.addEventListener('load', function() {
    setTimeout(function() {
      if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
          if (loadingScreen.parentNode) {
            loadingScreen.parentNode.removeChild(loadingScreen);
          }
        }, 500);
      }
    }, 1000);
  });
});