import { Pipe, PipeTransform } from '@angular/core';
import { PRIORITY_COLORS } from 'src/app/core/models/priority.interface';
import { Priority } from 'src/app/core/models/priority.interface';

@Pipe({
  name: 'priorityColor',
  standalone: true,
})
export class PriorityColorPipe implements PipeTransform {
  transform(priority: Priority | null | undefined): string {
    if (!priority) return '#CECECE';
    return PRIORITY_COLORS[priority] ?? '#CECECE';
  }
}
