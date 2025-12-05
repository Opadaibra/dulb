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
      const res = await fetch('/assets/i18n/langs.json');
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
        const res = await fetch(`/assets/i18n/${lang}.json`);
        if (!res.ok) throw new Error('Language file not found');
        this.translations[lang] = await res.json();
      } catch (err) {
        console.error(`Failed to load language ${lang}`, err);
        this.translations[lang] = {};
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
}
