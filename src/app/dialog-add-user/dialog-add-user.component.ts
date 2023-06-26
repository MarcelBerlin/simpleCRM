import { Component, inject, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, addDoc  } from '@angular/fire/firestore';
import { catchError, Observable } from 'rxjs';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit { 

  user = new User();
  birthDate: Date;
  firestore: Firestore = inject(Firestore)
  items$: Observable<any[]>;

  constructor() {
    const aCollection = collection(this.firestore, 'users')
    this.items$ = collectionData(aCollection);
  }
  
  async saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user is', this.user);

    const userData = this.user.toJSON(); // Convert user object to plain JavaScript object
    
    try {
      const docRef = await addDoc(collection(this.firestore, 'users'), userData);
      console.log('Current user is', docRef.id);
    } catch (error) {
      console.error('Error adding user', error);
    }
  }

  ngOnInit(): void {
    
  }

}
