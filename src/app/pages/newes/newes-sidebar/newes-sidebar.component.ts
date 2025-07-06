import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NewesService } from '../../../services/newes.service';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-newes-sidebar',
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './newes-sidebar.component.html',
  styleUrl: './newes-sidebar.component.scss'
})
export class NewesSidebarComponent implements OnInit {

  NewesService = inject(NewesService)
  destroyRef = inject(DestroyRef)
  sanitizer = inject(DomSanitizer)

  ngOnInit(): void {
    this.getLatestNewes();
    this.getNewesCategory()
  }

  LastNewes: any = []
  getLatestNewes() {
    this.NewesService.getLatestNewes().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        console.log(res)
        this.LastNewes = res
      }
    })
  }

  NewesCategories: any = []
  getNewesCategory() {
    this.NewesService.getNewesCategory().subscribe({
      next: (res) => {
        this.NewesCategories = res
      }
    })
  }

  searchText = '';
  onSearch() {
    this.NewesService.setTitle(this.searchText);
  }

  selectedCategoryId: number | null = null;

  onSelectCategory(category: any) {
    if (this.selectedCategoryId === category.id) {
      // Unselect if already active
      this.selectedCategoryId = null;
      this.NewesService.setCategoryId(null); // Remove filter
    } else {
      this.selectedCategoryId = category.id;
      this.NewesService.setCategoryId(category.id);
    }
  }



}
