import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-jobs',
  imports: [
    RouterOutlet
  ],
  template: `<router-outlet />`
})
export class JobsComponent {

}
