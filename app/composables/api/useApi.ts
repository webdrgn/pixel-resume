export const useAPI = createUseFetch({
    baseURL: import.meta.env.VITE_BACKEND_PRODUCTION_URL,
    onRequest ({ options }) {
      const { session } = useUserSession()
      if (session.value?.token) {
        options.headers.set('Authorization', `Bearer ${session.value.token}`)
      }
    },
    async onResponseError ({ response }) {
      if (response.status === 401) {
        await navigateTo('/login')
      }
    },
  })
  