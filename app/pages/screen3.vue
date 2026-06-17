<template>
  <div
    class="mx-auto flex min-h-screen w-full max-w-[980px] animate-screen-enter flex-col gap-2.5 bg-slate-900 p-2.5 text-slate-100"
  >
    <header
      class="game-ui flex animate-panel-rise items-center justify-between border-4 border-black bg-slate-800 px-3 py-2.5 max-sm:flex-col max-sm:items-start max-sm:gap-2"
    >
      <span class="inline-flex items-center gap-2.5 text-slate-400">
        <span
          class="size-3.5 animate-rec-blink"
          aria-hidden="true"
        />
        <span>REC · собеседование</span>
      </span>
      <span class="game-caption text-right text-slate-400 max-sm:text-left">
        {{ currentStage?.name }}
        <br />
        Вопрос: {{ currentQuestion?.id }} / {{ currentStage?.questions.length }}
      </span>
    </header>

    <div class="flex gap-2.5">
      <section
        class="relative min-w-0 flex-1 animate-panel-rise overflow-hidden border-4 border-black bg-slate-700 transition-[box-shadow,border-color,transform] duration-180"
        :class="
          currentSpeaker === 'hr'
            ? 'border-emerald-400 shadow-[0_0_0_3px_#059669] -translate-y-0.5'
            : ''
        "
      >
        <img
          src="/assets/sprites/hr.svg"
          alt="Интервьюер"
          class="mx-auto block w-full [image-rendering:pixelated]"
        />
        <span
          class="game-ui absolute bottom-3 left-3 border-2 border-black px-2 py-1.5 transition-colors"
          :class="
            currentSpeaker === 'hr'
              ? 'bg-emerald-600 text-slate-100'
              : 'bg-slate-700 text-slate-100'
          "
          >HR</span
        >
      </section>
      <section
        class="relative min-w-0 flex-1 animate-panel-rise overflow-hidden border-4 border-black bg-slate-700 transition-[box-shadow,border-color,transform] duration-180 [animation-delay:80ms]"
        :class="
          currentSpeaker === 'candidate'
            ? 'border-emerald-400 shadow-[0_0_0_3px_#059669] -translate-y-0.5'
            : ''
        "
      >
        <img
          src="/assets/sprites/candidate.svg"
          alt="Кандидат"
          class="mx-auto block w-full [image-rendering:pixelated]"
        />
        <span
          class="game-ui absolute bottom-3 left-3 border-2 border-black px-2 py-1.5 transition-colors"
          :class="
            currentSpeaker === 'candidate'
              ? 'bg-emerald-600 text-slate-100'
              : 'bg-slate-700 text-slate-100'
          "
          >Вы</span
        >
      </section>
    </div>

    <section
      class="flex animate-panel-rise flex-col gap-2 border-4 border-black bg-slate-950 p-2.5 [animation-delay:120ms]"
    >
      <p
        class="flex min-h-14 items-center gap-2.5 overflow-hidden border-2 border-black bg-slate-900 p-3"
      >
        <span
          class="game-ui shrink-0 border-2 border-black px-1.5 py-1"
          :class="
            currentSpeaker === 'candidate'
              ? 'bg-emerald-500/10 text-emerald-400'
              : 'bg-yellow-400/10 text-yellow-300'
          "
          >{{ currentSpeaker === 'hr' ? 'HR' : 'Вы' }}</span
        >
        <span
          class="question-panel__typed readable-sm block min-w-0 max-w-full flex-1 overflow-clip wrap-anywhere break-words"
          >{{ animatedPrompt }}</span
        >
      </p>

      <Button
        v-for="(answer, answerIndex) in currentQuestion?.answers"
        :key="answerIndex"
        type="button"
        class="readable-sm !w-full !justify-start !border-2 !border-black !bg-slate-700 !p-3 !text-slate-100 animate-answer-enter disabled:!bg-slate-800 disabled:opacity-50 hover:enabled:!border-emerald-600 hover:enabled:!bg-slate-600 active:enabled:!bg-slate-500 [&_.p-button-label]:whitespace-normal [&_.p-button-label]:text-left [&_.p-button-label]:font-body [&_.p-button-label]:leading-snug"
        :class="{
          '[animation-delay:60ms]': answerIndex === 1,
          '[animation-delay:120ms]': answerIndex === 2,
          '[animation-delay:180ms]': answerIndex === 3
        }"
        @click="handleAnswer(answer.text)"
        :disabled="buttonsDisabled"
      >
        {{ answer?.text }}
      </Button>
    </section>

    <footer
      class="mx-auto flex w-full max-w-[520px] animate-panel-rise items-center justify-center gap-2 border-4 border-black bg-slate-950 p-2 [animation-delay:180ms] max-sm:max-w-full max-sm:flex-wrap"
    >
      <Button
        aria-label="Микрофон"
        class="!border-black !bg-slate-800 !text-slate-400 !transform-none !shadow-none !transition-colors !duration-150 hover:!bg-slate-900 hover:!text-slate-100 hover:!transform-none hover:!shadow-none active:!transform-none active:!shadow-none"
      >
        <template #icon>
          <img
            src="/assets/sprites/zoom-mic.svg"
            alt=""
            class="size-4"
          />
        </template>
      </Button>

      <Button
        aria-label="Камера"
        class="!border-black !bg-slate-800 !text-slate-400 !transform-none !shadow-none !transition-colors !duration-150 hover:!bg-slate-900 hover:!text-slate-100 hover:!transform-none hover:!shadow-none active:!transform-none active:!shadow-none"
      >
        <template #icon>
          <img
            src="/assets/sprites/zoom-camera.svg"
            alt=""
            class="size-4"
          />
        </template>
      </Button>

      <Button
        aria-label="Участники"
        class="!border-black !bg-slate-800 !text-slate-400 !transform-none !shadow-none !transition-colors !duration-150 hover:!bg-slate-900 hover:!text-slate-100 hover:!transform-none hover:!shadow-none active:!transform-none active:!shadow-none"
      >
        <template #icon>
          <img
            src="/assets/sprites/zoom-users.svg"
            alt=""
            class="size-4"
          />
        </template>
      </Button>

      <Button
        aria-label="Чат"
        class="!border-black !bg-slate-800 !text-slate-400 !transform-none !shadow-none !transition-colors !duration-150 hover:!bg-slate-900 hover:!text-slate-100 hover:!transform-none hover:!shadow-none active:!transform-none active:!shadow-none"
      >
        <template #icon>
          <img
            src="/assets/sprites/zoom-chat.svg"
            alt=""
            class="size-4"
          />
        </template>
      </Button>

      <Button
        aria-label="Покинуть встречу"
        class="!border-black !bg-red-500 !text-slate-100 !transform-none !shadow-none !transition-colors !duration-150 hover:!bg-red-600 hover:!text-slate-100 hover:!transform-none hover:!shadow-none active:!transform-none active:!shadow-none"
      >
        <template #icon>
          <img
            src="/assets/sprites/zoom-leave.svg"
            alt=""
            class="size-4"
          />
        </template>
      </Button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { createTypewriter } from '~/utils/typewriter'
