import { Component, inject, OnInit } from '@angular/core';
import { JobSeekerRegistrationService } from '../../../services/job-seeker-registration.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-seeker-registration',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './job-seeker-registration.component.html',
  styleUrl: './job-seeker-registration.component.scss'
})
export class JobSeekerRegistrationComponent implements OnInit {

  JobSeekerRegistrationService = inject(JobSeekerRegistrationService)
  toastr = inject(ToastrService)

  RegistrationForm: FormGroup = new FormGroup({
    FullName: new FormControl('', [Validators.required]),
    PhoneNumber: new FormControl('', [Validators.required]),
    Email: new FormControl(''),
  });


  ngOnInit(): void {
  }

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

  submit() {
    let formData = new FormData();
    formData.append("FullName", this.RegistrationForm.value.FullName)
    formData.append("PhoneNumber", this.RegistrationForm.value.PhoneNumber)
    formData.append("Email", this.RegistrationForm.value.Email)
    formData.append("ResumeFile", this.seletedFile)
    this.JobSeekerRegistrationService.RegisterJobSeeker(formData).subscribe({
      next: () => {
        this.toastr.success("تمت العملية", "تم عميلة تسجيلك بنجاح");
        this.RegistrationForm.reset()
      }
    })
  }


}
