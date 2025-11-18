import { Component, computed, inject, input, OnInit, signal } from "@angular/core";
import { HeaderComponent } from "src/app/shared/components/header/header.component";
import { IonContent, IonInput, IonButton, IonLabel, IonIcon } from "@ionic/angular/standalone";
import { Router } from "@angular/router";
import { CategoryStorageService } from "src/app/core/services/category.service";
import { CATEGORY_ICONS } from "src/app/core/constants/icons";
import { Colors } from "src/app/core/constants/colors";
import { CategoryStoreService } from "src/app/core/services/category-store.service";

@Component({
  standalone: true,
  selector: "app-create-category",
  templateUrl: "./create-category.component.html",
  styleUrls: ["./create-category.component.scss"],
  imports: [
    IonIcon,
    IonLabel,
    HeaderComponent,
    IonContent,
    IonInput,
    IonButton,
  ],
})
export class CreateCategoryPage implements OnInit {
  readonly categoryId = input<number | null>();

  private readonly router = inject(Router);
  private readonly categoryStore = inject(CategoryStoreService);

  public colors = Colors;
  public selectedColor = signal<string | null>(null);
  public icons = CATEGORY_ICONS;
  public selectedIcon = signal<string | null>(null);
  public name = signal<string>('');

  public readonly isFormValid = computed(() =>
    !!this.name().trim() &&
    !!this.selectedColor() &&
    !!this.selectedIcon()
  );

  async ngOnInit() {
    if (this.categoryId()) {
      const id = Number(this.categoryId());
      const category = this.categoryStore.getCategoryById(id);
      if (category) {
        this.name.set(category.name);
        this.selectedColor.set(category.color);
        this.selectedIcon.set(category.icon);
      }
    }
  }

  inputName(ev: any) {
    this.name.set(ev!.target!.value);
  }

  selectColor(color: string) {
    this.selectedColor.set(color);
  }

  selectIcon(icon: string) {
    this.selectedIcon.set(icon);
  }

  deleteCategory() {
    if (!this.categoryId()) return;
    this.categoryStore.deleteCategory(Number(this.categoryId()));
    this.router.navigate(['/home']);
  }

  async saveCategory() {
    if (!this.isFormValid()) return;

    const payload = {
      name: this.name().trim()!,
      color: this.selectedColor()!,
      icon: this.selectedIcon()!,
    };

    console.log(payload);
    if (this.categoryId()) {
      const id = Number(this.categoryId());
      this.categoryStore.updateCategory({ ...payload, id: id });
    } else {
      this.categoryStore.createCategory(payload);
    }
    this.router.navigate(['/home']);
  }
}