<template>
  <div
    class="mx-auto flex min-h-screen w-full max-w-[980px] animate-screen-enter flex-col gap-2.5 bg-slate-900 p-2.5 text-slate-100"
  >
    <header
      class="game-ui flex animate-panel-rise border-4 border-black bg-slate-800 px-3 py-2.5"
    >
      <span class="inline-flex items-center gap-2.5 text-slate-400">
        <span
          class="size-3.5 animate-pulse bg-violet-500"
          aria-hidden="true"
        />
        <span>ИТОГИ · собеседование завершено</span>
      </span>
    </header>

    <section
      class="flex animate-panel-rise items-center gap-4 border-4 border-black bg-slate-800 p-3 [animation-delay:60ms] max-sm:flex-col max-sm:text-center"
    >
      <img
        src="/assets/sprites/candidate.svg"
        alt=""
        class="w-[120px] shrink-0 border-2 border-black bg-slate-700 [image-rendering:pixelated]"
      />
      <div class="flex min-w-0 flex-col gap-2.5">
        <p class="game-ui m-0 text-emerald-400">
          {{ interviewOutcome.candidate }}
        </p>
        <p class="game-title m-0 text-sm text-red-400">
          {{ interviewOutcome.verdict }}
        </p>
      </div>
    </section>

    <section
      class="animate-panel-rise border-4 border-black bg-slate-950 p-3 [animation-delay:120ms]"
    >
      <h2 class="game-label mb-2.5 text-yellow-300">Почему не взяли</h2>
      <ul class="m-0 flex list-none flex-col gap-2 p-0">
        <li
          v-for="(reason, reasonIndex) in interviewOutcome.reasons"
          :key="reason"
          class="readable-sm flex animate-answer-enter items-start gap-2.5 border-2 border-black bg-slate-900 p-2.5"
          :class="{
            '[animation-delay:40ms]': reasonIndex === 1,
            '[animation-delay:80ms]': reasonIndex === 2,
            '[animation-delay:120ms]': reasonIndex === 3,
            '[animation-delay:160ms]': reasonIndex === 4
          }"
        >
          <span
            class="shrink-0 text-sm leading-none text-red-400"
            aria-hidden="true"
            >×</span
          >
          <span>{{ reason }}</span>
        </li>
      </ul>
    </section>

    <section
      class="animate-panel-rise border-4 border-black bg-slate-950 p-3 [animation-delay:180ms]"
    >
      <h2 class="game-label mb-2.5 text-yellow-300">Оценки HR</h2>
      <div class="flex flex-col gap-2">
        <article
          v-for="(ratingRow, ratingIndex) in ratingRows"
          :key="ratingRow.caption"
          class="readable-sm grid animate-answer-enter grid-cols-[minmax(110px,1fr)_1fr_auto] items-center gap-2.5 border-2 border-black bg-slate-900 p-2.5 max-sm:grid-cols-1 max-sm:gap-2"
          :class="{
            '[animation-delay:40ms]': ratingIndex === 1,
            '[animation-delay:80ms]': ratingIndex === 2,
            '[animation-delay:120ms]': ratingIndex === 3,
            '[animation-delay:160ms]': ratingIndex === 4
          }"
        >
          <span class="text-slate-400">{{ ratingRow.caption }}</span>
          <div
            class="flex gap-[3px]"
            aria-hidden="true"
          >
            <span
              v-for="blockIndex in ratingRow.totalCount"
              :key="blockIndex"
              class="size-3.5 border-2 border-black bg-slate-700 transition-colors duration-100"
              :class="
                blockIndex <= ratingRow.filledCount
                  ? 'bg-emerald-400 shadow-[inset_0_0_0_1px_#059669]'
                  : ''
              "
            />
          </div>
          <span class="min-w-[42px] text-right text-amber-400 max-sm:text-left">
            {{ ratingRow.scoreText }}
          </span>
        </article>
      </div>
    </section>

    <section
      class="animate-panel-rise flex flex-col items-center gap-4 border-4 border-emerald-600 bg-slate-900 p-4 shadow-[0_0_0_3px_#34d399] [animation-delay:240ms]"
    >
      <div class="w-full text-center">
        <h2 class="readable-sm m-0 mb-3 text-balance font-semibold text-emerald-400">
          {{ outreachOffer.title }}
        </h2>
        <p class="readable-copy m-0 text-balance text-slate-300">
          {{ outreachOffer.text }}
        </p>
      </div>

      <a
        :href="outreachOffer.url"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex no-underline"
      >
        <PixelButton
          :label="outreachOffer.buttonLabel"
          color="#10b981"
          :show-play-mark="false"
        >
          <template #icon>
            <i class="pi pi-external-link text-[10px]" aria-hidden="true" />
          </template>
        </PixelButton>
      </a>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useAPI } from '~/composables/api/useApi';
import type { IGame } from '~/types/stages';

const { data: game } = await useAPI<IGame>('/api/game?gameId=1')

useHead({
  title: 'Итоги собеседования'
})

const interviewOutcome = game.value?.final
const outreachOffer = game.value?.offer

const ratingCaptions = {
  tech: 'Техника',
  business: 'Бизнес',
  ownership: 'Ownership',
  communication: 'Коммуникация'
}

const ratingRows = Object.entries(game.value?.final.ratings).map(
  ([ratingId, scoreText]) => {
    const [filledCount, totalCount] = scoreText.split('/').map(Number)

    return {
      caption: ratingCaptions[ratingId],
      scoreText,
      filledCount,
      totalCount
    }
  }
)
</script>
