<template>
  <button
    type="button"
    class="pixel-btn cursor-pointer border-0 bg-transparent p-0 font-[inherit] leading-none [image-rendering:pixelated] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-slate-100"
    :style="faceStyle"
    v-bind="$attrs"
  >
    <span class="inline-flex pb-3">
      <span class="pixel-btn__frame flex flex-col border-x-2 border-black">
        <span class="pixel-btn__surface flex min-h-[58px] items-center justify-center gap-3.5 px-7 py-3.5 font-['Press_Start_2P',monospace] text-xs tracking-wide">
          <span
            v-if="$slots.icon || showPlayMark"
            class="flex shrink-0 items-center justify-center"
          >
            <slot name="icon">
              <span
                class="block size-0 border-y-[7px] border-l-[12px] border-y-transparent border-l-current"
                aria-hidden="true"
              />
            </slot>
          </span>

          <span class="whitespace-nowrap">
            <slot>{{ label }}</slot>
          </span>
        </span>

        <span
          class="pixel-btn__lip h-3.5 border-b-2 border-black"
          aria-hidden="true"
        />
      </span>
    </span>
  </button>
</template>

<script setup>
defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '#10b981',
  },
  ink: {
    type: String,
    default: '#001902',
  },
  showPlayMark: {
    type: Boolean,
    default: true,
  },
})

const faceStyle = computed(() => ({
  '--btn-face': props.color,
  '--btn-ink': props.ink,
}))
</script>

<style scoped>
.pixel-btn__frame {
  transform: translateY(0);
  transition: transform 70ms steps(3, end);
}

.pixel-btn:active .pixel-btn__frame {
  transform: translateY(12px);
}

.pixel-btn__surface {
  background: var(--btn-face);
  color: var(--btn-ink);
  transition: filter 70ms steps(3, end);
}

.pixel-btn:active .pixel-btn__surface {
  filter: brightness(0.9);
}

.pixel-btn__lip {
  background: linear-gradient(
    to bottom,
    color-mix(in srgb, var(--btn-face) 82%, #000) 0%,
    color-mix(in srgb, var(--btn-face) 62%, #000) 35%,
    color-mix(in srgb, var(--btn-face) 48%, #000) 65%,
    color-mix(in srgb, var(--btn-face) 38%, #000) 100%
  );
  transition: height 70ms steps(3, end);
}

.pixel-btn:active .pixel-btn__lip {
  height: 2px;
}
</style>
