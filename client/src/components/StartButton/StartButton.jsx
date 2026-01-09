import "./StartButton.css";

function StartButton({ onClick }) {
  return (
    <div className="start-button-container">
      <button className="start-button" onClick={onClick}>START</button>
    </div>
  );
}

export default StartButton;
