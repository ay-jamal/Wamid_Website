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
  // Add properties to hold animated values
  animatedStats = {
    dialogueSessionsCount: 0,
    workshopsCount: 0,
    trainersCount: 0,
    traineesCount: 0,
    fieldVisitsCount: 0
  };

  getOrgProfile() {
    this.HomeService.getOrgProfile().subscribe({
      next: (res: any) => {
        this.orgProfile = res
        this.organizationGoalsList = res.organizationGoals
          ? res.organizationGoals.split('\n').filter((goal: any) => goal.trim() !== '')
          : [];

        // Animate on scroll for sections
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

        // Immediately trigger animation for elements already in view
        setTimeout(() => {
          elements.forEach((el: Element) => {
            const rect = (el as HTMLElement).getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              el.classList.add('animate');
              observer.unobserve(el);
            }
          });
        }, 0);

        // Count-up animation for statistics
        const statsSection = this.el.nativeElement.querySelector('.statistics-sectin');
        if (statsSection) {
          const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                this.startCountUp();
                observer.unobserve(entry.target);
              }
            });
          }, { threshold: 0.3 });
          statsObserver.observe(statsSection);

          // Immediately trigger count-up if already in view
          setTimeout(() => {
            const rect = (statsSection as HTMLElement).getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              this.startCountUp();
              statsObserver.unobserve(statsSection);
            }
          }, 0);
        }
      }
    })
  }

  startCountUp() {
    const duration = 1200; // ms
    const frameRate = 30; // ms
    const steps = Math.ceil(duration / frameRate);
    const stats = [
      { key: 'dialogueSessionsCount', target: this.orgProfile?.dialogueSessionsCount || 0 },
      { key: 'workshopsCount', target: this.orgProfile?.workshopsCount || 0 },
      { key: 'trainersCount', target: this.orgProfile?.trainersCount || 0 },
      { key: 'traineesCount', target: this.orgProfile?.traineesCount || 0 },
      { key: 'fieldVisitsCount', target: this.orgProfile?.fieldVisitsCount || 0 }
    ];
    stats.forEach(stat => {
      let current = 0;
      const increment = stat.target / steps;
      const key = stat.key as keyof typeof this.animatedStats;
      const interval = setInterval(() => {
        current += increment;
        if (current >= stat.target) {
          this.animatedStats[key] = stat.target;
          clearInterval(interval);
        } else {
          this.animatedStats[key] = Math.floor(current);
        }
      }, frameRate);
    });
  }

  constructor(private el: ElementRef) { }





}
