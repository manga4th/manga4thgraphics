document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.category-btn');
  const viewer = document.getElementById('viewer');
  const img = document.getElementById('gallery-img');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const debug = document.getElementById('debug');
  const imageCounter = document.getElementById('image-counter');

  // FULL GALLERY DATA - WITH CASE CORRECTIONS
  const galleries = {
    logo: [
      "AV.png", "chillwave.png", "gh_cupcake.png", "halal.png", "Nusham.png",
      "saqi.png", "Thirsty.png", "twin.png", "zarak.png", "AKU.png"
    ],
    posters: [
      "Anniversary.png", "ayranniv.png", "dedication.png", "20.png"
    ],
    flyers: [
      "MENU.png", "menu33.png", "Najah's Henna.png", "palm oil.png", "randb.png",
      "sud3.png", "sudtxt.png", "wooden.png", "wooden_2.png", "zcard.png",
      "2_Miki's Kitchen.png", "3_from the millers.png", "4_Sudawa Textile.png",
      "5_End of the year sales discount.png", "6_Copy of BEST.png", "BEST.jpg",
      "business_ari.png", "business_ari2.png", "easy.png", "flch.png", "fmasu.png",
      "gurasa.png", "hijab.png", "mc.png"
    ],
    others: [
      "Left HighTable.png", "mar_2.png", "noti.png", "Save_the_Date.png",
      "yaaya.png", "Aborisade.png", "Civ_iv_msaid.png", "faruk.png"
    ]
  };

  let currentGallery = [];
  let currentIndex = 0;
  let currentCat = '';

  // BUTTON CLICK
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      console.log('Button clicked:', btn.getAttribute('data-cat'));
      
      // Remove active class from all buttons
      buttons.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      const cat = btn.getAttribute('data-cat');
      
      // Check if category exists
      if (!galleries[cat]) {
        debug.textContent = `No gallery defined for ${cat}`;
        viewer.classList.add('hidden');
        return;
      }

      // Check if category has images
      if (galleries[cat].length === 0) {
        debug.textContent = `No images in ${cat} category`;
        viewer.classList.add('hidden');
        return;
      }

      currentCat = cat;
      currentGallery = galleries[cat];
      currentIndex = 0;

      // Show viewer and load first image
      viewer.classList.remove('hidden');
      loadImage();
      
      debug.textContent = `Loaded ${currentGallery.length} images from ${cat}`;
    });
  });

  // LOAD IMAGE FUNCTION
  function loadImage() {
    if (currentGallery.length === 0) {
      debug.textContent = 'No images to display';
      imageCounter.textContent = '';
      return;
    }

    const file = currentGallery[currentIndex];
    
    // Try different path variations
    const pathVariations = [
      `images/${currentCat}/${file}`,
      `images/${currentCat.toLowerCase()}/${file}`,
      `images/${currentCat.toUpperCase()}/${file}`,
      `./images/${currentCat}/${file}`,
      `../images/${currentCat}/${file}`
    ];

    debug.textContent = `Trying to load: ${file}`;
    console.log("Attempting to load image:", file, "from category:", currentCat);

    // Add loading class
    img.classList.add('loading');
    img.style.display = 'none'; // Hide until loaded

    let imagesTried = 0;
    const totalVariations = pathVariations.length;

    function tryNextPath() {
      if (imagesTried >= totalVariations) {
        // All paths failed
        img.classList.remove('loading');
        debug.textContent = `ERROR: Could not load ${file} from any path`;
        console.error("All path variations failed for:", file);
        imageCounter.textContent = 'Image load failed';
        img.style.display = 'none';
        return;
      }

      const path = pathVariations[imagesTried];
      console.log(`Trying path ${imagesTried + 1}:`, path);
      debug.textContent = `Trying: ${path}`;

      const testImage = new Image();
      testImage.onload = function() {
        // This path works!
        img.src = path;
        img.alt = `Manga4th Graphics - ${file}`;
        img.style.display = 'block';
        img.classList.remove('loading');
        
        debug.textContent = `✓ Loaded: ${file} (${currentIndex + 1}/${currentGallery.length})`;
        updateImageCounter();
        console.log("✓ Successfully loaded:", path);
      };

      testImage.onerror = function() {
        imagesTried++;
        console.log(`Path failed: ${path}`);
        // Try next path
        setTimeout(tryNextPath, 100);
      };

      testImage.src = path;
    }

    // Start trying paths
    tryNextPath();
  }

  // UPDATE IMAGE COUNTER
  function updateImageCounter() {
    if (currentGallery.length > 0) {
      imageCounter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
    } else {
      imageCounter.textContent = '';
    }
  }

  // NAVIGATION
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

  // KEYBOARD NAVIGATION
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

  // SWIPE SUPPORT FOR MOBILE
  let startX = 0;

  viewer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  viewer.addEventListener('touchend', (e) => {
    if (!startX || currentGallery.length <= 1) return;
    
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    const minSwipeDistance = 50;
    
    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        navigate(1); // Swipe left - next
      } else {
        navigate(-1); // Swipe right - previous
      }
    }
    
    startX = 0;
  }, { passive: true });

  // CLOSE VIEWER WHEN CLICKING ON DARK BACKGROUND
  viewer.addEventListener('click', (e) => {
    if (e.target === viewer || e.target.classList.contains('viewer')) {
      viewer.classList.add('hidden');
    }
  });

  // SET CURRENT YEAR IN FOOTER
  document.getElementById('year').textContent = new Date().getFullYear();

  // INITIAL DEBUG MESSAGE
  debug.textContent = 'Gallery ready - Click a category to start';
  console.log('Gallery initialized successfully');
});