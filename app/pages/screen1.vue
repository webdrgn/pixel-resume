<template>
  <div
    class="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[560px] animate-screen-enter flex-col items-center justify-center gap-4 p-2 sm:p-3"
  >
    <p class="game-label m-0 text-center text-yellow-300">
      ДОСЬЕ КАНДИДАТА
    </p>

    <div
      class="w-full max-w-80 animate-art-float border-4 border-black bg-slate-800 p-2.5 [image-rendering:pixelated]"
    >
      <img src="/assets/sprites/candidate.svg" alt="" class="block w-full" />
    </div>

    <h1 class="game-title m-0 text-balance text-center text-slate-100">
      Твоя роль
    </h1>

    <article
      class="readable-copy w-full border-4 border-black bg-slate-900 p-3.5 text-slate-300"
    >
      <p class="m-0 mb-3 text-balance text-slate-100">
        <template v-for="(segment, segmentIndex) in game?.candidate.story" :key="segmentIndex">
          <span
            :class="{
              'text-emerald-400': segment.highlight === 'name',
              'text-yellow-300': segment.highlight === 'emphasis',
            }"
          >{{ segment.text }}</span>
        </template>
      </p>

      <dl class="m-0 flex flex-col gap-2.5">
        <div
          v-for="profileField in game?.candidate.profile"
          :key="profileField.label"
          class="grid grid-cols-[minmax(0,108px)_1fr] gap-2 border-t-2 border-black pt-2.5 first:border-t-0 first:pt-0"
        >
          <dt class="readable-caption font-medium text-slate-500">{{ profileField.label }}</dt>
          <dd class="m-0 text-slate-100">{{ profileField.detail }}</dd>
        </div>
      </dl>
    </article>

    <div class="flex w-full flex-col items-center gap-3">
      <PixelButton
        label="ВОЙТИ НА СОЗВОН"
        color="#2563eb"
        ink="#ffffff"
        :show-play-mark="false"
        @click="toNextScreen"
      >
        <template #icon>
          <i class="pi pi-video text-[10px]" aria-hidden="true" />
        </template>
      </PixelButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAPI } from '~/composables/api/useApi';
import type { IGame } from '~/types/stages';

const { data: game } = await useAPI<IGame>('/api/game?gameId=1')

const { toNextScreen } = useScreenNavigate()

useHead({
  title: 'Твоя роль',
})
</script>
