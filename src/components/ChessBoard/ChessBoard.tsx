import "./ChessBoard.css";
import Tile from "./Tile/Tile";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

interface Piece {
  image: string;
  x: number;
  y: number;
}

const pieces: Piece[] = [];
for (let i = 0; i < 8; i++) {
  pieces.push({ image: "assets/images/peonN.png", x: i, y: 6 });
}
for (let i = 0; i < 8; i++) {
  pieces.push({ image: "assets/images/peonB.png", x: i, y: 1 });
}

pieces.push({ image: "assets/images/torreN.png", x: 0, y: 7 });
pieces.push({ image: "assets/images/torreN.png", x: 7, y: 7 });
pieces.push({ image: "assets/images/torreB.png", x: 0, y: 0 });
pieces.push({ image: "assets/images/torreB.png", x: 7, y: 0 });
pieces.push({ image: "assets/images/caballoN.png", x: 1, y: 7 });
pieces.push({ image: "assets/images/caballoN.png", x: 6, y: 7 });
pieces.push({ image: "assets/images/caballoB.png", x: 1, y: 0 });
pieces.push({ image: "assets/images/caballoB.png", x: 6, y: 0 });
pieces.push({ image: "assets/images/alfilN.png", x: 2, y: 7 });
pieces.push({ image: "assets/images/alfilN.png", x: 5, y: 7 });
pieces.push({ image: "assets/images/alfilB.png", x: 2, y: 0 });
pieces.push({ image: "assets/images/alfilB.png", x: 5, y: 0 });
pieces.push({ image: "assets/images/reinaN.png", x: 3, y: 7 });
pieces.push({ image: "assets/images/reyN.png", x: 4, y: 7 });
pieces.push({ image: "assets/images/reinaB.png", x: 3, y: 0 });
pieces.push({ image: "assets/images/reyB.png", x: 4, y: 0 });

export default function ChessBoard() {
  let board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const number = j + i + 2;
      let image = undefined;

      pieces.forEach((piece) => {
        if (piece.x === i && piece.y === j) {
          image = piece.image;
        }
      });
      board.push(<Tile image={image} number={number} />);
    }
  }

  return <div id='chessboard'>{board}</div>;
}
