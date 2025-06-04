import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactInfoComponent } from './core/components/contact-info/contact-info.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { slideInAnimation } from './route-animations';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ContactInfoComponent,
    HeaderComponent,
    FooterComponent,

  ],
  animations: [slideInAnimation],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Wamid_Website';

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }

}
