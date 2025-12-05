import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';
import { LanguageSwitcherComponent } from "../../../core/shared/language-switcher.component";
import { ThemeToggleComponent } from "../../../core/shared/theme-toggle.component";
import { CarouselModule } from 'primeng/carousel';
import { TranslateStateService } from '../../../core/services/translate-state.service';

@Component({
  selector: 'app-landing-page',
  imports: [SharedModule, TranslatePipe, CarouselModule, LanguageSwitcherComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  theme: 'dark' | 'light' = (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) ? 'light' : 'dark';

  dir = 'ltr'
  constructor(private translate: TranslateStateService) {
    translate.lang$.subscribe((result)=>{
      this.dir = translate.currentLang == 'ar' ? 'rtl' : 'ltr';

    })
  }
  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '1199px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '480px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  links = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT', href: '#about' },
    { label: 'MILESTONES', href: '#milestones' },
    { label: 'VALUES', href: '#values' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'CONTACT', href: '#contact' }
  ];

  milestones = [
    {
      number: '1000',
      plus: '+',
      title: 'HUMAN_CAPABILITY',
      description: 'HUMAN_CAPABILITY_DESC'
    },
    {
      number: '25',
      plus: '+',
      title: 'YEARS_EXPERTISE',
      description: 'YEARS_EXPERTISE_DESC'
    },
    {
      number: '30',
      plus: '+',
      title: 'CLIENTS_SAUDI',
      description: 'CLIENTS_SAUDI_DESC'
    }
  ];

  coreValues = [
    {
      icon: 'fa-medal',
      title: 'QUALITY',
      description: 'QUALITY_DESC'
    },
    {
      icon: 'fa-handshake',
      title: 'INTEGRITY',
      description: 'INTEGRITY_DESC'
    },
    {
      icon: 'fa-shield-alt',
      title: 'ACCOUNTABILITY',
      description: 'ACCOUNTABILITY_DESC'
    },
    {
      icon: 'fa-leaf',
      title: 'SUSTAINABILITY',
      description: 'SUSTAINABILITY_DESC'
    }
  ];

  recentProjects = [
    {
      id: 1,
      title: 'AL_SHAMI_HOSPITAL',
      description: 'AL_SHAMI_HOSPITAL_DESC',
      image: 'assets/images/project1.jpg'
    },
    {
      id: 2,
      title: 'AL_SALAM_HOSPITAL',
      description: 'AL_SALAM_HOSPITAL_DESC',
      image: 'assets/images/project2.jpg'
    },
    {
      id: 3,
      title: 'RESIDENTIAL_BUILDING_DASHBOARD',
      description: 'RESIDENTIAL_BUILDING_DASHBOARD_DESC',
      image: 'assets/images/project3.jpg'
    },
    {
      id: 4,
      title: 'LUXURY_VILLA_SMART',
      description: 'LUXURY_VILLA_SMART_DESC',
      image: 'assets/images/project4.jpg'
    },
    {
      id: 5,
      title: 'MODERN_VILLA_BLUEPRINT',
      description: 'MODERN_VILLA_BLUEPRINT_DESC',
      image: 'assets/images/project5.jpg'
    },
    {
      id: 6,
      title: 'REAL_ESTATE_SHOWCASE',
      description: 'REAL_ESTATE_SHOWCASE_DESC',
      image: 'assets/images/project6.jpg'
    }
  ];
}