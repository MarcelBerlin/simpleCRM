import { Component, OnInit } from '@angular/core';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],

})

export class UserComponent implements OnInit {

  user = new User();
  items$: Observable<any[]>; 
  allUsers = [];

  constructor(public dialog: MatDialog, private firestore: Firestore) { }

  ngOnInit(): void {
    const aCollection = collection(this.firestore, 'users');
    this.items$ = collectionData(aCollection);

    this.items$.subscribe(data => {
      this.allUsers = data;
      console.log('Received data:', data);
    });

  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent)
  }

}
