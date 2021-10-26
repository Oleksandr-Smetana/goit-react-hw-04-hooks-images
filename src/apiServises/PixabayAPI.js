const BASE_URL = 'https://pixabay.com/api/?';
const API_KEY = '23038692-8ee91ca42b74ab69b2665b678';

export default function fetchImages(imageQuery, page) {
  return fetch(
    `${BASE_URL}q=${imageQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`No images with query: ${imageQuery}...`),
    );
  });
}
