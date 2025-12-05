import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private currentTheme: string = 'light';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.loadInitialTheme();
  }

  private loadInitialTheme() {
    // تحقق من التفضيل المحفوظ
    const savedTheme = localStorage.getItem('dulb-theme');
    if (savedTheme) {
      this.currentTheme = savedTheme;
    } else {
      // تحقق من تفضيلات النظام
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.currentTheme = prefersDark ? 'dark' : 'light';
    }
    this.applyTheme(this.currentTheme);
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.currentTheme);
    localStorage.setItem('dulb-theme', this.currentTheme);
  }

  isDarkTheme(): boolean {
    return this.currentTheme === 'dark';
  }

  private applyTheme(theme: string) {
    const body = document.body;
    
    // إزالة الكلاسات السابقة
    this.renderer.removeClass(body, 'light-theme');
    this.renderer.removeClass(body, 'dark-theme');
    
    // إضافة الكلاس الجديد
    this.renderer.addClass(body, theme + '-theme');
  }

  getCurrentTheme(): string {
    return this.currentTheme;
  }
} 