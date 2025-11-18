import { Pipe, PipeTransform } from '@angular/core';
import { Category } from 'src/app/core/models/category.interface';
import { CATEGORY_PASTEL_COLORS } from 'src/app/core/constants/colors';

@Pipe({
  standalone: true,
  name: 'categoryColor',
})
export class CategoryColorPipe implements PipeTransform {
  transform(category: Category | null | undefined): string {
    if (!category || !category.color) return '#EDEDED';
    return CATEGORY_PASTEL_COLORS[category.color] ?? '#EDEDED';
  }
}
