export const API_URL=
  process.env.NODE_ENV === "test" ? 
  "http://mocked-api-url" : 
  import.meta.env.VITE_API_URL

export const BASE_URL = 'http://localhost:3000';
