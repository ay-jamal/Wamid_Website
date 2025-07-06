import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { JobsService } from '../../../services/jobs.service';

@Component({
  selector: 'app-job-list',
  imports: [
    RouterLink
  ],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss'
})
export class JobListComponent implements OnInit {


  ngOnInit(): void {
    this.getJobs()
  }

  JobsService = inject(JobsService)
  router = inject(Router)

  Jobs: any = []
  getJobs() {
    this.JobsService.getJobs().subscribe({
      next: (res: any) => {
        this.Jobs = res
      }
    })
  }

  openJobDetalis(job: any) {
    this.router.navigate([`/jobs/${job.id}`])
  }

}
