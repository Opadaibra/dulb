import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CacheManagerService } from '../services/cache-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private cache: CacheManagerService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const required = route.data['permission'] as string; 
    const userPermissions = this.cache.getItem<string[]>('user_permissions') || [];
    return userPermissions.includes(required);
  }

  isAuthorized(permission: string): boolean {
    const userPermissions = this.cache.getItem<string[]>('user_permissions') || [];
    return userPermissions.includes(permission);
  }
}
