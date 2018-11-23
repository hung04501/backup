import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplatesModule } from './templates/templates.module';

@NgModule({
  imports: [CommonModule, TemplatesModule],
  exports: [TemplatesModule],
  declarations: []
})
export class SplComponentsModule {}
