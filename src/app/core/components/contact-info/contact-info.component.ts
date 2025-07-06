import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ContactInfoService } from '../../../services/contact-info.service';

@Component({
  selector: 'app-contact-info',
  imports: [],
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.scss'
})
export class ContactInfoComponent implements OnInit {

  ContactInfoService = inject(ContactInfoService)

  @Input() ContactInfo: any

  ngOnInit(): void {
  }

}
