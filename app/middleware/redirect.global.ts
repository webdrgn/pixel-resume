export default defineNuxtRouteMiddleware(async (to, from) => {
  const { getCurrentScreen, resetCurrentScreen } = useScreenNavigate()
  const targetScreen = `screen${getCurrentScreen()}`

  if (to.path === '/') return

  if (to.name !== targetScreen) {
    try {
      return navigateTo({
        name: targetScreen
      })
    } catch (error) {
      console.error('redirect error:', error)
      resetCurrentScreen()
      return navigateTo('/')
    }
  }
})
