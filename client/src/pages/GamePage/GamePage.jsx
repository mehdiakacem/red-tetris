import { useEffect } from "react";
import Board from "../../components/Board/Board.jsx";
import NextPiece from "../../components/NextPiece/NextPiece.jsx";
import Spectrums from "../../components/Spectrums/Spectrums.jsx";
import { socket } from "../../socket.js";
import { useParams } from "react-router";

function GamePage() {
  let { room, playerName } = useParams();
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
      socket.emit("join-room", {
        room: room,
        playerName: playerName,
      });
    });

    return () => {
      socket.off("connect");
      socket.disconnect();
    };
  }, [room, playerName]);
  return (
    <>
      <Spectrums />
      <Board />
      <NextPiece />
    </>
  );
}

export default GamePage;
