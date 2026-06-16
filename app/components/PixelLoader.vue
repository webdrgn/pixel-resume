<template>
  <div
    class="inline-flex items-center gap-[calc(var(--cell-size)*0.6)]"
    :style="{ '--cell-size': `${size}px` }"
    role="status"
    aria-label="Загрузка"
  >
    <span class="size-[var(--cell-size)] animate-pixel-loader bg-emerald-600" />
    <span class="size-[var(--cell-size)] animate-pixel-loader bg-emerald-600 [animation-delay:0.2s]" />
    <span class="size-[var(--cell-size)] animate-pixel-loader bg-emerald-600 [animation-delay:0.4s]" />
  </div>
</template>

<script setup>
defineProps({
  size: {
    type: Number,
    default: 14,
  },
})
</script>
