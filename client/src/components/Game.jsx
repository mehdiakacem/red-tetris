import Board from "./Board/Board";

function Game({ board }) {
  return (
    <div>
      <Board board={board} />
    </div>
  );
}
export default Game;