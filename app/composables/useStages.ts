import game from "~/storage/game.json";

export const useStages = () => {
  const stages = computed(() => game?.stages);
  const currentStageId = ref(1);
  const currentQuestionId = ref(1);
  const isLastStageEnded = ref(false);

  const currentStage: any = computed(() =>
    stages.value?.find((stage) => stage.id === currentStageId.value),
  );

  const currentQuestion = computed(() =>
    currentStage.value?.questions.find(
      (question: any) => question.id === currentQuestionId.value,
    ),
  );

  const isLastStage = computed(
    () => currentStage.value?.id === stages.value.length,
  );

  const nextStage = () => {
    currentStageId.value++;
    currentQuestionId.value = 1;
  };

  const nextQuestion = () => {
    const isLastQuestionInStage =
      currentQuestion.value.id === currentStage.value.questions.length;

    if (isLastQuestionInStage && !isLastStage.value) {
      nextStage();
      return;
    }

    if (isLastQuestionInStage && isLastStage.value) {
      // конец интервью
      isLastStageEnded.value = true;
    }

    currentQuestionId.value++;
  };

  return {
    currentStageId,
    currentQuestionId,
    nextStage,
    nextQuestion,
    currentStage,
    currentQuestion,
    isLastStageEnded,
  };
};
