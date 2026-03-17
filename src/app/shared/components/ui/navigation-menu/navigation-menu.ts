import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  output,
  signal,
  computed,
  effect
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

export interface NavItem {
  id: string;
  label: string;
  link: string;
  icon?: string;
}

@Component({
  selector: 'z-navigation-menu',
  standalone: true,
  imports: [CommonModule, DragDropModule, FormsModule, RouterModule],
  templateUrl: './navigation-menu.html',
  styleUrl: './navigation-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NavigationMenu),
      multi: true
    }
  ]
})
export class NavigationMenu implements ControlValueAccessor {
  // Typed Input using modern input() API
  items = input.required<NavItem[]>();
  
  // Typed Output
  itemOrderChanged = output<NavItem[]>();
  itemSelected = output<NavItem>();

  // Internal reactive state
  internalItems = signal<NavItem[]>([]);
  activeId = signal<string | null>(null);

  // Derived state
  hasItems = computed(() => this.internalItems().length > 0);

  // CVA Properties
  onChange: any = () => {};
  onTouch: any = () => {};
  isDisabled = signal<boolean>(false);

  constructor() {
    // Sync external items to internal mutable state when it changes
    effect(() => {
      this.internalItems.set([...this.items()]);
    }, { allowSignalWrites: true });
  }

  // --- Control Value Accessor Implementation ---
  writeValue(value: any): void {
    if (value !== undefined) {
      this.activeId.set(value);
    }
  }
  
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  // --- Actions ---
  selectItem(item: NavItem): void {
    if (this.isDisabled()) return;
    
    this.activeId.set(item.id);
    this.onChange(item.id);
    this.onTouch();
    this.itemSelected.emit(item);
  }

  onDrop(event: CdkDragDrop<NavItem[]>): void {
    if (this.isDisabled()) return;
    
    const currentItems = [...this.internalItems()];
    moveItemInArray(currentItems, event.previousIndex, event.currentIndex);
    this.internalItems.set(currentItems);
    this.itemOrderChanged.emit(currentItems);
  }
}
