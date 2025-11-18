import { Component, inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IonIcon, IonContent, IonButton } from "@ionic/angular/standalone";
import { CardTaskComponent } from "src/app/shared/components/card-task/card-task.component";
import { HeaderComponent } from "src/app/shared/components/header/header.component";
import { SwiperOptions } from "swiper/types";
import { Category } from "src/app/core/models/category.interface";
import { CategoryCarouselComponent } from "src/app/shared/components/category-carousel/category-carousel.component";
import { EmptyStateComponent } from "src/app/shared/components/empty-state/empty-state.component";
import { CategoryStoreService } from "src/app/core/services/category-store.service";
import { TaskStoreService } from "src/app/core/services/task-store.service";

@Component({
  standalone: true,
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  imports: [
    IonIcon,
    IonContent,
    HeaderComponent,
    CardTaskComponent,
    IonButton,
    CategoryCarouselComponent,
    EmptyStateComponent
  ],
})
export class HomePage {
  private readonly router = inject(Router);
  private readonly categoryStore = inject(CategoryStoreService);
  private readonly taskStore = inject(TaskStoreService);

  readonly categories = this.categoryStore.categories;
  readonly tasks = this.taskStore.pendingTasks;

  readonly swiperConfig: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 0,
  };

  handleCategory(category: Category) {
    this.router.navigate(['/category', category.id]);
  }

  navigateToCreateTask() {
    this.router.navigate(['/create-task']);
  }

  navigateToCreateCategory() {
    this.router.navigate(['/create-category']);
  }

  pendingTasksCount(): number {
    return this.tasks.length;
  }
}