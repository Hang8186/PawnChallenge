import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-draw',
  templateUrl: './dialog-draw.component.html',
  styleUrls: ['./dialog-draw.component.scss']
})
export class DialogDrawComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogDrawComponent>) { }

  ngOnInit(): void {
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
