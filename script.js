document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.category-btn');
  const viewer = document.getElementById('viewer');
  const img = document.getElementById('gallery-img');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const debug = document.getElementById('debug');
  const imageCounter = document.getElementById('image-counter');

  const galleries = {
    logo: ["AV.png","chillwave.png","gh_cupcake.png","halal.png","Nusham.png","saqi.png","Thirsty.png","twin.png","zarak.png","AKU.png"],
    posters: ["Anniversary.png","ayranniv.png","dedication.png","20.png"],
    flyers: ["MENU.png","menu33.png","Najah's Henna.png","palm oil.png","randb.png","sud3.png","sudtxt.png","wooden.png","wooden_2.png","zcard.png","2_Miki's Kitchen.png","3_from the millers.png","4_Sudawa Textile.png","5_End of the year sales discount.png","6_Copy of BEST.png","BEST.jpg","business_ari.png","business_ari2.png","easy.png","flch.png","fmasu.png","gurasa.png","hijab.png","mc.png"],
    others: ["Left HighTable.png","mar_2.png","noti.png","Save_the_Date.png","yaaya.png","Aborisade.png","Civ_iv_msaid.png","faruk.png"]
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
        debug.textContent = `No images in ${cat} category`;
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

    const file = currentGallery[currentIndex];
    const path = `images/${currentCat}/${file}`;

    debug.textContent = `Loading: ${file}`;
    img.src = path;
    img.alt = file;

    img.onload = function() {
      debug.textContent = `Loaded: ${file} (${currentIndex + 1}/${currentGallery.length})`;
      updateImageCounter();
    };

    img.onerror = function() {
      debug.textContent = `Failed to load: ${file}`;
    };
  }

  function updateImageCounter() {
    if (currentGallery.length > 0) {
      imageCounter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
    }
  }

  prevBtn.addEventListener('click', function() {
    if (currentGallery.length <= 1) return;
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    loadImage();
  });

  nextBtn.addEventListener('click', function() {
    if (currentGallery.length <= 1) return;
    currentIndex = (currentIndex + 1) % currentGallery.length;
    loadImage();
  });

  document.addEventListener('keydown', function(e) {
    if (viewer.classList.contains('hidden')) return;
    
    if (e.key === 'ArrowLeft') {
      prevBtn.click();
    } else if (e.key === 'ArrowRight') {
      nextBtn.click();
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
        nextBtn.click();
      } else {
        prevBtn.click();
      }
    }
  });

  viewer.addEventListener('click', function(e) {
    if (e.target === this) {
      this.classList.add('hidden');
    }
  });

  document.getElementById('year').textContent = new Date().getFullYear();
});