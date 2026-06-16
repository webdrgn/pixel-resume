<template>
  <div
    class="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[560px] animate-screen-enter flex-col items-center justify-center gap-4 p-2 sm:p-3"
  >
    <div
      class="w-full max-w-80 animate-art-float border-4 border-black bg-slate-800 p-2.5 [image-rendering:pixelated]"
    >
      <img src="/assets/sprites/candidate.svg" alt="" class="block w-full" />
    </div>

    <h1
      class="m-0 text-balance text-center text-sm leading-relaxed text-slate-100"
    >
      Твоя роль
    </h1>

    <p
      class="m-0 text-balance text-center text-[10px] leading-relaxed text-slate-400"
    >
      Вставь резюме или кратко опиши свой опыт
    </p>

    <div class="w-full">
      <Textarea placeholder="сюда вставьте свой текст" class="w-full" />
    </div>

    <div class="flex w-full flex-col items-center gap-3">
      <PixelButton
        label="ВОЙТИ НА СОЗВОН"
        color="#2563eb"
        ink="#ffffff"
        @click="toNextScreen"
      />
    </div>
  </div>
</template>

<script setup>
const { currentScreen, toNextScreen, getCurrentScreen } = useScreenNavigate();
</script>
