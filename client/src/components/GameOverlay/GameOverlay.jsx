import StartButton from "../StartButton/StartButton";
import WaitingForHost from "../WaitingForHost/WaintingForHost";
import "./GameOverlay.css";

function GameOverlay({ isAlive, isGameEnded, isHost, onRestart }) {

  // Player lost but game still running
  if (!isAlive && !isGameEnded) {
    return (
      <div className="game-overlay">
        <p>You lost</p>
        <p>Waiting for game to end...</p>
      </div>
    );
  }

  // Game ended — player lost
  if (!isAlive && isGameEnded) {
    return (
      <div className="game-overlay">
        <p>You lost</p>
        {isHost ? (
          <StartButton onClick={onRestart} restart />
        ) : (
          <WaitingForHost restart />
        )}
      </div>
    );
  }

  // Game ended — player won
  if (isAlive && isGameEnded) {
    return (
      <div className="game-overlay">
        <p>You won 🎉</p>
        {isHost ? (
          <StartButton onClick={onRestart} restart />
        ) : (
          <WaitingForHost restart />
        )}
      </div>
    );
  }

  // No overlay
  return null;
}

export default GameOverlay;
