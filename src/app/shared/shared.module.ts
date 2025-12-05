import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

@NgModule({
    imports: [CommonModule, RouterOutlet, RouterLink, ],
    exports: [CommonModule, RouterOutlet, RouterLink, ]
})
export class SharedModule { }
