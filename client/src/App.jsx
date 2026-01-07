import Game from "./components/Game";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Red Tetris</h1>
      </header>
      <Game />
      <footer className="footer">Status</footer>
    </div>
  );
}

export default App;
