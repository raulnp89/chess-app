import { PieceType, TeamType } from "../components/ChessBoard/ChessBoard";

export default class Referee {
  isValidMove(
    px: number,
    py: number,
    x: number,
    y: number,
    type: PieceType,
    team: TeamType
  ) {
    console.log("Referee is checking the move...");
    console.log(`Previous location: ${px}, ${py}`);
    console.log(`New location: ${x}, ${y}`);
    console.log(`Piece type: ${type}`);

    if (type === PieceType.PEON) {
    }

    return false;
  }
}
