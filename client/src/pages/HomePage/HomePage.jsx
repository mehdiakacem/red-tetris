import "./HomePage.css";
import NextPiece from "../../components/NextPiece/NextPiece.jsx";
import Spectrums from "../../components/Spectrums/Spectrums.jsx";
import EmptyBoard from "../../components/EmptyBoard/EmptyBoard.jsx";
import { Link } from "react-router";
import { JoinGameForm } from "../../components/JoinGameForm/JoinGameForm.jsx";

function HomePage() {

  return (
    <>
      <Spectrums />
      <EmptyBoard>
      <JoinGameForm />
      </EmptyBoard>
      <NextPiece />
    </>
  );
}

export default HomePage;
