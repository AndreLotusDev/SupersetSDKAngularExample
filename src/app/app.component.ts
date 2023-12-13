import { Component, OnInit } from '@angular/core';
import { SupersetService } from './superset.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ngOnInit(): void {
    this.supersetService.embedDashboard().subscribe(() => console.log());
  }

  constructor(private supersetService: SupersetService) {
    
   }
}