import { PROMPT_DURATION } from '~/constants'
import { Button } from 'primevue'

useHead({
  title: 'Собеседование'
})

type SpeakerSide = 'hr' | 'candidate'

const { currentStage, currentQuestion, isLastStageEnded, nextQuestion } =
  await useStages()
const currentSpeaker = ref<SpeakerSide>('hr')
const currentPrompt = ref(currentQuestion.value?.text ?? '')
const animatedPrompt = ref('')
const buttonsDisabled = ref(false)

const { toNextScreen } = useScreenNavigate()

const runTyping = createTypewriter(animatedPrompt)

watch(currentPrompt, newVal => runTyping(newVal), { immediate: true })

watch(isLastStageEnded, () => {
  toNextScreen()
})

const handleAnswer = (answer: string) => {
  buttonsDisabled.value = true
  currentSpeaker.value = 'candidate'
  currentPrompt.value = answer

  setTimeout(() => {
    currentSpeaker.value = 'hr'
    currentPrompt.value = currentQuestion.value?.reaction ?? ''

    setTimeout(() => {
      nextQuestion()
      currentPrompt.value = currentQuestion.value?.text ?? ''
      buttonsDisabled.value = false
    }, PROMPT_DURATION)
  }, PROMPT_DURATION)
}
</script>
