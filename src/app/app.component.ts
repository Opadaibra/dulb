import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  currentTheme = '';
  
  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.currentTheme = this.themeService.getCurrentTheme();
  }

  checkTheme() {
    console.log('LocalStorage theme:', localStorage.getItem('dulb-theme'));
    console.log('Body classes:', document.body.className);
    console.log('Service theme:', this.themeService.getCurrentTheme());
    this.currentTheme = this.themeService.getCurrentTheme();
  }
  
}
