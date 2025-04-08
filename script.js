const form = document.getElementById('uploadForm');
const mediaInput = document.getElementById('mediaInput');
const previewContainer = document.getElementById('previewContainer');
const linkContainer = document.getElementById('linkContainer');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const file = mediaInput.files[0];
  if (!file) return;

  previewContainer.innerHTML = '';
  linkContainer.innerHTML = '';

  const preview = document.createElement(file.type.startsWith('video') ? 'video' : 'img');
  preview.src = URL.createObjectURL(file);
  preview.className = 'preview-media';
  if (file.type.startsWith('video')) preview.controls = true;
  previewContainer.appendChild(preview);

  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await fetch('/upload', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    const fullUrl = `${window.location.origin}${data.url}`;
    linkContainer.innerHTML = `<p>Ссылка:</p><a href="${fullUrl}" target="_blank">${fullUrl}</a>`;
  } catch (err) {
    linkContainer.innerHTML = 'Ошибка загрузки.';
    console.error(err);
  }
});
