import { PROMPT_DURATION } from "~/constants";

export const createTypewriter = (displayedText) => {
  let typingInterval;
  const stopTyping = () => clearInterval(typingInterval);

  return (fullText) => {
    stopTyping();

    if (!fullText) return (displayedText.value = "");

    const characters = [...fullText];
    let printedCharacterCount = 0;

    displayedText.value = "";

    typingInterval = setInterval(
      () => {
        displayedText.value += characters[printedCharacterCount++];
        if (printedCharacterCount >= characters.length) stopTyping();
      },
      Math.max(16, (PROMPT_DURATION / 4 / characters.length) | 0),
    );
  };
};
