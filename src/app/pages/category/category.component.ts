import { Component, inject, input, OnInit, signal } from "@angular/core";
import { HeaderComponent } from "src/app/shared/components/header/header.component";
import { IonContent, IonIcon } from "@ionic/angular/standalone";
import { CardTaskComponent } from "src/app/shared/components/card-task/card-task.component";
import { Category } from "src/app/core/models/category.interface";
import { Router } from "@angular/router";
import { TaskTodo } from "src/app/core/models/task.interface";
import { CategoryStorageService } from "src/app/core/services/category.service";
import { CATEGORY_PASTEL_COLORS } from "src/app/core/constants/colors";
import { CategoryColorPipe } from "src/app/shared/pipes/category-color.pipe";
import { TaskStorageService } from "src/app/core/services/task.service";
import { EmptyStateComponent } from "src/app/shared/components/empty-state/empty-state.component";

@Component({
  standalone: true,
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
  imports: [
    IonIcon,
    HeaderComponent,
    IonContent,
    CardTaskComponent,
    CategoryColorPipe,
    EmptyStateComponent
  ]
})
export class CategoryPage implements OnInit {
  private readonly router = inject(Router);
  private readonly categoryStorage = inject(CategoryStorageService);
  private readonly taskStorage = inject(TaskStorageService);

  readonly categoryId = input.required<number>();
  public category = signal<Category | null>(null);
  public tasks = signal<TaskTodo[]>([]);

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const id = Number(this.categoryId());
    const category = this.categoryStorage.getCategoryById(id);

    if (!category) {
      this.router.navigate(['/home']);
      return;
    }

    this.category.set(category);
    this.tasks.set(this.taskStorage.getTasksByCategory(id));
  }

  editCategory() {
    this.router.navigate(['/edit-category', this.categoryId()]);
  }
}