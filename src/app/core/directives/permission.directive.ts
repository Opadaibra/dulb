import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { CacheManagerService } from '../services/cache-manager.service';
import { STORAGE_KEYS } from '../constants/STORAGE_KEYS';

@Directive({
  selector: '[appPermission]'
})
export class PermissionDirective {
  private permissions: string[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private cache: CacheManagerService
  ) {
    this.permissions = this.cache.getItem<string[]>(STORAGE_KEYS.USER_PERMISSIONS) || [];
  }

  @Input() set appPermission(condition: string) {
    // دعم OR
    const required = condition.split('||').map(c => c.trim());
    const hasPermission = required.some(r => this.permissions.includes(r));

    if (hasPermission) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
