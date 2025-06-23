import axios from 'axios';

import { state } from './render-functions';

export async function getImagesByQuery(query) {
  const API_KEY = '50867086-a3d680221e2677e18377c4443';
  const BASE_URL = 'https://pixabay.com/api/';

  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: state.page,
    per_page: 15,
  });

  try {
    const response = await axios.get(`${BASE_URL}?${params}`);
    return response.data.hits;
  } catch (error) {
    throw error;
  }
}
