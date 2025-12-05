import { Observable } from 'rxjs';
import { GenericApiService } from './genericApi.service';

export class BaseApiService<T, S extends GenericApiService<T>> extends GenericApiService<T> {
  item?: T;
  items: T[] = [];
  loading = false;
  error?: string;

  constructor(protected service: S) {
    super((service as any).http, (service as any).endpoint);
  }

  // ✅ Get All
  loadAll(): Observable<T[]> {
    this.loading = true;
    return new Observable<T[]>((observer) => {
      this.service.getAll().subscribe({
        next: (data) => {
          this.items = data;
          this.loading = false;
          observer.next(data);
          observer.complete();
        },
        error: (err) => this.handleError(err, observer),
      });
    });
  }

  // ✅ Get single item
  loadItem(id: number | string): Observable<T> {
    this.loading = true;
    return new Observable<T>((observer) => {
      this.service.getItem(id).subscribe({
        next: (data) => {
          this.item = data;
          this.loading = false;
          observer.next(data);
          observer.complete();
        },
        error: (err) => this.handleError(err, observer),
      });
    });
  }

  // ✅ Create
  createItem(data: T): Observable<T> {
    this.loading = true;
    return new Observable<T>((observer) => {
      this.service.create(data).subscribe({
        next: (newItem) => {
          this.items.push(newItem);
          this.loading = false;
          observer.next(newItem);
          observer.complete();
        },
        error: (err) => this.handleError(err, observer),
      });
    });
  }

  // ✅ Update
  updateItem(id: number | string, data: T): Observable<T> {
    this.loading = true;
    return new Observable<T>((observer) => {
      this.service.update(id, data).subscribe({
        next: (updated) => {
          this.items = this.items.map((x) => (this.getId(x) === id ? updated : x));
          this.loading = false;
          observer.next(updated);
          observer.complete();
        },
        error: (err) => this.handleError(err, observer),
      });
    });
  }

  // ✅ Delete
  deleteItem(id: number | string): Observable<void> {
    this.loading = true;
    return new Observable<void>((observer) => {
      this.service.delete(id).subscribe({
        next: () => {
          this.items = this.items.filter((x) => this.getId(x) !== id);
          this.loading = false;
          observer.next();
          observer.complete();
        },
        error: (err) => this.handleError(err, observer),
      });
    });
  }

  // 🛠️ Helper
  protected handleError(err: any, observer: any) {
    this.loading = false;
    this.error = err.message;
    observer.error(err);
  }

  // 🔑 ميثود صغيرة مشان نعرف نحدد الـ id (ممكن تعملها أوفرايد إذا بدك)
  protected getId(item: T): number | string | undefined {
    return (item as any)?.id;
  }
}
