import Game from "./components/Game";
import "./App.css";
import { socket } from "./socket";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    socket.connect();
    
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
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
