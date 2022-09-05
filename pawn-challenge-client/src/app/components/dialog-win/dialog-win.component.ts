import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-win',
  templateUrl: './dialog-win.component.html',
  styleUrls: ['./dialog-win.component.scss']
})
export class DialogWinComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogWinComponent>) { }

  ngOnInit(): void {
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
