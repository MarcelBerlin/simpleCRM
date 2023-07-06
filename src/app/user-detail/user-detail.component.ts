import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],

})
export class UserDetailComponent implements OnInit {

  userID = '';
  user: User = new User();
  items$: Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    public dialog: MatDialog) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userID = paramMap.get('id');
      this.getUser();
    })
  }

  async getUser() {
    const userDocRef = doc(this.firestore, 'users', this.userID);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      this.user = new User(userDocSnap.data());
      console.log('User:', this.user);
    } else {
      console.log('User not found');
    }
  }


  editAddressMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userID = this.userID;
    // die Methode "new User(this.user.toJSON())" sorgt dafür, dass wir eine Kopie von unserem Nutzer erstellen und die Daten nicht auch dann gespeichert werden sobald wir das Dialog Fenster abbrechen!

  }

  editUserMenu() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userID = this.userID;
    // die Methode "new User(this.user.toJSON())" sorgt dafür, dass wir eine Kopie von unserem Nutzer erstellen und die Daten nicht auch dann gespeichert werden sobald wir das Dialog Fenster abbrechen!

  }
}
