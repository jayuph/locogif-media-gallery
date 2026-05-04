async function loadGallery() {
  const response = await fetch('./gallery.json', { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Failed to load gallery manifest.');
  }

  return response.json();
}

function renderGallery(entries) {
  const root = document.querySelector('#gallery');
  if (!root) {
    return;
  }

  root.innerHTML = entries.map((entry) =>     '<li class="gallery-card">' +
      '<a class="gallery-preview-link" href="' + (entry.pagePath || entry.assetPath) + '">' +
        '<img class="gallery-preview" src="' + entry.assetPath + '" alt="' + entry.title + '" loading="lazy" />' +
      '</a>' +
      '<div class="gallery-copy">' +
        '<h2><a class="gallery-title-link" href="' + (entry.pagePath || entry.assetPath) + '">' + entry.title + '</a></h2>' +
        '<p>' + new Date(entry.createdAt).toLocaleString() + '</p>' +
      '</div>' +
      '<div class="gallery-actions">' +
        (entry.pagePath ? '<a href="' + entry.pagePath + '">Share page</a>' : '') +
        '<a href="' + entry.assetPath + '" download>GIF</a>' +
        '<a href="' + entry.mp4Path + '" download>MP4</a>' +
        '<a href="' + entry.webmPath + '" download>WebM</a>' +
      '</div>' +
    '</li>'  ).join('');
}

loadGallery()
  .then((manifest) => renderGallery(Array.isArray(manifest.entries) ? manifest.entries : []))
  .catch((error) => {
    const root = document.querySelector('#gallery');
    if (root) {
      root.innerHTML = '<li class="gallery-card"><div class="gallery-copy"><h2>Unable to load gallery</h2><p>' + error.message + '</p></div></li>';
    }
  });