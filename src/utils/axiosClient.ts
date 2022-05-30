import axios from 'axios';

export const bibleApi = axios.create({
  headers: {
    'api-key': import.meta.env.VITE_BIBLE_API_KEY as string
  },
  baseURL: 'https://api.scripture.api.bible/v1/'
});
