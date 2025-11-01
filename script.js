/* -------------------------------------------------
   Gallery Builder + Modal Logic
------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const galleryContainer = document.getElementById('gallery-container');
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const closeBtn = document.querySelector('.modal__close');

  // ---------- Image data ----------
  const images = {
    logo: [
      "AV.png","chillwave.png","gh_cupcake.png","halal.png","Nusham.png",
      "saqi.png","Thirsty.png","twin.png","zarak.png","AKU.png"
    ],
    posters: ["Anniversary.png","ayranniv.png","dedication.png","20.png"],
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

  // ---------- Create a section ----------
  const createSection = (title, folder, files) => {
    const section = document.createElement('section');
    section.className = 'gallery-section';

    const heading = document.createElement('h2');
    heading.textContent = title;
    heading.className = 'gallery-section__title';
    section.appendChild(heading);

    const grid = document.createElement('div');
    grid.className = 'gallery-grid';

    files.forEach(file => {
      const img = document.createElement('img');
      img.src = `images/${folder}/${file}`;
      img.alt = `${title} – ${file.split('.')[0]}`;
      img.loading = 'lazy';
      img.dataset.src = img.src;               // keep original for modal
      img.onerror = () => img.remove();        // hide broken images
      grid.appendChild(img);
    });

    section.appendChild(grid);
    galleryContainer.appendChild(section);
  };

  // ---------- Build all sections ----------
  createSection('Logos',   'logo',   images.logo);
  createSection('Posters', 'posters', images.posters);
  createSection('Flyers',  'flyers',  images.flyers);
  createSection('Others',  'others',  images.others);

  // ---------- Modal (delegated) ----------
  galleryContainer.addEventListener('click', e => {
    const img = e.target.closest('img');
    if (!img) return;
    modalImg.src = img.dataset.src || img.src;
    modalImg.alt = img.alt;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  });

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    modalImg.src = '';
  };
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  // ---------- Dynamic year ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});