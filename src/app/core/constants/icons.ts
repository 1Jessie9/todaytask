import { addIcons } from 'ionicons';
import {
  home,
  star,
  heart,
  alarm,
  calendar,
  book,
  briefcase,
  barbell,
  paw,
  airplane,
  cart,
  cash,
  musicalNotes,
  // UI / layout icons
  add,
  funnelSharp,
  bookSharp,
  briefcaseSharp,
  homeSharp,
} from 'ionicons/icons';

export interface CategoryIconOption {
  value: string;
  label: string;
}

export const CATEGORY_ICONS: CategoryIconOption[] = [
  { value: 'home',          label: 'Hogar' },
  { value: 'briefcase',     label: 'Trabajo' },
  { value: 'book',          label: 'Estudio' },
  { value: 'barbell',       label: 'Entrenamiento' },
  { value: 'heart',         label: 'Salud' },
  { value: 'calendar',      label: 'Eventos' },
  { value: 'cash',          label: 'Finanzas' },
  { value: 'cart',          label: 'Compras' },
  { value: 'airplane',      label: 'Viajes' },
  { value: 'paw',           label: 'Mascotas' },
  { value: 'musical-notes', label: 'Música' },
  { value: 'star',          label: 'Favoritos' },
];

export function registerAppIcons() {
  addIcons({
    home,
    star,
    heart,
    alarm,
    calendar,
    book,
    briefcase,
    barbell,
    paw,
    airplane,
    cart,
    cash,
    musicalNotes,
    add,
    funnelSharp,
    bookSharp,
    briefcaseSharp,
    homeSharp,
  });
}
