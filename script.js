// Folders containing your designs
const imageFolders = ['logo', 'posters', 'flyers', 'others'];

// Possible image file types
const imageExtensions = ['jpg', 'jpeg', 'png', 'webp'];

// Where the images will be shown
const galleryContainer = document.getElementById('gallery-container');

// Loop through folders and possible file types
imageFolders.forEach(folder => {
  for (let i = 1; i <= 10; i++) { // supports up to 10 images per folder
    let found = false;

    imageExtensions.forEach(ext => {
      if (found) return; // skip if one was already loaded

      const img = new Image();
      img.src = `images/${folder}/work${i}.${ext}`;
      img.alt = `${folder} design ${i}`;

      img.onload = () => {
        galleryContainer.appendChild(img);
        found = true; // stop checking other extensions once one works
      };

      img.onerror = () => {
        // ignore errors silently for missing files
      };
    });
  }
});

// Update footer year automatically
document.getElementById("year").textContent = new Date().getFullYear();
