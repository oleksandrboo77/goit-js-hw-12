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
  hideLoadMoreButton,
  state,
  createImageCard,
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

      const totalPages = Math.ceil(state.totalHits / 15);
      if (state.page >= totalPages) {
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

    const totalPages = Math.ceil(state.totalHits / 15);

    if (state.page >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

    if (!moreImages || moreImages.length === 0) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Info',
        message: 'No more images found.',
        position: 'topRight',
      });
      return;
    }

    const extraMarkup = moreImages.map(createImageCard).join('');

    galleryEl.insertAdjacentHTML('beforeend', extraMarkup);
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
