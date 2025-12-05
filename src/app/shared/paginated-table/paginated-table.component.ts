import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paginated-table',
  imports: [CommonModule, FormsModule],
  templateUrl: './paginated-table.component.html',
  styleUrls: ['./paginated-table.component.scss']
})
export class PaginatedTableComponent<T> {

  @Input() data: T[] = [];
  @Input() totalItems = 0;
  @Input() pageSize = 10;
  @Input() loading = false;
  @Input() error: string | any = null;
  @Input() columns: { header: string; field: keyof T }[] = [];

  @Output() next = new EventEmitter<number>();
  @Output() prev = new EventEmitter<number>();
  @Output() goTo = new EventEmitter<number>();
  @Output() action = new EventEmitter<T>(); // 🔥 جديد

  currentPage = 1;

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  imageFields = ['image', 'logo', 'img', 'photo'];

  isImageField(field: keyof T | string): boolean {
    const fieldName = String(field).toLowerCase();
    return this.imageFields.some(f => fieldName.includes(f));
  }

  isActionField(field: keyof T | string): boolean {
    return String(field).toLowerCase() === 'action';
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.next.emit(this.currentPage);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.prev.emit(this.currentPage);
    }
  }

  goToPage() {
    this.goTo.emit(this.currentPage);
  }

  triggerAction(item: T) {
    this.action.emit(item);
  }
}
