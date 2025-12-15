import "./Board.css";

export default function Board({ board }) {
  return (
    <div className="board">
      {board.flat().map((cell, index) => (
        <div key={index} className={`cell ${cell ? "filled" : ""}`}></div>
      ))}
    </div>
  );
}
