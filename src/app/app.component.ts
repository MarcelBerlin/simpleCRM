import { Component, inject, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'simpleCRM';
  firestore: Firestore = inject(Firestore)
  items$: Observable<any[]>;


  constructor() {    
    const aCollection = collection(this.firestore, 'items')
    this.items$ = collectionData(aCollection);
  }

  ngOnInit() {
   
  }
}
