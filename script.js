document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.category-btn');
  const viewer = document.getElementById('viewer');
  const img = document.getElementById('gallery-img');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const imageCounter = document.getElementById('image-counter');

  // ALL flyer files included since you have them all
  const galleries = {
    logo: [
      "AV.png", "chillwave.png", "gh_cupcake.png", "halal.png", "Nusham.png",
      "saqi.png", "Thirsty.png", "twin.png", "zarak.png", "AKU.png"
    ],
    posters: [
      "Anniversary.png", "ayranniv.png", "dedication.png", "20.png"
    ],
    flyers: [
      "MENU.png", 
      "menu33.png", 
      "Najahs_Henna.png", 
      "palm_oil.png", 
      "randb.png",
      "sud3.png", 
      "sudtxt.png", 
      "wooden.png", 
      "wooden_2.png", 
      "zcard.png",
      "Mikis_Kitchen.png", 
      "from_the_millers.png", 
      "Sudawa_Textile.png",
      "End_of_the_year_sales_discount.png", 
      "Copy_of_BEST.png", 
      "BEST.jpg",
      "business_ari.png", 
      "business_ari2.png", 
      "easy.png", 
      "flch.png", 
      "fmasu.png",
      "gurasa.png", 
      "hijab.png", 
      "mc.png"
    ],
    others: [
      "Left_HighTable.png", "mar_2.png", "noti.png", "Save_the_Date.png",
      "yaaya.png", "Aborisade.png", "Civ_iv_msaid.png", "faruk.png"
    ]
  };

  let currentGallery = [];
  let currentIndex = 0;
  let currentCat = '';

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
      loadCurrentImage();
    });
  });

  function loadCurrentImage() {
    if (currentGallery.length === 0) return;

    const fileName = currentGallery[currentIndex];
    const imagePath = `images/${currentCat}/${fileName}`;

    console.log('Loading image:', imagePath); // Debug log
    
    img.src = imagePath;
    img.alt = `Manga4th Graphics - ${currentCat}`;

    img.onload = function() {
      console.log('Successfully loaded:', imagePath);
      updateImageCounter();
    };

    img.onerror = function() {
      console.error('FAILED to load:', imagePath);
      // Try next image if this one fails
      setTimeout(() => {
        if (currentGallery.length > 1) {
          console.log('Trying next image...');
          navigate(1);
        }
      }, 1000);
    };

    updateImageCounter();
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
    loadCurrentImage();
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

  let touchStartX = 0;
  
  viewer.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  viewer.addEventListener('touchend', function(e) {
    if (!touchStartX || currentGallery.length <= 1) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const swipeDistance = touchStartX - touchEndX;
    
    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0) {
        navigate(1);
      } else {
        navigate(-1);
      }
    }
    
    touchStartX = 0;
  }, { passive: true });

  viewer.addEventListener('click', function(e) {
    if (e.target === this) {
      this.classList.add('hidden');
    }
  });

  document.getElementById('year').textContent = new Date().getFullYear();
});