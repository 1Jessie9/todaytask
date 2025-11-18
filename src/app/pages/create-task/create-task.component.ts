import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, input, signal } from "@angular/core";
import { HeaderComponent } from "src/app/shared/components/header/header.component"
import { IonInput, IonSelect, IonSelectOption, IonButton, IonContent } from "@ionic/angular/standalone";
import { CategoryStorageService } from "src/app/core/services/category.service";
import { Router } from "@angular/router";
import { Category } from "src/app/core/models/category.interface";
import { Priority } from "src/app/core/models/priority.interface";
import { TaskStorageService } from "src/app/core/services/task.service";
import { TaskTodo } from "src/app/core/models/task.interface";
import { CategoryCarouselComponent } from "src/app/shared/components/category-carousel/category-carousel.component";
import { TaskStoreService } from "src/app/core/services/task-store.service";
import { CategoryStoreService } from "src/app/core/services/category-store.service";

@Component({
  standalone: true,
  selector: "app-create-task",
  templateUrl: "./create-task.component.html",
  styleUrls: ["./create-task.component.scss"],
  imports: [
    IonContent,
    IonInput,
    HeaderComponent,
    IonSelect,
    IonSelectOption,
    IonButton,
    CategoryCarouselComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CreateTaskPage {
  readonly taskId = input<number | null>();

  private readonly categoryStore = inject(CategoryStoreService);
  private readonly taskStore = inject(TaskStoreService);
  private readonly router = inject(Router);
  public readonly isEditMode = computed(() => this.taskId() !== null);
  public categories = this.categoryStore.categories;
  public selectedCategoryId = signal<number | null>(null);
  public title = signal<string>('');
  public priority = signal<Priority | null>(null);
  private currentTask: TaskTodo | null = null;

  public readonly isFormValid = computed(() =>
    !!this.title().trim() &&
    !!this.priority() &&
    this.selectedCategoryId() !== null
  );


  ngOnInit() {
    if (this.taskId()) {
      const id = Number(this.taskId());
      const task = this.taskStore.getTaskById(id);
      if (task) {
        this.currentTask = task;
        this.title.set(task.title);
        this.priority.set(task.priority);
        this.selectedCategoryId.set(task.category.id);
      }
    } else {
      this.selectedCategoryId.set(this.categories()[0].id);
    }
  }

  inputTitle(ev: any) {
    this.title.set(ev.target?.value ?? '');
  }

  changePriority(ev: CustomEvent) {
    this.priority.set(ev.detail.value as Priority);
  }

  handleCategory(category: Category) {
    this.selectedCategoryId.set(category.id);
  }

  async saveTask() {
    if (!this.isFormValid()) return;
    const category = this.categories().find(c => c.id === this.selectedCategoryId()) as Category;

    if (this.taskId() && this.currentTask) {
      this.taskStore.updateTask({
        id: this.currentTask.id,
        title: this.title().trim(),
        priority: this.priority() as Priority,
        completed: this.currentTask.completed,
        category,
      });
    } else {
      this.taskStore.createTask({
        title: this.title().trim(),
        priority: this.priority() as Priority,
        category,
      });
    }

    this.router.navigate(['/home']);
  }
}