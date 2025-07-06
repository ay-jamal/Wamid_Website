import { Component, inject, Inject, OnInit } from '@angular/core';
import { OurPartnersService } from '../../services/our-partners.service';

@Component({
  selector: 'app-our-partners',
  imports: [],
  templateUrl: './our-partners.component.html',
  styleUrl: './our-partners.component.scss'
})
export class OurPartnersComponent implements OnInit {

  OurPartnersService = inject(OurPartnersService)

  ngOnInit(): void {
    this.getOrgPartners()
  }

  Partners: any
  getOrgPartners() {
    this.OurPartnersService.getOrgPartners().subscribe({
      next: (res: any) => {
        console.log(res)
        this.Partners = res.map((partner: any) => {
          return {
            ...partner,
            imageSrc: `data:image/png;base64,${partner.image}` // أو image/jpeg حسب نوع الصورة
          };
        });

        console.log(this.Partners)
      }
    })
  }

}
