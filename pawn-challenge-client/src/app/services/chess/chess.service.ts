import { Injectable } from '@angular/core';
import { Cell, Chess, Position } from 'src/app/models/chess.model';
import { Player } from 'src/app/models/player.model';
import { PlayerService } from '../player/player.service';

@Injectable({
  providedIn: 'root',
})
export class ChessService {
  kingB!: Chess
  kingW!: Chess
  chessAccess: Map<string, Chess> = new Map<string, Chess>();
  table: Cell[][]


  constructor(private playerService: PlayerService) {
    this.createChessAccess();
    this.table = this.createBoard()
    // let strBoard = 'xmthvtmx|cccccccc|        |        |        |        |CCCCCCCC|XMTHVTMX'
    let strBoard = 'xmthvtmx|cccccccc|        |        |        |        |CCCCCCCC|XMTHVTMX'
    // let strBoard = 'v       |        |        |        |        |        |CCCCCCCC|XMTHVTMX'
    this.table = this.setChessToBoard(strBoard, this.table, this.playerService.player1)
  }

  createBoard() {
    let result: Cell[][] = [];
    for (let i = 0; i < 8; i++) {
      let temp = [];
      for (let j = 0; j < 8; j++) {
        let newCell: Cell = {
          id: '',
          position: { x: j, y: i },
          hasChess: false,
          chess: {
            id: '',
            name: '',
            img: '',
            icon: '',
            firstStep: true,
            position: { x: 0, y: 0 },
            isPawnUp: false,
          },
          hasDot: false,
        };
        temp.push(newCell);
      }
      result.push(temp);
    }
    // this.printBoard(result);
    return result;
  }
  printBoard(board: Cell[][]) {
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += ' --- --- --- --- --- --- --- --- \n| '
      for (let j = 0; j < 8; j++) {
        if (board[i][j].chess.name == '') {
          result += '  | ';
        }
        else {
          result += board[i][j].chess.name + ' | ';
        }
      }
      result += '\n';
    }
    result += ' --- --- --- --- --- --- --- --- \n'
    console.log(result);
  }
  //xmthvtmx|cccccccc|        |        |        |        |CCCCCCCC|XMTHVTMX
  setChessToBoard(txtTable: string, chessTable: Cell[][], player: Player): Cell[][] {
    let res = [...chessTable]
    try {
      let rows = txtTable.split('|')
      for (let i = 0; i < 8; i++) {
        let chessTxtS = rows[i].split('')
        for (let j = 0; j < 8; j++) {
          if (chessTxtS[j] != ' ') {
            let temp = this.chessAccess.get(chessTxtS[j])
            if (temp != undefined) {

              if (temp.name.toLocaleLowerCase() == 'c') {
                if (this.isAlly(temp.name, player.chessControl.chessID)) {
                  temp.isPawnUp = player.isBase
                }
              }

              let id = res[i][j].chess.id
              res[i][j].chess = { ...temp }
              if (id == '') {
                res[i][j].chess.id = temp.name + i + j
              }
              res[i][j].hasChess = true
              res[i][j].chess.position = res[i][j].position

              if (temp.name == 'v') {
                this.kingB = res[i][j].chess
              }
              else if (temp.name == 'V') {
                this.kingW = res[i][j].chess
              }
            }
          }

          if (res[i][j].id == '') {
            res[i][j].id = `[${res[i][j].position.x},${res[i][j].position.y}]`
          }
        }

      }
    } catch (error) {
      console.log(error)
    }
    return res
  }
  setChessToBoard1(stringBoard: string, board: Cell[][]) {
    let temp = stringBoard.split('|');
    for (let i = 0; i < 8; i++) {
      let chessName = temp[i].split('');
      for (let j = 0; j < 8; j++) {
        if (chessName[j] !== ' ') {
          board[i][j].hasChess = true;
        }
        board[i][j].chess.id = `${chessName[j]}[${i},${j}]`;
        board[i][j].chess.name = chessName[j];
        let chess = this.chessAccess.get(chessName[j]) ?? {
          id: '',
          name: '',
          img: '',
          icon: '',
        };
        board[i][j].chess.img = chess.img;
        board[i][j].chess.position = { x: j, y: i };
      }

    }
    //console.log(board);
  }
  newChess() {
    let chess: Chess = {
      id: '',
      name: '',
      img: '',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    };
    return chess;
  }
  onBoard(position: Position) {
    return (
      position.x >= 0 && position.x < 8 && position.y >= 0 && position.y < 8
    );
  }
  isAlly(c1: string, c2: string) {
    let c3 = c1 + c2;
    return c3.toUpperCase() == c3 || c3.toLowerCase() == c3;
  }
  clearDot(){
    for(let i=0;i<this.table.length;i++){
      for(let j=0;j<this.table[i].length;j++){
        this.table[i][j].hasDot = false
      }
    }
  }
  createChessAccess() {
    //black
    this.chessAccess.set('x', {
      id: '',
      name: 'x',
      img: 'br.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    });
    this.chessAccess.set('h', {
      id: '',
      name: 'h',
      img: 'bq.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    });
    this.chessAccess.set('t', {
      id: '',
      name: 't',
      img: 'bb.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    });
    this.chessAccess.set('v', {
      id: '',
      name: 'v',
      img: 'bk.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    });
    this.chessAccess.set('m', {
      id: '',
      name: 'm',
      img: 'bn.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    });
    this.chessAccess.set('c', {
      id: '',
      name: 'c',
      img: 'bp.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    });
    //this.chessAccess.set('.', {id: '', name: '.', img: 'green.png', icon: '', position: {x: 0, y: 0}});
    //white
    this.chessAccess.set('X', {
      id: '',
      name: 'X',
      img: 'wr.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    });
    this.chessAccess.set('H', {
      id: '',
      name: 'H',
      img: 'wq.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    });
    this.chessAccess.set('T', {
      id: '',
      name: 'T',
      img: 'wb.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    });
    this.chessAccess.set('V', {
      id: '',
      name: 'V',
      img: 'wk.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    });
    this.chessAccess.set('M', {
      id: '',
      name: 'M',
      img: 'wn.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    });
    this.chessAccess.set('C', {
      id: '',
      name: 'C',
      img: 'wp.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    });
  }
}
