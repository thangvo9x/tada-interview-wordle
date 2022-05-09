import create from "zustand";
import { persist } from "zustand/middleware";
import { computeGuess, getRandomWord, LetterState } from "./utils";

export const GUESS_LENGTH = 6;

export const useStore = create(
  persist(
    (set, get) => {
      const addGuess = (guess) => {
        const result = computeGuess(guess, get().answer);

        const didWin = result.every((l) => l === LetterState.Match);

        const rows = [...get().rows, { guess, result }];

        const keyboardLetterState = get().keyboardLetterState;

        result.forEach((r, index) => {
          const resultGuessLetter = guess[index];

          const currentLetterState = keyboardLetterState[resultGuessLetter];

          switch (currentLetterState) {
            case LetterState.Match:
              break;

            case LetterState.Present:
              if (r === LetterState.Miss) {
                break;
              }

            default:
              keyboardLetterState[resultGuessLetter] = r;
              break;
          }
        });

        set(() => ({
          rows,
          keyboardLetterState: keyboardLetterState,
          gameState: didWin
            ? "won"
            : rows.length === GUESS_LENGTH
            ? "lost"
            : "playing",
        }));
      };

      return {
        answer: getRandomWord(),
        rows: [],
        keyboardLetterState: {},
        gameState: "playing",
        addGuess,
        newGame: (initialRows = []) => {
          set({
            answer: getRandomWord(),
            rows: [],
            keyboardLetterState: {},
            gameState: "playing",
          });

          initialRows.forEach(addGuess);
        },
      };
    },
    {
      name: "tada-interview-wordle", // unique name
    }
  )
);
