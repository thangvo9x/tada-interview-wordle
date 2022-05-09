import words from "./words.json";

export const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * words.valid.length);

  return words.valid[randomIndex];
};

export const LETTER_LENGTH = 5;

export const LetterState = {
  Miss: "Miss",
  Present: "Present",
  Match: "Match",
};

export const computeGuess = (guess, answer) => {
  const result = [];
  if (guess.length !== answer.length) {
    return result;
  }

  const guessArray = guess.split("");
  const answerArray = answer.split("");

  const match = guessArray.map((letter) => ({
    letter: letter,
    state: LetterState.Miss,
  }));

  for (let i = guessArray.length - 1; i >= 0; i--) {
    if (answer[i] === guessArray[i]) {
      match[i].state = LetterState.Match;
      answerArray.splice(i, 1);
    }
  }

  guessArray.forEach((letter, i) => {
    if (answerArray.includes(letter) && match[i].state !== LetterState.Match) {
      match[i].state = LetterState.Present;
      answerArray.splice(answerArray.indexOf(letter), 1);
    }
  });

  match.forEach((letter) => {
    result.push(letter.state);
  });

  return result;
};

export const isValidWord = (guess) => {
  return words.valid.includes(guess);
};
