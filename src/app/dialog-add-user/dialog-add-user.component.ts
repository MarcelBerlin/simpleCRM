import { Component, inject, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {

  user = new User();
  birthDate: Date;
  loading = false;
  firestore: Firestore = inject(Firestore)
  items$: Observable<any[]>;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {
    const aCollection = collection(this.firestore, 'users')
    this.items$ = collectionData(aCollection);
  }

  async saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user is', this.user);
    this.loading = true;
    const userData = this.user.toJSON(); // Convert user object to plain JavaScript object

    try {
      const docRef = await addDoc(collection(this.firestore, 'users'), userData);
      this.loading = false;
      this.dialogRef.close();
      console.log('Current user is', docRef.id);
    } catch (error) {
      console.error('Error adding user', error);
    }
  }

  ngOnInit(): void {

  }

}
