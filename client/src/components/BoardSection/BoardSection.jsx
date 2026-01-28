import Board from "../Board/Board"
import StartButton from "../StartButton/StartButton";
import WaitingForHost from "../WaitingForHost/WaintingForHost";

export default function BoardSection({
  player,
  isAlive,
  isGameEnded,
  isHost,
  onRestart,
}) {
  return (
    <div className="board-container">
      {!isAlive ? (
        <div className="game-over-screen">
          {isGameEnded ? (
            <div>
              <p>You lost</p>
              {isHost ? (
                <StartButton onClick={onRestart} restart={isGameEnded} />
              ) : (
                <WaitingForHost restart={isGameEnded} />
              )}
            </div>
          ) : (
            <div>
              <p>you lost</p>
              <p>waiting for game to end...</p>
            </div>
          )}
        </div>
      ) : (
        isGameEnded && (
          <div className="game-over-screen">
            <div>
              <p>You won</p>
              {isHost ? (
                <StartButton onClick={onRestart} restart={isGameEnded} />
              ) : (
                <WaitingForHost restart={isGameEnded} />
              )}
            </div>
          </div>
        )
      )}

      <Board board={player.board} activePiece={player.currentPiece} />
    </div>
  );
}
