document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const buttons = document.querySelectorAll('.category-btn');
  const viewer = document.getElementById('viewer');
  const img = document.getElementById('gallery-img');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  // === IMAGE DATA (MUST MATCH FOLDER NAMES EXACTLY) ===
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
      "2_Miki’s Kitchen.png","3_from the millers.png","4_Sudawa Textile.png",
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
  let currentCategory = '';

  // === BUTTON CLICK ===
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Reset active
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Get category
      const category = btn.getAttribute('data-category'); // EXACT string
      if (!galleries[category]) {
        console.error(`No gallery found for: ${category}`);
        return;
      }

      currentCategory = category;
      currentGallery = galleries[category];
      currentIndex = 0;

      viewer.classList.remove('hidden');
      loadImage();
    });
  });

  // === LOAD IMAGE ===
  function loadImage() {
    if (!currentGallery || currentGallery.length === 0) return;

    const file = currentGallery[currentIndex];
    const path = `images/${currentCategory}/${file}`;

    // Debug
    console.log('Loading:', path);

    // Set image
    img.src = path;
    img.alt = `${currentCategory} - ${file}`;

    // Fallback if image fails
    img.onerror = () => {
      img.src = 'images/logo/manga4th-logo.png'; // fallback
      img.alt = 'Image not found';
    };
  }

  // === NAVIGATION ===
  prevBtn.addEventListener('click', () => navigate(-1));
  nextBtn.addEventListener('click', () => navigate(1));

  function navigate(direction) {
    if (currentGallery.length === 0) return;
    currentIndex = (currentIndex + direction + currentGallery.length) % currentGallery.length;
    loadImage();
  }

  // === SWIPE ===
  let touchStartX = 0;
  viewer.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  viewer.addEventListener('touchend', e => {
    if (currentGallery.length === 0) return;
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      navigate(diff > 0 ? 1 : -1);
    }
  }, { passive: true });

  // === YEAR ===
  document.getElementById('year').textContent = new Date().getFullYear();
});