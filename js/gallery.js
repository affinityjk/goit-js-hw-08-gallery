import galleryItems from "./gallery-items.js";

const refs = {
  galleryContainer: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  lightboxOverlay: document.querySelector(".lightbox__overlay"),
  lightboxImage: document.querySelector(".lightbox__image"),
  lightboxCloseBtn: document.querySelector(
    'button[data-action="close-lightbox"]'
  ),
};

const galleryItemsMarkup = createGalleryItemsMarkup(galleryItems);
refs.galleryContainer.insertAdjacentHTML('afterbegin', galleryItemsMarkup);

refs.galleryContainer.addEventListener('click', onModalOpen);
refs.lightbox.addEventListener('click', onModalClose);

function createGalleryItemsMarkup(items) {
  return items
    .map(({ original, preview, description }) => {
      return `
        <li class="gallery__item">
          <a
            class="gallery__link"
            href="${original}"
          >
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>`;
    })
    .join('');
};

function addOpenLightboxClass() {
  refs.lightbox.classList.add('is-open');
}

function removeOpenLightboxClass() {
  refs.lightbox.classList.remove('is-open');
}

function onModalOpen(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  
  getOriginalImage(evt);
  addOpenLightboxClass();
  window.addEventListener('keydown', onModalClose);
  window.addEventListener('keydown', onEscKeyPress);
 }

function onModalClose(evt) {
  const isLightboxOverlayRef = evt.target === refs.lightboxOverlay;
  const lightboxCloseBtnRef = evt.target === refs.lightboxCloseBtn;
  
  if (isLightboxOverlayRef || lightboxCloseBtnRef) {
    removeOpenLightboxClass();

    refs.lightboxImage.src = '';
    refs.lightboxImage.alt = '';
    window.removeEventListener('keydown', onModalClose);
  }
} 

function getOriginalImage(evt) {
  const originalImage = evt.target.dataset.source;
  const description = evt.target.alt;

  refs.lightboxImage.src = originalImage;
  refs.lightboxImage.alt = description;
}

function onEscKeyPress(evt) {
  if (evt.code === 'Escape') {
    removeOpenLightboxClass();
  }
}

