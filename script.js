// Dynamically display all images from each folder
const folders = ['logo', 'posters', 'flyers', 'others'];
const galleryContainer = document.getElementById('gallery-container');

folders.forEach(folder => {
  // Create a section title for each category
  const title = document.createElement('h3');
  title.textContent = folder.charAt(0).toUpperCase() + folder.slice(1);
  galleryContainer.appendChild(title);

  // Try to load up to 50 possible image names (JPG, PNG, WEBP, JPEG)
  for (let i = 1; i <= 50; i++) {
    const extensions = ['jpg', 'jpeg', 'png', 'webp'];
    extensions.forEach(ext => {
      const img = new Image();
      img.src = `images/${folder}/image${i}.${ext}`;
      img.alt = `${folder} design ${i}`;
      img.onload = () => galleryContainer.appendChild(img);
    });
  }
});
