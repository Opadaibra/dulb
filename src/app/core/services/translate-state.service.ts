import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslateStateService {
  private readonly CACHE_KEY = 'app_lang';
  private langSubject = new BehaviorSubject<string>('en');
  lang$ = this.langSubject.asObservable();

  private translations: Record<string, any> = {};
  private availableLangsList: string[] = [];

  constructor() {
    this.initLang();
  }

  private async initLang() {
    await this.loadAvailableLangs();

    const cachedLang = localStorage.getItem(this.CACHE_KEY);
    const browserLang = navigator.language.split('-')[0]; 

    let defaultLang = 'en';
    if (cachedLang && this.availableLangsList.includes(cachedLang)) {
      defaultLang = cachedLang;
    } else if (this.availableLangsList.includes(browserLang)) {
      defaultLang = browserLang;
    }

    await this.setLang(defaultLang);
  }

  private async loadAvailableLangs() {
    try {
      // استخدام مسار نسبي مع إضافة timestamp لمنع cache
      const res = await fetch(`assets/i18n/langs.json?t=${Date.now()}`);
      if (!res.ok) throw new Error('langs.json not found');
      this.availableLangsList = await res.json();
    } catch (err) {
      console.error('Failed to load available languages', err);
      this.availableLangsList = ['en']; // fallback
    }
  }

  get availableLangs() {
    return this.availableLangsList;
  }

  async setLang(lang: string) {
    if (!this.availableLangsList.includes(lang)) {
      console.warn(`Language "${lang}" not in available list, fallback to 'en'`);
      lang = 'en';
    }

    if (!this.translations[lang]) {
      try {
        // استخدام مسار نسبي
        const res = await fetch(`assets/i18n/${lang}.json?t=${Date.now()}`);
        if (!res.ok) throw new Error(`Language file ${lang}.json not found`);
        this.translations[lang] = await res.json();
      } catch (err) {
        console.error(`Failed to load language ${lang}`, err);
        // محاولة المسار المطلق كحل بديل
        try {
          const res2 = await fetch(`/assets/i18n/${lang}.json`);
          if (res2.ok) {
            this.translations[lang] = await res2.json();
          } else {
            throw new Error('Absolute path also failed');
          }
        } catch {
          this.translations[lang] = {};
        }
      }
    }

    this.langSubject.next(lang);
    localStorage.setItem(this.CACHE_KEY, lang);
  }

  get currentLang() {
    return this.langSubject.value;
  }

  getTranslation(key: string): string {
    const dict = this.translations[this.currentLang] || {};
    return dict[key] || key;
  }

  // دالة مساعدة لإعادة تحميل الترجمة
  async reloadTranslations() {
    const currentLang = this.currentLang;
    delete this.translations[currentLang];
    await this.setLang(currentLang);
  }
}