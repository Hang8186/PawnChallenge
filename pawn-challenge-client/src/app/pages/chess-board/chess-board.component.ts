import { Timer } from './../../models/timer';
import { Cell, Chess, Position } from './../../models/chess.model';
import { Component, OnInit } from '@angular/core';
import { ChessService } from 'src/app/services/chess/chess.service';
import { GameService } from 'src/app/services/game/game.service';
import { Player } from 'src/app/models/player.model';
import { HistoryMoveService } from 'src/app/services/history/history-move.service';
import { Grap } from 'src/app/models/grap.model';
import { ShareService } from 'src/app/services/share/share.service';
import { ChessSkinService } from 'src/app/services/chess-skin/chess-skin.service';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.scss'],
  providers: [

  ]
})
export class ChessBoardComponent implements OnInit {
  chess!: Chess;
  turn1: Position = { x: -1, y: -1 };
  turn2: Position = { x: -1, y: -1 };
  table: Cell[][] = this.chessService.table
  grap: Grap;

  constructor(
    public chessService: ChessService,
    public playerService: GameService,
    public gameService: GameService,
    private shareService: ShareService,
    public skinChess: ChessSkinService,
    private historyMoveService: HistoryMoveService
  ) {
    this.grap = this.historyMoveService.newGrap();
  }

  allowDrop(ev: any) {
    ev.preventDefault();
  }

  drag(ev: any, chess: Chess) {
    ev.dataTransfer.setData('text', ev.target.id);
  }

  //Thả 1 con cờ
  drop(ev: any, toPostion: Position) {
    ev.preventDefault();
    let fromP = this.chess.position;
    let ismove = this.chessService.move(this.chess, toPostion, this.table);
    // di chuyển
    if (ismove) {
      this.getCurrentUser().chessControl.isCheckmat = false
      this.gameService.changeCurrentPlayer(this.playerService.player1, this.playerService.player2);

      // lưu nước đi
      this.addGrap(toPostion)

      // lưu màu nước đi
      this.backgroundTurn(fromP, toPostion);

      // di chuyển lỗi
    }

    //xoá dots gợi ý
    this.chessService.clearDot();

    //kiểm tra chiếu vua
    let isCheckmat = this.chessService.isCheckmatAll(this.chess, this.table)
    if (isCheckmat) {
      this.getCurrentUser().chessControl.isCheckmat = true
    }
  }

  dragend(ev: any) {
    if (ev.which != 1) {
      return;
    }
  }

  //Cầm 1 con cờ
  mousedownImg(chess: Chess, ev: any) {
    this.chessService.clearDot();
    if (ev.which != 1) {
      return;
    }
    this.chess = chess;
    if (
      this.gameService.canPickChess(this.getCurrentUser().chessControl.chessNameCT, chess.name)
    ) {
      this.grap = this.historyMoveService.newGrap();
      this.chess = chess;
      let dots = this.chessService.getEffDots(chess, this.table)
      this.chessService.setDotsToTable(dots, this.table);
      let dotsban = this.chessService.getDotban(chess, this.table, dots)
      this.chessService.setDotsbanToTable(dotsban, this.table)


      this.historyMoveService.createGrapPosition();
      this.grap.grapFrom = this.historyMoveService.toFormatPosition(chess.position);
    }
  }

  isCheckmat(nameChess:string) {
    let user = this.getCurrentUser()
    if(user.chessControl.isCheckmat && this.chessService.isAlly(user.chessControl.chessNameCT, nameChess)){
      return true
    }
    return false
  }

  getCurrentUser(){
    return this.playerService.getCurrentUser()
  }

  startGame() {
    this.gameService.startGame(
      this.playerService.player1,
      this.playerService.player2
    );
  }

  backgroundTurn(fromP: Position, toP: Position) {
    this.turn1 = fromP;
    this.turn2 = toP;
    // console.log({ 1: this.turn1 });
    // console.log({ 2: this.turn1 });
  }

  addGrap(toPostion: Position) {
    this.grap.grapTo = this.historyMoveService.toFormatPosition(toPostion);
    this.grap.nameChess = this.chess.name;
    this.grap.uid = this.getCurrentUser().id;
    this.grap.id = Date.now().toString();
    this.historyMoveService.addGrap(this.grap);
  }

  ngOnInit(): void {
    this.gameService.time.isTimeOut.subscribe((isTimeOut) => {
      if (isTimeOut == true) {
        console.log('hetgio')
      }
    });
  }
}
