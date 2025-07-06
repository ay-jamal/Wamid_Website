import { Component, DestroyRef, effect, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NewesService } from '../../../services/newes.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-newes-list',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './newes-list.component.html',
  styleUrl: './newes-list.component.scss'
})
export class NewesListComponent implements OnInit {

  NewesService = inject(NewesService)
  destroyRef = inject(DestroyRef)

  filterObject: any = {
    title: null,
    categoryId: null
  }

  constructor() {
    effect(() => {
      const filter = this.NewesService.filter();
      this.filterObject = { ...filter };
      this.getNewes();
    });
  }

  ngOnInit(): void {
  }


  NewesList: any = []
  getNewes() {
    this.NewesService.getNewes(this.filterObject).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        console.log(res)
        this.NewesList = res
      }
    })
  }

}
