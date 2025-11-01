// Get the main gallery container
const galleryContainer = document.getElementById("gallery-container");

// Define your folders and image filenames
const images = {
  logo: [
    "AV.png",
    "chillwave.png",
    "gh_cupcake.png",
    "halal.png",
    "Nusham.png",
    "saqi.png",
    "Thirsty.png",
    "twin.png",
    "zarak.png",
    "AKU.png"
  ],
  posters: [
    "Anniversary.png",
    "ayranniv.png",
    "dedication.png",
    "20.png"
  ],
  flyers: [
    "MENU.png",
    "menu33.png",
    "Najah's Henna.png",
    "palm oil.png",
    "randb.png",
    "sud3.png",
    "sudtxt.png",
    "wooden.png",
    "wooden_2.png",
    "zcard.png",
    "2_Miki’s Kitchen.png",
    "3_from the millers.png",
    "4_Sudawa Textile.png",
    "5_End of the year sales discount.png",
    "6_Copy of BEST.png",
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
    "Left HighTable.png",
    "mar_2.png",
    "noti.png",
    "Save_the_Date.png",
    "yaaya.png",
    "Aborisade.png",
    "Civ_iv_msaid.png",
    "faruk.png"
  ]
};

// Function to create each image section
function createImageSection(title, folder, filenames) {
  const section = document.createElement("section");

  const heading = document.createElement("h2");
  heading.textContent = title;
  section.appendChild(heading);

  const grid = document.createElement("div");
  grid.classList.add("gallery-grid");

  filenames.forEach(file => {
    const img = document.createElement("img");
    img.src = `images/${folder}/${file}`;
    img.alt = `${title} - ${file}`;
    img.loading = "lazy";
    img.onerror = () => {
      console.warn(`Image not found: ${img.src}`);
      img.remove();
    };
    grid.appendChild(img);
  });

  section.appendChild(grid);
  galleryContainer.appendChild(section);
}

// Build all the sections
createImageSection("Logos", "logo", images.logo);
createImageSection("Posters", "posters", images.posters);
createImageSection("Flyers", "flyers", images.flyers);
createImageSection("Others", "others", images.others);

// Optional footer year update if you added one in your HTML
if (document.getElementById("year")) {
  document.getElementById("year").textContent = new Date().getFullYear();
}
