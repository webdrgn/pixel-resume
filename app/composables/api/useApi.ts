export const useAPI = createUseFetch({
  baseURL: import.meta.env.VITE_BACKEND_PRODUCTION_URL
})
