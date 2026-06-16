<template>
  <div
    class="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[560px] animate-screen-enter flex-col items-center justify-center gap-4 p-2 sm:p-3"
  >
    <h1
      class="m-0 animate-pulse-text text-balance text-center text-sm leading-relaxed text-slate-100"
    >
      Подключение к встрече
    </h1>

    <PixelLoader />

    <p
      class="m-0 text-balance text-center text-[10px] leading-relaxed text-slate-400"
    >
      Zoom · ожидание интервьюера...
    </p>
  </div>
</template>

<script setup>
const { toNextScreen } = useScreenNavigate();

onMounted(() => {
  setTimeout(toNextScreen, 3000);
});
</script>
