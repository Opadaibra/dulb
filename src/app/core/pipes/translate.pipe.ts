import { Pipe, PipeTransform } from '@angular/core';
import { TranslateStateService } from '../services/translate-state.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform {
  constructor(private state: TranslateStateService) {}

  transform(key: string, params?: Record<string, string>): string {
    let text = this.state.getTranslation(key);

    if (params) {
      Object.keys(params).forEach(p => {
        text = text.replace(`{{${p}}}`, params[p]);
      });
    }

    return text;
  }
}
