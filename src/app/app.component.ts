import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

interface ItemsResponse {
  response:ItemResponseObject;  
}

class ItemResponseObject {
  status:string;
  userTier:string;
  total:number;
  startIndex:number;
  pageSize:number;
  pages:number;
  orderby:string;
  results: Item[];
}

class Item {
  id:string;
  type:string;
  sectionId:string;
  sectionName:string;
  webPublicationDate:string;
  webTitle:string;
  webUrl:string;
  apiUrl:string;
  isHosted:boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  hasResults:boolean = false;
  results:Item[]; 

  constructor(private http: HttpClient){

  }
  ngOnInit(){
    this.http.get<ItemsResponse>('https://content.guardianapis.com/search')
    .subscribe(data => {
      this.hasResults = true;
      this.results = data.response.results;
    })
  }
}
