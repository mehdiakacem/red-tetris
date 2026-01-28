import Board from "../Board/Board";
import GameOverLay from "../GameOverlay/GameOverlay";

export default function BoardSection({
  player,
  isAlive,
  isGameEnded,
  isHost,
  onRestart,
}) {
  return (
    <div className="board-container">
      <GameOverLay
        isAlive={isAlive}
        isGameEnded={isGameEnded}
        isHost={isHost}
        onRestart={onRestart}
      />

      <Board board={player.board} activePiece={player.currentPiece} />
    </div>
  );
}
