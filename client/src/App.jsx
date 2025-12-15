import { useState } from "react";
import Game from "./components/Game";
import { createBoard } from "./logic/createBoard";

function App() {
  const [board, ] = useState(createBoard());
  return (
    <>
      <h1>Red Tetris</h1>
      <Game board={board} />
    </>
  );
}

export default App;
