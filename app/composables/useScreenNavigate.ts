export const useScreenNavigate = () => {
  const getCurrentScreen = () => {
    return localStorage?.getItem("currentScreen");
  };

  const currentScreen = ref(Number(getCurrentScreen()) || 0);

  const toNextScreen: any = () => {
    currentScreen.value++;
    localStorage?.setItem("currentScreen", String(currentScreen.value));
    navigateTo(`/screen${currentScreen.value}`);
  };

  const resetCurrentScreen = () => {
    localStorage.removeItem("currentScreen");
  };

  return {
    currentScreen,
    toNextScreen,
    getCurrentScreen,
    resetCurrentScreen,
  };
};
