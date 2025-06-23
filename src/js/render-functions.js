import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const galleryEl = document.querySelector('.gallery');
export const loaderEl = document.querySelector('.loader');
export const loadMoreEl = document.querySelector('.load-more');

export const state = {
  page: 1,
  currentQuery: '',
  totalHits: 0,
  totalLoaded: 0,
};

export let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function showLoader() {
  loaderEl.classList.remove('hidden');
}

export function hideLoader() {
  loaderEl.classList.add('hidden');
}

export function clearGallery() {
  galleryEl.innerHTML = '';
}

export function createImageCard({
  likes,
  views,
  comments,
  downloads,
  webformatURL,
  tags,
  largeImageURL,
}) {
  return `
      <li class="image-card">
        <a href="${largeImageURL}" class="gallery-link">
          <img src="${webformatURL}" alt="${tags}" class="image-icon">
        </a>
        <div class="image-card-statistic">
          <div class="image-card-statistic-item">
            <h2 class="image-likes image-card-statistic-item-title">Likes</h2>
            <p class="image-card-statistic-item-number">${likes}</p>
          </div>
          <div class="image-card-statistic-item">
            <h2 class="image-views image-card-statistic-item-title">Views</h2>
            <p class="image-card-statistic-item-number">${views}</p>
          </div>
          <div class="image-card-statistic-item">
            <h2 class="image-comments image-card-statistic-item-title">Comments</h2>
            <p class="image-card-statistic-item-number">${comments}</p>
          </div>
          <div class="image-card-statistic-item">
            <h2 class="image-downloads image-card-statistic-item-title">Downloads</h2>
            <p class="image-card-statistic-item-number">${downloads}</p>
          </div>
        </div>
      </li>
    `;
}

export function createGallery(images) {
  const markup = images.map(createImageCard).join('');

  galleryEl.innerHTML = markup;
  lightbox.refresh();
}

export function showLoadMoreButton() {
  loadMoreEl.classList.replace('load-more-hidden', 'load-more');
}

export function hideLoadMoreButton() {
  loadMoreEl.classList.replace('load-more', 'load-more-hidden');
}
