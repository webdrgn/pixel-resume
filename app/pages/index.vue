<template>
  <div
    class="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[560px] animate-screen-enter flex-col items-center justify-center gap-4 p-2 sm:p-3"
  >
    <div
      class="w-full max-w-120 animate-art-float border-4 border-black bg-slate-800 p-2.5 [image-rendering:pixelated]"
    >
      <img
        src="/assets/sprites/candidate_interviewer.svg"
        alt=""
        class="block w-full"
      />
    </div>

    <h1 class="m-0 text-balance text-center text-lg leading-relaxed text-slate-100">
      Помоги Васе получить оффер
    </h1>

    <p class="m-0 text-balance text-center text-[10px] leading-relaxed text-slate-400">
      собеседование в формате zoom-звонка
    </p>

    <div class="flex w-full flex-col items-center gap-3">
      <PixelButton
        label="НАЧАТЬ"
        color="#10b981"
        @click="toNextScreen"
      />
    </div>

    <p class="m-0 text-center text-[10px] leading-relaxed text-slate-500">
      твой любимый симулятор HR-собеса
    </p>
  </div>
</template>

<script setup>
const { currentScreen, toNextScreen } = useScreenNavigate()

</script>
