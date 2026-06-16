<template>
  <div class="relative min-h-screen w-full py-16 px-4">
    <Button
      label="сброс"
      class="!fixed top-3 right-3 z-20 !border-black !bg-slate-800 !px-2.5 !py-2 !text-[10px] !text-slate-400 hover:!bg-slate-900 hover:!text-slate-100"
      @click="handleresetCurrentScreen"
    />
    <div class="mx-auto w-full max-w-[980px]">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { Button } from 'primevue'
const { resetCurrentScreen } = useScreenNavigate()

const handleresetCurrentScreen = () => {
  resetCurrentScreen()
  navigateTo('/')
}
</script>
