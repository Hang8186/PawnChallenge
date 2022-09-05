import { Injectable } from '@angular/core';
import { Cell, Chess, Position } from '../../models/chess.model';
import { Player } from '../../models/player.model';
import { ChessService } from '../chess/chess.service';
import { GameService } from '../game/game.service';

@Injectable({
  providedIn: 'root',
})
export class PieceMoveService {
  chessVector: Map<string, Position> = new Map<string, Position>();
  constructor(private chessService: ChessService) {
    this.createVectorMove();
  }
  getEffDots(chess: Chess) {
    let dots = []
    let table = this.chessService.table
    for (let i = 0; i < 8; i++) {
      dots.push(Array(8).fill(false))
    }
    let p = chess.position
    let ruleStr = ''
    if (chess.name.toLowerCase() == 'v') {
      ruleStr = '1 up/1 down/1 left/1 right/1 up-left/1 up-right/1 down-left/1 down-right'
    }
    else if (chess.name.toLowerCase() == 'x') {
      ruleStr = '* up/* down/* left/* right'
    }
    else if (chess.name.toLowerCase() == 't') {
      ruleStr = '* upleft/* downleft/* upright/* downright'
    }
    else if (chess.name.toLowerCase() == 'h') {
      ruleStr = '* upleft/* downleft/* upright/* downright/* up/* down/* left/* right'
    }
    else if (chess.name.toLowerCase() == 'm') {
      ruleStr = '1 up-up-right/1 up-up-left/1 left-left-up/1 left-left-down/1 down-down-left/1 down-down-right/1 right-right-up/1 right-right-down'
    }
    else if (chess.name.toLowerCase() == 'c') {
      //Pawn
      let base
      chess.isPawnUp ? base = 'up' : base = 'down'
      let baseV, vLeft: Position, vRight: Position
      baseV = this.chessVector.get(base) ?? { x: 0, y: 0 }
      ruleStr = ''
      if (
        chess.firstStep &&
        !table[chess.position.y + baseV.y][chess.position.x + baseV.x].hasChess &&
        !table[chess.position.y + 2 * baseV.y][chess.position.x + 2 * baseV.x].hasChess
      ) {
        ruleStr = `1 ${base}/1 ${base}-${base}`
      }
      else if (!table[chess.position.y + baseV.y][chess.position.x + baseV.x].hasChess) {
        ruleStr = `1 ${base}`
      }
      vLeft = this.chessVector.get(base + 'left') ?? { x: 0, y: 0 }
      vRight = this.chessVector.get(base + 'right') ?? { x: 0, y: 0 }
      let pLeft: Position = { x: vLeft.x + p.x, y: vLeft.y + p.y }
      let pRight: Position = { x: vRight.x + p.x, y: vRight.y + p.y }
      if (this.onBoard(pLeft) && table[pLeft.y][pLeft.x].hasChess) {
        ruleStr += `/1 ${base}left`
      }
      if (this.onBoard(pRight) && table[pRight.y][pRight.x].hasChess) {
        ruleStr += `/1 ${base}right`
      }
      //---Pawn
    }
    let temp = ruleStr.split('/')
    for (let i = 0; i < temp.length; i++) {
      let [time, grapStr] = temp[i].split(' ')
      if (time == '1') {

        let graps = grapStr.split('-')
        let boxTemp = p
        let grapErr = false

        for (let j = 0; j < graps.length; j++) {
          let move1 = this.chessVector.get(graps[j]) ?? { x: 0, y: 0 }
          if (!this.onBoard({ x: (move1.x + boxTemp.x), y: (move1.y + boxTemp.y) })) {
            grapErr = true
            break
          }
          boxTemp = { x: (move1.x + boxTemp.x), y: (move1.y + boxTemp.y) }
        }

        if (!grapErr) {
          if (
            !table[boxTemp.y][boxTemp.x].hasChess ||
            (table[boxTemp.y][boxTemp.x].hasChess && !this.isAlly(table[boxTemp.y][boxTemp.x].chess.name, chess.name))
          ) {
            dots[boxTemp.y][boxTemp.x] = true
          }
        }
      }
      else if (time == '*') {
        let pTemp = p
        let move1 = this.chessVector.get(grapStr) ?? { x: 0, y: 0 }
        let isStop = false
        let j = 0
        while (!isStop) {
          pTemp = { x: pTemp.x + move1.x, y: pTemp.y + move1.y }
          if (this.onBoard(pTemp)) {
            if (!table[pTemp.y][pTemp.x].hasChess) {
              dots[pTemp.y][pTemp.x] = true
            }
            else {
              if (!this.isAlly(chess.name, table[pTemp.y][pTemp.x].chess.name)) {
                dots[pTemp.y][pTemp.x] = true
              }
              isStop = true
            }
          } else {
            isStop = true
          }
          j++
          if (j > 20) {
            console.log('lap vo tan')
            break
          }
        }
      }
    }
    return dots
  }

  setDotsToTable(dots: any[]) {
    for (let i = 0; i < dots.length; i++) {
      for (let j = 0; j < dots[i].length; j++) {
        if(dots[i][j] == true){
          this.chessService.table[i][j].hasDot = true
        }
      }
    }
  }

  isAlly(c1: string, c2: string) {
    let c3 = c1 + c2;
    return c3.toUpperCase() == c3 || c3.toLowerCase() == c3;
  }

  onBoard(position: Position) {
    return position.x >= 0 && position.x < 8 && position.y >= 0 && position.y < 8;
  }


  move(chess: Chess, toPosition: Position): boolean {

    let fromP = chess.position
    let table = this.chessService.table
    if (table[toPosition.y][toPosition.x].hasDot == true) {
      table[fromP.y][fromP.x].hasChess = false
      table[fromP.y][fromP.x].chess = this.chessService.newChess()

      chess.firstStep = false;
      chess.position = toPosition
      table[toPosition.y][toPosition.x].hasChess = true
      table[toPosition.y][toPosition.x].chess = chess



      return true


    } else {
      return false
    }
  }

  createVectorMove() {
    this.chessVector.set('left', { x: -1, y: 0 });
    this.chessVector.set('right', { x: 1, y: 0 });
    this.chessVector.set('up', { x: 0, y: -1 });
    this.chessVector.set('down', { x: 0, y: 1 });

    this.chessVector.set('upleft', { x: -1, y: -1 });
    this.chessVector.set('upright', { x: 1, y: -1 });
    this.chessVector.set('downleft', { x: -1, y: 1 });
    this.chessVector.set('downright', { x: 1, y: 1 });
  }
}
