import NextPiece from "../../components/NextPiece/NextPiece.jsx";
import EmptyBoard from "../../components/EmptyBoard/EmptyBoard.jsx";
import JoinGameForm from "../../components/JoinGameForm/JoinGameForm.jsx";

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
