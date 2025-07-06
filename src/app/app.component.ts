import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactInfoComponent } from './core/components/contact-info/contact-info.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { slideInAnimation } from './route-animations';
import { ContactInfoService } from './services/contact-info.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ContactInfoComponent,
    HeaderComponent,
    FooterComponent,
  ],
  // animations: [slideInAnimation],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Wamid_Website';

  ContactInfoService = inject(ContactInfoService)

  ContactInfo: any

  ngOnInit(): void {
    this.ContactInfoService.getContactInfo().subscribe({
      next: (res) => {
        this.ContactInfo = res
      }
    })

  }

  // prepareRoute(outlet: RouterOutlet) {
  //   return outlet?.isActivated
  //     ? outlet.activatedRouteData?.['animation'] || outlet.activatedRoute?.routeConfig?.path
  //     : '';
  // }


}


