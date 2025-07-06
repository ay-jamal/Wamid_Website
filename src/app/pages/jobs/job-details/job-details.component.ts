import { Component, inject } from '@angular/core';
import { JobsService } from '../../../services/jobs.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-job-details',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss'
})
export class JobDetailsComponent {

  JobsService = inject(JobsService)
  toastr = inject(ToastrService)

  JobId: any
  constructor(
    private ActivatedRoute: ActivatedRoute
  ) {
    this.ActivatedRoute.params.subscribe({
      next: (res: any) => {
        if (res) {
          this.JobId = res.id
          this.getJobById(res.id)
        }
      }
    })
  }

  JobDetails: any
  getJobById(id: number) {
    this.JobsService.getJobById(id).subscribe({
      next: (res) => {
        this.JobDetails = res
      }
    })
  }

  JobApplicationForm: FormGroup = new FormGroup({
    FullName: new FormControl("", [Validators.required]),
    Email: new FormControl("", [Validators.required]),
    PhoneNumber: new FormControl("", [Validators.required]),
  })

  seletedFile: any;
  url: string | ArrayBuffer | null = "";

  handleFileInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.files && target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(target.files[0]); // read file as data url
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target && event.target.result) {
          this.url = event.target.result;
        }
      };
      this.seletedFile = target.files[0];
    }
  }

  get responsibilitiesList(): string[] {
    return this.JobDetails?.responsibilitiesText?.split('\n').filter((x: any) => x.trim()) || [];
  }
  get qualificationsList(): string[] {
    return this.JobDetails?.qualificationsText?.split('\n').filter((x: any) => x.trim()) || [];
  }
  get benefitsList(): string[] {
    return this.JobDetails?.benefitsText?.split('\n').filter((x: any) => x.trim()) || [];
  }

  submit() {
    let formData = new FormData();
    formData.append("JobId", this.JobId)
    formData.append("FullName", this.JobApplicationForm.value.FullName)
    formData.append("PhoneNumber", this.JobApplicationForm.value.PhoneNumber)
    formData.append("Email", this.JobApplicationForm.value.Email)
    formData.append("Resume", this.seletedFile)
    this.JobsService.addJobApplication(formData).subscribe({
      next: (res) => {
        this.toastr.success("تمت العملية", "تم التقديم على الوظيفه بنجاح");
        this.JobApplicationForm.reset()
      }
    })
  }

}
