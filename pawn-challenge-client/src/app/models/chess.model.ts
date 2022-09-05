export interface Cell {
  id: string;
  position: Position;
  hasChess: boolean;
  chess: Chess;
  hasDot: boolean;
  hasDotban: boolean
}

export interface Chess {
  isPawnUp: boolean
  id: string;
  name: string;
  img: string;
  icon: string;
  firstStep: boolean;
  position: Position;
}

export interface Position {
  x: number;
  y: number;
}


