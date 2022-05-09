import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { BsPatchQuestion } from "react-icons/bs";
import Instructions from "./Instructions";

const Header = () => {
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);

  const toggleInstructions = () => setIsInstructionsOpen(!isInstructionsOpen);

  return (
    <header className="relative flex justify-center pb-2 my-2 border-b border-gray-500">
      <button onClick={toggleInstructions} data-testid="instructions">
        <BsPatchQuestion className="absolute text-3xl text-white transition-opacity duration-300 left-3 top-2 hover:opacity-80" />
      </button>

      <Instructions isOpen={isInstructionsOpen} onClose={toggleInstructions} />

      <h1 className="text-4xl font-extrabold text-center text-gray-50">
        Word
      </h1>

      <a href="https://github.com/thangvo9x" target="_blank">
        <FaGithub className="absolute text-3xl text-white transition-opacity duration-300 right-3 top-2 hover:opacity-80" />
      </a>
    </header>
  );
};

export default Header;
