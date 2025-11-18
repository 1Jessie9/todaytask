import { Component, CUSTOM_ELEMENTS_SCHEMA, input, output } from "@angular/core";
import { Category } from "src/app/core/models/category.interface";
import { IonIcon } from "@ionic/angular/standalone";
import { CategoryColorPipe } from "../../pipes/category-color.pipe";

@Component({
  standalone: true,
  selector: "app-category-carousel",
  templateUrl: "./category-carousel.component.html",
  styleUrls: ["./category-carousel.component.scss"],
  imports: [
    IonIcon,
    CategoryColorPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CategoryCarouselComponent {
  readonly categories = input<Category[]>([]);
  readonly selectable = input<boolean>(false);
  readonly selectedCategoryId = input<number | null>(null);
  readonly categoryClick = output<Category>();

  onCategoryClick(category: Category) {
    this.categoryClick.emit(category);
  }
}