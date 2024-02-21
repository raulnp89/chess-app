import { useRef, useState } from "react";
import "./ChessBoard.css";
import Tile from "./Tile/Tile";
import Referee from "../../referee/referee";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

interface Piece {
  image: string;
  x: number;
  y: number;
  type: PieceType;
  team: TeamType;
}

export enum PieceType {
  PEON,
  TORRE,
  CABALLO,
  ALFIL,
  REINA,
  REY,
}

export enum TeamType {
  OPPONENT,
  OUR,
}

const initialBoardState: Piece[] = [];

for (let p = 0; p < 2; p++) {
  const teamType = p === 0 ? TeamType.OPPONENT : TeamType.OUR;
  const type = teamType === TeamType.OPPONENT ? "N" : "B";
  const y = teamType === TeamType.OPPONENT ? 7 : 0;

  initialBoardState.push({
    image: `assets/images/torre${type}.png`,
    x: 0,
    y,
    type: PieceType.TORRE,
    team: teamType,
  });
  initialBoardState.push({
    image: `assets/images/torre${type}.png`,
    x: 7,
    y,
    type: PieceType.TORRE,
    team: teamType,
  });
  initialBoardState.push({
    image: `assets/images/caballo${type}.png`,
    x: 1,
    y,
    type: PieceType.CABALLO,
    team: teamType,
  });
  initialBoardState.push({
    image: `assets/images/caballo${type}.png`,
    x: 6,
    y,
    type: PieceType.CABALLO,
    team: teamType,
  });
  initialBoardState.push({
    image: `assets/images/alfil${type}.png`,
    x: 2,
    y,
    type: PieceType.ALFIL,
    team: teamType,
  });
  initialBoardState.push({
    image: `assets/images/alfil${type}.png`,
    x: 5,
    y,
    type: PieceType.ALFIL,
    team: teamType,
  });
  initialBoardState.push({
    image: `assets/images/reina${type}.png`,
    x: 3,
    y,
    type: PieceType.REINA,
    team: teamType,
  });
  initialBoardState.push({
    image: `assets/images/rey${type}.png`,
    x: 4,
    y,
    type: PieceType.REY,
    team: teamType,
  });

  for (let i = 0; i < 8; i++) {
    initialBoardState.push({
      image: `assets/images/peonN.png`,
      x: i,
      y: 6,
      type: PieceType.PEON,
      team: TeamType.OPPONENT,
    });
  }

  for (let i = 0; i < 8; i++) {
    initialBoardState.push({
      image: `assets/images/peonB.png`,
      x: i,
      y: 1,
      type: PieceType.PEON,
      team: TeamType.OUR,
    });
  }
}

const ChessBoard = () => {
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  const chessboardRef = useRef<HTMLDivElement>(null);
  const referee = new Referee();

  function dropPiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
      const y = Math.floor((e.clientY - chessboard.offsetTop) / 100);
      setPieces((value: Piece[]) => {
        const pieces = value.map((p) => {
          if (p.image === activePiece?.id) {
            const validMove = referee.isValidMove(
              gridX,
              gridY,
              x,
              y,
              p.type,
              p.team
            );

            if (validMove) {
              p.x = x;
              p.y = y;
            } else {
              activePiece.style.position = "relative";
              activePiece.style.removeProperty("top");
              activePiece.style.removeProperty("left");
            }
          }
          return p;
        });
        return pieces;
      });
      activePiece.style.left = `${x * 100 + chessboard.offsetLeft}px`;
      activePiece.style.top = `${y * 100 + chessboard.offsetTop}px`;
      setActivePiece(null);
    }
  }

  function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement;
    const chessboard = chessboardRef.current;
    if (element.classList.contains("chess-piece") && chessboard) {
      setGridX(Math.round((e.clientX - chessboard.offsetLeft) / 100));
      setGridY(Math.round((e.clientY - chessboard.offsetTop) / 100));
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      setActivePiece(element);
    }
  }

  function movePiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const minX = chessboard.offsetLeft - 25;
      const minY = chessboard.offsetTop - 25;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      activePiece.style.position = "absolute";

      if (x < minX) {
        activePiece.style.left = `${minX}px`;
      } else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
      } else {
        activePiece.style.left = `${x}px`;
      }

      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      } else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
      } else {
        activePiece.style.top = `${y}px`;
      }
    }
  }

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
      board.push(<Tile key={`${j}, ${i}`} image={image} number={number} />);
    }
  }

  return (
    <div
      onMouseMove={(e) => movePiece(e)}
      onMouseDown={(e) => grabPiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      id='chessboard'
      ref={chessboardRef}
    >
      {board}
    </div>
  );
};
export default ChessBoard;
