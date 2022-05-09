import { useStore } from "../store";
import { LetterState } from "../utils";

export default function Keyboard({ onClick: onClickProps }) {
  const keyboardLetterState = useStore((s) => s.keyboardLetterState);

  const onClick = (e) => {
    const { textContent, innerHTML } = e.currentTarget;

    let returnProps = textContent ?? "";

    if (textContent !== innerHTML) {
      returnProps = "Delete";
    }

    onClickProps(returnProps);
  };

  return (
    <div className={`flex flex-col`}>
      {keyboardKeys.map((keyboardRow, rowIndex) => (
        <div
          key={rowIndex}
          className="flex justify-center my-2 mb-2 space-x-1 text-white"
        >
          {keyboardRow.map((key, index) => {
            let styles = "rounded font-bold uppercase flex-1 py-2";

            const letterState = keyStateStyles[keyboardLetterState[key]];

            if (letterState) {
              styles += " text-white px-1 " + letterState;
            } else if (key !== "") {
              styles += " bg-gray-600";
            }

            if (key === "") {
              styles += " pointer-events-none";
            } else {
              styles += " px-1";
            }

            return (
              <button onClick={onClick} key={key + index} className={styles}>
                {key === "delete" ? backspace : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

const keyStateStyles = {
  [LetterState.Miss]: "bg-gray-800",
  [LetterState.Present]: "bg-yellow-500",
  [LetterState.Match]: "bg-green-500",
};

const keyboardKeys = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["", "a", "s", "d", "f", "g", "h", "j", "k", "l", ""],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "Delete"],
];

const backspace = (
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
    <path fill="var(--color-tone-1)" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path>
  </svg>
);
