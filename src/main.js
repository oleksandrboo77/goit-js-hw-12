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
  appendToGallery,
} from './js/render-functions';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', handleSubmit);

loadMoreEl.addEventListener('click', loadMoreClick);

async function handleSubmit(event) {
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

  state.totalLoaded = 0;

  clearGallery();
  showLoader();

  try {
    const { hits, totalHits } = await getImagesByQuery(request, state.page);

    if (!hits || hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query.',
        position: 'topRight',
      });
      hideLoadMoreButton();
      return;
    }

    createGallery(hits);

    state.totalLoaded = hits.length;
    state.totalHits = totalHits;

    const totalPages = Math.ceil(totalHits / 15);

    if (state.page < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

async function loadMoreClick() {
  showLoader();
  state.page += 1;

  try {
    const { hits } = await getImagesByQuery(state.currentQuery, state.page);

    if (!hits || hits.length === 0) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Info',
        message: 'No more images found.',
        position: 'topRight',
      });
      return;
    }

    appendToGallery(hits);

    state.totalLoaded += hits.length;
    const totalPages = Math.ceil(state.totalHits / 15);

    if (state.page >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

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
