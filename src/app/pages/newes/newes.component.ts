import { Component } from '@angular/core';
import { NewesSidebarComponent } from './newes-sidebar/newes-sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-newes',
  imports: [
    NewesSidebarComponent,
    RouterOutlet
  ],
  templateUrl: './newes.component.html',
  styleUrl: './newes.component.scss'
})
export class NewesComponent {

}
