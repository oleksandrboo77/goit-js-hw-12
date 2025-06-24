import axios from 'axios';

import { state } from './render-functions';

export async function getImagesByQuery(query, page = 1) {
  const API_KEY = '50867086-a3d680221e2677e18377c4443';
  const BASE_URL = 'https://pixabay.com/api/';

  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 15,
  });

  try {
    const response = await axios.get(`${BASE_URL}?${params}`);
    return {
      hits: response.data.hits,
      totalHits: response.data.totalHits,
    };
  } catch (error) {
    throw error;
  }
}
