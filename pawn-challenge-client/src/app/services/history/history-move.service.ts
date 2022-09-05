import { Injectable } from '@angular/core';
import { Position } from 'src/app/models/chess.model';
import { Grap } from 'src/app/models/grap.model';
import { GameService } from '../game/game.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryMoveService {
  grapPositionX : Map<number,string> = new Map();
  grapPositionY : Map<number,string> = new Map();
  graps:Grap[] = [];

  grapsHalf:Grap[] = [];

  constructor(private gameSerivce:GameService) {
   }
  createGrapPosition(){
    //x
    this.grapPositionX.set(0,'a')
    this.grapPositionX.set(1,'b')
    this.grapPositionX.set(2,'c')
    this.grapPositionX.set(3,'d')
    this.grapPositionX.set(4,'e')
    this.grapPositionX.set(5,'f')
    this.grapPositionX.set(6,'g')
    this.grapPositionX.set(7,'h')
    //y
    this.grapPositionY.set(0,'8')
    this.grapPositionY.set(1,'7')
    this.grapPositionY.set(2,'6')
    this.grapPositionY.set(3,'5')
    this.grapPositionY.set(4,'4')
    this.grapPositionY.set(5,'3')
    this.grapPositionY.set(6,'2')
    this.grapPositionY.set(7,'1')
  }
  addGrap(grap : Grap){
    this.graps.push(grap);
    if(grap.uid == this.gameSerivce.player1.id){
       this.grapsHalf.push(grap);
    }
  }
  newGrap (){
    let grap : Grap = {
      id: '',
      grapFrom: '',
      grapTo: '',
      nameChess: '',
      uid: '',
      icon: ''
    }
    return grap;
  }
  toFormatPosition(position : Position):string{
    let x = this.grapPositionX.get(position.x);
    let y = this.grapPositionY.get(position.y);
    if(x != undefined && y != undefined){
      return (x+y).toUpperCase();
    }
    return '';
  }
}
