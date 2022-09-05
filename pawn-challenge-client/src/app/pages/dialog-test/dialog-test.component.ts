import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogDrawComponent } from 'src/app/components/dialog-draw/dialog-draw.component';
import { DialogLoseComponent } from 'src/app/components/dialog-lose/dialog-lose.component';
import { DialogWinComponent } from 'src/app/components/dialog-win/dialog-win.component';
import { DialogComponent } from 'src/app/components/dialogGamemode/dialog.component';
import { DialogSkinComponent } from 'src/app/components/dialogSkin/dialog-skin/dialog-skin.component';

@Component({
  selector: 'app-dialog-test',
  templateUrl: './dialog-test.component.html',
  styleUrls: ['./dialog-test.component.scss']
})
export class DialogTestComponent implements OnInit {
  constructor(public dialog: MatDialog) {
    this.openDialogSkin();
   }
  openDialogGamemode() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  openDialogSkin() {
    const dialogRef = this.dialog.open(DialogSkinComponent, {
      width: 'auto',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogWin() {
    const dialogRef = this.dialog.open(DialogWinComponent, {
      panelClass: 'dialogWin', 
      width: '42em',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogLose() {
    const dialogRef = this.dialog.open(DialogLoseComponent, {
      panelClass: 'dialogLose',
      width: '42em',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogDraw() {
    const dialogRef = this.dialog.open(DialogDrawComponent, {
      panelClass: 'dialogDraw',
      width: '42em',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
  }

}
