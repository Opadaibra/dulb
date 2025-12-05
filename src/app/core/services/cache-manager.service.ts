import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheManagerService {
  private secretKey = 'my-secret-key'; 

  setItem(key: string, value: any): void {
    const encrypted = this.encrypt(JSON.stringify(value));
    localStorage.setItem(key, encrypted);
  }

  getItem<T>(key: string): T | null {
    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;
    try {
      const decrypted = this.decrypt(encrypted);
      return JSON.parse(decrypted) as T;
    } catch {
      return null;
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  private encrypt(data: string): string {
    return btoa(
      Array.from(data).map((c, i) => 
        String.fromCharCode(c.charCodeAt(0) ^ this.secretKey.charCodeAt(i % this.secretKey.length))
      ).join('')
    );
  }

  private decrypt(data: string): string {
    const decoded = atob(data);
    return Array.from(decoded).map((c, i) => 
      String.fromCharCode(c.charCodeAt(0) ^ this.secretKey.charCodeAt(i % this.secretKey.length))
    ).join('');
  }
}
