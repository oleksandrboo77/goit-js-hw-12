import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  lightbox,
  showLoader,
  hideLoader,
  clearGallery,
  createGallery,
  galleryEl,
  loadMoreEl,
  showLoadMoreButton,
  state,
} from './js/render-functions';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', handleSubmit);

loadMoreEl.addEventListener('click', loadMoreClick);

function handleSubmit(event) {
  event.preventDefault();

  const request = event.currentTarget.elements['search-text'].value.trim();

  if (!request) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query',
      position: 'topRight',
    });
    return;
  }

  state.currentQuery = request;
  state.page = 1;

  clearGallery();
  showLoader();

  getImagesByQuery(request)
    .then(data => {
      if (!data || data.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }

      createGallery(data);
      showLoadMoreButton();

      state.totalLoaded = data.length;
      state.totalHits = data.totalHits;

      if (state.totalLoaded >= state.totalHits) {
        hideLoadMoreButton();
        iziToast.info({
          title: 'Info',
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }
    })

    .catch(error => {
      console.log(error);
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Try again later.',
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader();
    });
}

async function loadMoreClick() {
  showLoader();
  state.page += 1;
  try {
    const moreImages = await getImagesByQuery(state.currentQuery);

    state.totalLoaded += moreImages.length;

    if (state.totalLoaded >= state.totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

    if (!moreImages || moreImages.length === 0) {
      iziToast.info({
        title: 'Info',
        message: 'No more images found.',
        position: 'topRight',
      });
      return;
    }

    const markup = moreImages
      .map(
        ({
          likes,
          views,
          comments,
          downloads,
          webformatURL,
          tags,
          largeImageURL,
        }) =>
          `
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
  
      </li> `
      )
      .join('');
    galleryEl.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Could not load more images.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}
