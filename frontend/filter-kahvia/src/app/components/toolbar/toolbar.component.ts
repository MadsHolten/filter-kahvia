import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MessageDialogComponent } from '../dialogs/message-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  public about = `Finland is the number one coffee drinking nation in the world and Denmark holds a proud 4th place. Coffe brings people together. It's all about networking.`;

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {

  }

  showAbout(){
      let dialogRef = this.dialog.open(MessageDialogComponent, {
        height: '300px',
        width: '500px',
        data: {title: "About", message: this.about}
      });
  }

}
