import { Component, inject, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit  {
  userID: string;
  user: User = new User();
  birthDate: Date;
  loading = false;
  firestore: Firestore = inject(Firestore)
  items$: Observable<any[]>;

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) {
    const aCollection = collection(this.firestore, 'users')
    this.items$ = collectionData(aCollection);
  }

  async updateUser() { 
    this.loading = true;
    const userData = this.user.toJSON(); // Convert user object to plain JavaScript object

    try {
      const userDocRef = doc(this.firestore, 'users', this.userID);
      await updateDoc(userDocRef, userData);
      this.loading = false;
      this.dialogRef.close();
      console.log('User updated successfully');
    } catch (error) {
      console.error('Error updating user', error);
    }
  }

  ngOnInit(): void {
    
  }

  
}
