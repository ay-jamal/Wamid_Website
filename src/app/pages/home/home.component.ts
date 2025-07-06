import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit } from '@angular/core';
import AOS from 'aos';
import { HomeService } from '../../services/home.service';
import { NgwWowService } from 'ngx-wow';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  HomeService = inject(HomeService)

  ngOnInit(): void {
    this.getOrgProfile()
  }

  organizationGoalsList: any

  orgProfile: any
  getOrgProfile() {
    this.HomeService.getOrgProfile().subscribe({
      next: (res: any) => {
        this.orgProfile = res
        this.organizationGoalsList = res.organizationGoals
          ? res.organizationGoals.split('\n').filter((goal: any) => goal.trim() !== '')
          : [];


        const elements = this.el.nativeElement.querySelectorAll('.animate-on-scroll');
        const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate');
              observer.unobserve(entry.target);
            }
          });
        }, {
          threshold: 0.1
        });
        elements.forEach((el: Element) => observer.observe(el));
      }
    })
  }

  constructor(private el: ElementRef) { }





}
