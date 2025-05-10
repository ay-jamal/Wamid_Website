import { Component } from '@angular/core';
import { NewesSidebarComponent } from './newes-sidebar/newes-sidebar.component';

@Component({
  selector: 'app-newes',
  imports: [
    NewesSidebarComponent
  ],
  templateUrl: './newes.component.html',
  styleUrl: './newes.component.scss'
})
export class NewesComponent {

}
