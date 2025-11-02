document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.category-btn');
  const viewer = document.getElementById('viewer');
  const img = document.getElementById('gallery-img');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const imageCounter = document.getElementById('image-counter');

  // Clean file names - remove problematic characters and ensure proper extensions
  const galleries = {
    logo: [
      "AV.png", "chillwave.png", "gh_cupcake.png", "halal.png", "Nusham.png",
      "saqi.png", "Thirsty.png", "twin.png", "zarak.png", "AKU.png"
    ],
    posters: [
      "Anniversary.png", "ayranniv.png", "dedication.png", "20.png"
    ],
    flyers: [
      "MENU.png", "menu33.png", "Najahs_Henna.png", "palm_oil.png", "randb.png",
      "sud3.png", "sudtxt.png", "wooden.png", "wooden_2.png", "zcard.png",
      "Mikis_Kitchen.png", "from_the_millers.png", "Sudawa_Textile.png",
      "End_of_the_year_sales_discount.png", "Copy_of_BEST.png", "BEST.jpg",
      "business_ari.png", "business_ari2.png", "easy.png", "flch.png", "fmasu.png",
      "gurasa.png", "hijab.png", "mc.png"
    ],
    others: [
      "Left_HighTable.png", "mar_2.png", "noti.png", "Save_the_Date.png",
      "yaaya.png", "Aborisade.png", "Civ_iv_msaid.png", "faruk.png"
    ]
  };

  let currentGallery = [];
  let currentIndex = 0;
  let currentCat = '';

  // Function to clean file names for mobile
  function cleanFileName(filename) {
    return filename
      .replace(/[']/g, '') // Remove apostrophes
      .replace(/[&]/g, 'and') // Replace & with 'and'
      .replace(/[^\w.-]/g, '_') // Replace special characters with underscore
      .replace(/\s+/g, '_'); // Replace spaces with underscore
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', function() {
      buttons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const cat = this.getAttribute('data-cat');
      
      if (!galleries[cat] || galleries[cat].length === 0) {
        viewer.classList.add('hidden');
        return;
      }

      currentCat = cat;
      currentGallery = galleries[cat];
      currentIndex = 0;

      viewer.classList.remove('hidden');
      loadImage();
    });
  });

  function loadImage() {
    if (currentGallery.length === 0) return;

    const originalFile = currentGallery[currentIndex];
    const cleanFile = cleanFileName(originalFile);
    const path = `images/${currentCat}/${cleanFile}`;

    // Show loading state
    img.classList.add('image-loading');
    img.classList.remove('image-error');

    // Create a new image object to test loading
    const testImage = new Image();
    
    testImage.onload = function() {
      // Set the actual image source
      img.src = path;
      img.alt = `Manga4th Graphics - ${currentCat}`;
      img.classList.remove('image-loading');
      updateImageCounter();
    };

    testImage.onerror = function() {
      // Try with original filename if cleaned version fails
      const fallbackPath = `images/${currentCat}/${originalFile}`;
      const fallbackImage = new Image();
      
      fallbackImage.onload = function() {
        img.src = fallbackPath;
        img.alt = `Manga4th Graphics - ${currentCat}`;
        img.classList.remove('image-loading');
        updateImageCounter();
      };

      fallbackImage.onerror = function() {
        // Both paths failed, show error state and try next image
        img.classList.remove('image-loading');
        img.classList.add('image-error');
        img.src = '';
        
        // Try next image after a short delay
        setTimeout(() => {
          if (currentGallery.length > 1) {
            navigate(1);
          }
        }, 1000);
      };

      fallbackImage.src = fallbackPath;
    };

    testImage.src = path;
  }

  function updateImageCounter() {
    if (currentGallery.length > 0) {
      imageCounter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
    } else {
      imageCounter.textContent = '';
    }
  }

  function navigate(direction) {
    if (currentGallery.length <= 1) return;
    currentIndex = (currentIndex + direction + currentGallery.length) % currentGallery.length;
    loadImage();
  }

  prevBtn.addEventListener('click', function() {
    navigate(-1);
  });

  nextBtn.addEventListener('click', function() {
    navigate(1);
  });

  document.addEventListener('keydown', function(e) {
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
  viewer.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
  });

  viewer.addEventListener('touchend', function(e) {
    if (!startX || currentGallery.length <= 1) return;
    
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        navigate(1);
      } else {
        navigate(-1);
      }
    }
  });

  viewer.addEventListener('click', function(e) {
    if (e.target === this) {
      this.classList.add('hidden');
    }
  });

  // Set current year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Preload main logo for faster display
  const mainLogo = new Image();
  mainLogo.src = 'images/logo/manga4th-logo.png';
});